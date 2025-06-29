import { useEffect } from "react";

export function useFocusTrap(
  ref: React.RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];

    const focusableElements = ref.current.querySelectorAll<HTMLElement>(
        focusableSelectors.join(', ')
    );

    if (focusableElements.length === 0) return;
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length -1];

    const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
        }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => {
        document.removeEventListener("keydown", handleFocusTrap);
    }

  },[ref, isActive]);
}
