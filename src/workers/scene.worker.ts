type SceneMessage =
  | { type: "init"; canvas: OffscreenCanvas; animated: boolean }
  | { type: "resize"; width: number; height: number; scale: number }
  | { type: "motion"; animated: boolean }
  | { type: "theme"; theme: "light" | "dark" }
  | { type: "pointer"; x: number; y: number; intensity: number }
  | { type: "visibility"; visible: boolean };

let canvas: OffscreenCanvas;
let context: OffscreenCanvasRenderingContext2D | null;
let width = 0;
let height = 0;
let scale = 1;
let animated = false;
let visible = true;
let theme: "light" | "dark" = "dark";
let frame = 0;
let pointerX = 0;
let pointerY = 0;
let pointerIntensity = 0;

function mixColor(
  base: readonly [number, number, number],
  highlight: readonly [number, number, number],
  amount: number,
): string {
  const channels = base.map((channel, index) =>
    Math.round(channel + ((highlight[index] ?? channel) - channel) * amount),
  );
  return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
}

function draw(time: number) {
  if (!context || !canvas || !width || !height) return;
  const ctx = context;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, theme === "dark" ? "#242d2c" : "#e4e9e2");
  gradient.addColorStop(0.5, theme === "dark" ? "#3b514d" : "#d6e1d8");
  gradient.addColorStop(1, theme === "dark" ? "#202a29" : "#f0f0e7");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const lightX = (pointerX + 1) * width * 0.5;
  const lightY = (pointerY + 1) * height * 0.5;
  const lightRadius = Math.max(150, Math.min(320, Math.min(width, height) * 0.38));
  const baseDotColor: readonly [number, number, number] =
    theme === "dark" ? [185, 232, 220] : [53, 94, 81];
  const highlightDotColor: readonly [number, number, number] =
    theme === "dark" ? [240, 255, 249] : [24, 60, 50];

  const spacing = Math.max(22, width / 60, height / 48);
  const columns = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const phase = time * 0.00032;
  const offsetX = -pointerX * pointerIntensity * 7;
  const offsetY = -pointerY * pointerIntensity * 7;

  for (let row = -1; row <= rows; row++) {
    for (let column = -1; column <= columns; column++) {
      const x = (column + 0.5) * spacing + offsetX;
      const y = (row + 0.5) * spacing + offsetY;
      const shimmer = 0.5 + 0.5 * Math.sin(column * 0.16 + row * 0.12 - phase);
      const distance = Math.hypot(x - lightX, y - lightY) / lightRadius;
      const falloff = Math.max(0, Math.min(1, 1 - distance));
      const illumination = falloff * falloff * (3 - 2 * falloff) * pointerIntensity;
      ctx.fillStyle = mixColor(baseDotColor, highlightDotColor, illumination);
      ctx.globalAlpha = theme === "dark" ? 0.58 + shimmer * 0.2 : 0.48 + shimmer * 0.2;
      ctx.beginPath();
      ctx.arc(x, y, 1.6 + shimmer * 0.4 + illumination * 0.65, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  if (animated && visible) frame = requestAnimationFrame(draw);
}

function render() {
  cancelAnimationFrame(frame);
  draw(performance.now());
}

self.onmessage = (event: MessageEvent<SceneMessage>) => {
  const data = event.data;
  if (data.type === "init") {
    canvas = data.canvas;
    context = canvas.getContext("2d");
    animated = data.animated;
  } else if (data.type === "resize") {
    width = data.width;
    height = data.height;
    scale = data.scale;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    render();
  } else if (data.type === "motion") {
    animated = data.animated;
    if (!animated) pointerIntensity = 0;
    render();
  } else if (data.type === "theme") {
    theme = data.theme;
    render();
  } else if (data.type === "pointer") {
    if (animated) {
      pointerX = data.x;
      pointerY = data.y;
      pointerIntensity = data.intensity;
    }
  } else {
    visible = data.visible;
    render();
  }
};
