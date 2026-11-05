/**
 * ヒーロー背景の「星空 + 浮遊ブロック」シーンを OffscreenCanvas 上で描画する
 * Web Worker。ピクセルアート風の等角立方体を漂わせる。
 *
 * メインスレッドからは 2 種類のメッセージを受ける:
 * - `init`   : 表示対象の OffscreenCanvas
 * - `resize` : canvas ビットマップの論理サイズ(デバイスピクセル比込み)
 */

type Palette = {
  /** 上面 */
  top: string;
  /** 左側面 */
  left: string;
  /** 右側面 */
  right: string;
};

const BLOCK_PALETTES: readonly Palette[] = [
  // 草ブロック
  { top: "#7fd46b", left: "#8a5a35", right: "#6b4527" },
  // エメラルド
  { top: "#51e0a0", left: "#159a6c", right: "#0e6b4c" },
  // ダイヤ
  { top: "#7de6f7", left: "#1f9db8", right: "#145c74" },
  // 金
  { top: "#fbd24a", left: "#b97e12", right: "#8f5f0e" },
  // アメジスト
  { top: "#c084fc", left: "#7e22ce", right: "#581c87" },
];

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
};

type Block = {
  x: number;
  y: number;
  size: number;
  palette: Palette;
  speed: number;
  phase: number;
  amplitude: number;
};

function mulberry32(seed: number): () => number {
  let state = seed;

  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createLayout(
  width: number,
  height: number,
): {
  stars: Star[];
  blocks: Block[];
} {
  const random = mulberry32(20261105);
  const starCount = Math.min(200, Math.round((width * height) / 9000));
  const stars: Star[] = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: random() * width,
      y: random() * height,
      size: random() > 0.85 ? 5 : 3,
      speed: 0.4 + random() * 1.2,
      phase: random() * Math.PI * 2,
    });
  }

  const blockCount = Math.max(6, Math.round(width / 500));
  const blocks: Block[] = [];

  for (let i = 0; i < blockCount; i++) {
    blocks.push({
      x: random() * width,
      y: height * (0.2 + random() * 0.6),
      size: 24 + random() * 40,
      palette: BLOCK_PALETTES[Math.floor(random() * BLOCK_PALETTES.length)] as Palette,
      speed: 0.15 + random() * 0.25,
      phase: random() * Math.PI * 2,
      amplitude: height * (0.03 + random() * 0.06),
    });
  }

  return { stars, blocks };
}

function drawIsoBlock(
  ctx: OffscreenCanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  alpha: number,
  palette: Palette,
): void {
  const w = size;
  const half = w * 0.5;
  const topSlope = w * 0.3;
  const bodyH = w * 0.62;
  ctx.globalAlpha = alpha;

  // 上面(ひし形)
  ctx.fillStyle = palette.top;
  ctx.beginPath();
  ctx.moveTo(cx, cy - topSlope);
  ctx.lineTo(cx + half, cy);
  ctx.lineTo(cx, cy + topSlope);
  ctx.lineTo(cx - half, cy);
  ctx.closePath();
  ctx.fill();

  // 左側面
  ctx.fillStyle = palette.left;
  ctx.beginPath();
  ctx.moveTo(cx - half, cy);
  ctx.lineTo(cx, cy + topSlope);
  ctx.lineTo(cx, cy + topSlope + bodyH);
  ctx.lineTo(cx - half, cy + bodyH);
  ctx.closePath();
  ctx.fill();

  // 右側面
  ctx.fillStyle = palette.right;
  ctx.beginPath();
  ctx.moveTo(cx + half, cy);
  ctx.lineTo(cx, cy + topSlope);
  ctx.lineTo(cx, cy + topSlope + bodyH);
  ctx.lineTo(cx + half, cy + bodyH);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 1;
}

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let reducedMotion = false;
let ticking = false;
let stars: Star[] = [];
let blocks: Block[] = [];
let lastWidth = 0;
let lastHeight = 0;

function setupSize(width: number, height: number): void {
  if (!canvas || width <= 0 || height <= 0) return;

  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  if (canvas.width === w && canvas.height === h) return;

  canvas.width = w;
  canvas.height = h;
  ({ stars, blocks } = createLayout(w, h));
  lastWidth = w;
  lastHeight = h;
}

function paint(time: number): void {
  if (!ctx || !canvas) return;

  const width = canvas.width;
  const height = canvas.height;

  // 夜空のグラデーション
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#0b1226");
  sky.addColorStop(0.55, "#0a1230");
  sky.addColorStop(1, "#101c3d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  // 星
  for (const star of stars) {
    const twinkle = 0.55 + 0.45 * Math.abs(Math.sin(time * star.speed * 0.001 + star.phase));
    ctx.globalAlpha = twinkle;
    ctx.fillStyle = star.size >= 5 ? "#fde68a" : "#e2e8f0";
    ctx.fillRect(star.x, star.y, star.size, star.size);
  }
  ctx.globalAlpha = 1;

  // 浮遊ブロック
  for (const block of blocks) {
    const cy = block.y + Math.sin(time * block.speed * 0.0006 + block.phase) * block.amplitude;
    const cx =
      block.x + Math.sin(time * block.speed * 0.0003 + block.phase) * (block.amplitude * 0.4);

    // 柔らかい光輪
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, block.size * 2.4);
    glow.addColorStop(0, "rgba(125, 214, 107, 0.16)");
    glow.addColorStop(1, "rgba(125, 214, 107, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(cx - block.size * 2.4, cy - block.size * 2.4, block.size * 4.8, block.size * 4.8);

    drawIsoBlock(ctx, cx, cy, block.size, 0.92, block.palette);
  }
}

function startTicking(): void {
  if (ticking || reducedMotion || !canvas) return;

  ticking = true;

  const tick = (time: number) => {
    if (!canvas || !ctx) return;

    if (canvas.width !== lastWidth || canvas.height !== lastHeight) {
      setupSize(canvas.width || lastWidth, canvas.height || lastHeight);
    }

    paint(time);
    self.requestAnimationFrame(tick);
  };

  self.requestAnimationFrame(tick);
}

self.onmessage = (event) => {
  const data: { type: string; canvas?: OffscreenCanvas; width?: number; height?: number } =
    event.data;

  if (data.type === "init" && data.canvas) {
    canvas = data.canvas;
    ctx = canvas.getContext("2d");

    if (!ctx) return;

    self.postMessage({ type: "ready" });
    startTicking();
  } else if (data.type === "resize") {
    const wasZero = !lastWidth;
    setupSize(data.width ?? 0, data.height ?? 0);

    // 初回リサイズまで静止フレームのフォールバック
    if (wasZero && reducedMotion && canvas && ctx) {
      paint(0);
      self.postMessage({ type: "ready" });
    }
  }
};
