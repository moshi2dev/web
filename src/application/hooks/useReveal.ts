import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver で表示範囲に入ったら `visible` を反すフック。
 * CSS 側の `.reveal[data-visible="true"]` と組み合わせてフェード表示する。
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, visible };
}
