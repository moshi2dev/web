import { useEffect, useRef, type ReactNode } from "react";
import { Box } from "@yamada-ui/react/components/box";
import { usePointerMotion } from "../../application/hooks/usePointerMotion";
import SceneWorker from "../../infrastructure/workers/sceneWorker.ts?worker";
import type { ColorTheme } from "../../application/hooks/useTheme";

export function Scene({ children, theme }: { children: ReactNode; theme: ColorTheme }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);
  usePointerMotion(sceneRef, workerRef);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const canvas = document.createElement("canvas");
    canvas.className = "backdrop-canvas";
    background.append(canvas);
    const worker = new SceneWorker();
    workerRef.current = worker;
    const offscreen = canvas.transferControlToOffscreen();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    worker.postMessage({ type: "init", canvas: offscreen, animated: !motion.matches }, [offscreen]);

    const onMotionChange = () => worker.postMessage({ type: "motion", animated: !motion.matches });
    const onVisibilityChange = () =>
      worker.postMessage({ type: "visibility", visible: !document.hidden });
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      worker.postMessage({
        type: "resize",
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        scale: Math.min(devicePixelRatio, 2),
      });
    });
    observer.observe(background);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      worker.terminate();
      workerRef.current = null;
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    workerRef.current?.postMessage({ type: "theme", theme });
  }, [theme]);

  return (
    <Box className="scene" ref={sceneRef} minH="100svh" position="relative" overflow="hidden">
      <Box
        className="scene-background"
        ref={backgroundRef}
        aria-hidden="true"
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
      />
      {children}
    </Box>
  );
}
