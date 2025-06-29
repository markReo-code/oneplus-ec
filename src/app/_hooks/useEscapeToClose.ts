import { useEffect } from "react";

export function useEscapeToClose({
  isSearchOpen,
  setIsSearchOpen,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isSearchOpen?: boolean;
  setIsSearchOpen?: (val: boolean) => void;
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (val: boolean) => void;
}) {
  useEffect(() => {
    if (!setIsSearchOpen && !setIsDrawerOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      /* フォーカスが乗っている要素 */
      const activeEl = document.activeElement as HTMLElement | null;

      /* ---------- Drawer ---------- */
      if (isDrawerOpen) {
        if (activeEl?.closest("#drawer")) activeEl.blur();
        setIsDrawerOpen?.(false);
      }

      /* ---------- Search Panel ---------- */
      if (isSearchOpen) {
        if (activeEl?.closest("#search-panel")) activeEl.blur();
        setIsSearchOpen?.(false);
      }

    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isSearchOpen,setIsSearchOpen,isDrawerOpen,setIsDrawerOpen]);
}