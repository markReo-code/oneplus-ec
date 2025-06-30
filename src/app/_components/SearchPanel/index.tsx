"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useFocusTrap } from "@/app/_hooks/useFocusTrap";
import { useScrollLock } from "@/app/_hooks/useScrollLock";
import { useEscapeToClose } from "@/app/_hooks/useEscapeToClose";
import Image from "next/image";
import styles from "./index.module.css";
import SearchField from "../SearchField";

export default function SearchPanel() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const searchPanelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(searchPanelRef, isSearchOpen);
  
  // パネル内にフォーカスが残っていたら blur してから閉じる
  useEscapeToClose({isSearchOpen, setIsSearchOpen});
  useScrollLock(isSearchOpen);

  const searchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    const activeEl = document.activeElement as HTMLElement | null;

    if (searchPanelRef.current?.contains(activeEl)) {
      activeEl?.blur();
    }
    setIsSearchOpen(false);
  };

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname, queryString]);

  return (
    <>
      <button
        onClick={searchToggle}
        className={styles.actionItem}
        type="button"
        aria-controls="search-panel"
        aria-expanded={isSearchOpen}
        aria-label="検索パネルを開く"
      >
        <Image src="/search.svg" alt="検索" width={21} height={21} />
      </button>

      <div
        id="search-panel"
        ref={searchPanelRef}
        className={`${styles.searchPanel} ${isSearchOpen ? styles.open : ""}`}
        aria-hidden={!isSearchOpen}
      >
        <div onClick={closeSearch} className={styles.searchOverlay}></div>
        <div className={styles.searchPanelBody}>
          <button
            type="button"
            onClick={closeSearch}
            className={styles.searchClose}
            aria-label="検索パネルを閉じる"
          >
            <Image
              src="/icon_search_close.svg"
              width={15}
              height={15}
              alt="検索パネルを閉じる"
            />
          </button>
          <SearchField isOpen={isSearchOpen} />
        </div>
      </div>
    </>
  );
}
