import { useEffect, useRef, useState } from "react";
import { Button, useClipboard } from "@yamada-ui/react";
import { SERVER } from "../../domain/site";

/**
 * サーバー IP をコピーするボタン。
 * - IP コピーは Clipboard API(`useClipboard` 内部で使用)
 * - 「コピーしました」の通知は Popover API(popover="manual")で表示
 */
export function CopyIpButton({ size = "md" }: { size?: "md" | "lg" }) {
  const { value, onCopy } = useClipboard(SERVER.ip, 3000);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const hideTimer = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
      }
    };
  }, []);

  const handleCopy = () => {
    try {
      onCopy();
    } catch {
      // Clipboard API が使えない環境(権限拒否など)では無視
      return;
    }

    setCopied(true);

    const toast = toastRef.current;
    const supportsPopover = typeof toast?.showPopover === "function";

    if (toast && supportsPopover && !toast.matches(":popover-open")) {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
        toast.hidePopover();
      }
      toast.showPopover();
    }

    hideTimer.current = window.setTimeout(() => {
      setCopied(false);

      if (toast && typeof toast.hidePopover === "function" && toast.matches(":popover-open")) {
        toast.hidePopover();
      }
    }, 1600);
  };

  return (
    <>
      <Button
        colorScheme="emerald"
        size={size}
        onClick={handleCopy}
        aria-label="サーバー IP をコピー"
      >
        {copied ? "コピーしました ✓" : value}
      </Button>
      <div id="copy-toast" popover="manual" ref={toastRef} role="status">
        ⛏️ サーバー IP をコピーしました
      </div>
    </>
  );
}
