import { useEffect, useRef, useState } from "react";
import { Box } from "@yamada-ui/react";
import StarfieldWorker from "../../infrastructure/workers/starfieldWorker.ts?worker&inline";

/**
 * OffscreenCanvas + Web Worker で星空を描画する背景。
 *
 * - 対応ブラウザ: `transferControlToOffscreen()` で OffscreenCanvas の制御を
 *   Worker に移譲し、メインスレッドをブロックせずにアニメーションする。
 *   リサイズは ResizeObserver → `resize` メッセージ経由で Worker 側が追従する。
 * - `prefers-reduced-motion` / 非対応環境: アニメーションなしのフォールバック。
 *
 * `transferControlToOffscreen()` は1つの canvas に対して一度しか呼べないため、
 * Worker はモジュールスコープのシングルトンで管理する(StrictMode の二重実行や
 * 再マウントでも同一 canvas への再転送が発生しないようにする)。
 */
let canvasWorker: Worker | null = null;
let workerReady = false;
const transferredCanvases = new WeakSet<HTMLCanvasElement>();

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [workerMode, setWorkerMode] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsWorkerCanvas =
      typeof OffscreenCanvas !== "undefined" &&
      typeof canvas.transferControlToOffscreen === "function" &&
      typeof Worker !== "undefined";

    if (reducedMotion || !supportsWorkerCanvas) return;

    canvasWorker ??= new StarfieldWorker();

    // StrictMode で effect が二重実行されても反先を引き継ぐため、
    // 常に現在のインスタンスの setter でハンドラーを張り直す
    canvasWorker.onmessage = () => {
      workerReady = true;
      setWorkerMode(true);
    };
    canvasWorker.onerror = () => {
      // 描画に失敗してもグラデーションのフォールバックで成立する
    };

    let observer: ResizeObserver | null = null;

    if (transferredCanvases.has(canvas)) {
      // StrictMode の二度目以降:転送済み → ready 済みなら即座に表示
      if (workerReady) {
        setWorkerMode(true);
      }
    } else {
      transferredCanvases.add(canvas);

      const offscreen = canvas.transferControlToOffscreen();
      canvasWorker.postMessage({ type: "init", canvas: offscreen, reducedMotion: false }, [
        offscreen,
      ]);
    }

    // リサイズを Worker に通知(ビットマップの追従はブラウザが行わないため)
    const scale = Math.min(window.devicePixelRatio || 1, 2);

    observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry || !canvasWorker) return;

      const { width, height } = entry.contentRect;
      canvasWorker.postMessage({ type: "resize", width: width * scale, height: height * scale });
    });

    observer.observe(canvas);

    return () => {
      observer?.disconnect();
    };
  }, []);

  return (
    <Box position="absolute" inset="0" overflow="hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          opacity: workerMode ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(16, 185, 129, 0.14), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </Box>
  );
}
