import { useEffect, type RefObject } from "react";

export function usePointerMotion(
  ref: RefObject<HTMLElement | null>,
  workerRef: RefObject<Worker | null>,
) {
  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let intensity = 0;
    let targetIntensity = 0;
    let activeButton: HTMLElement | null = null;

    const resetButton = () => {
      activeButton?.style.removeProperty("--mag-x");
      activeButton?.style.removeProperty("--mag-y");
      activeButton?.style.removeProperty("--tilt-x");
      activeButton?.style.removeProperty("--tilt-y");
      activeButton = null;
    };
    const update = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      intensity += (targetIntensity - intensity) * 0.12;
      scene.style.setProperty("--pointer-x", x.toFixed(4));
      scene.style.setProperty("--pointer-y", y.toFixed(4));
      workerRef.current?.postMessage({ type: "pointer", x, y, intensity });
      if (
        Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(targetIntensity - intensity) >
        0.001
      )
        frame = requestAnimationFrame(update);
      else frame = 0;
    };
    const onMove = (event: PointerEvent) => {
      if (preference.matches || !pointer.matches || event.pointerType !== "mouse") return;
      const rect = scene.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      targetIntensity = 1;
      if (!frame) frame = requestAnimationFrame(update);

      const button =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-magnetic]")
          : null;
      if (button !== activeButton) resetButton();
      if (!button) return;
      activeButton = button;
      const bounds = button.getBoundingClientRect();
      const localX = Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
      );
      const localY = Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
      );
      button.style.setProperty("--mag-x", `${localX * 4}px`);
      button.style.setProperty("--mag-y", `${localY * 3}px`);
      button.style.setProperty("--tilt-x", `${-localY * 4}deg`);
      button.style.setProperty("--tilt-y", `${localX * 5}deg`);
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      targetIntensity = 0;
      resetButton();
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onPreferenceChange = () => {
      if (!preference.matches && pointer.matches) return;
      cancelAnimationFrame(frame);
      frame = 0;
      x = 0;
      y = 0;
      targetX = 0;
      targetY = 0;
      intensity = 0;
      targetIntensity = 0;
      scene.style.removeProperty("--pointer-x");
      scene.style.removeProperty("--pointer-y");
      workerRef.current?.postMessage({ type: "pointer", x: 0, y: 0, intensity: 0 });
      resetButton();
    };
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);
    preference.addEventListener("change", onPreferenceChange);
    pointer.addEventListener("change", onPreferenceChange);
    return () => {
      cancelAnimationFrame(frame);
      resetButton();
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      preference.removeEventListener("change", onPreferenceChange);
      pointer.removeEventListener("change", onPreferenceChange);
    };
  }, [ref, workerRef]);
}
