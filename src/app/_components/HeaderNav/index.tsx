"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { HeaderNavItem, headerNavItems } from "@/app/_constants/headerNavData";
import DesktopDropdownMenu from "../DesktopDropdownMenu";
import { useResetPcDropdown } from "@/app/_hooks/useResetPcDropdown";
import { useResetOnResize } from "@/app/_hooks/useResetOnResize";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";

export default function HeaderNav() {
  const [pcActiveIndex, setPcActiveIndex] = useState<number | null>(null);
  const headerListRef = useRef<HTMLUListElement>(null);

  useOutsideClick(headerListRef, () => {
    setPcActiveIndex(null);
  });
 
  //ページ遷移時やリサイズ時にドロップダウンメニューの状態をリセット
  useResetPcDropdown(setPcActiveIndex);
  useResetOnResize({setPcActiveIndex});
  
  const handleToggle = (index: number) => {
    setPcActiveIndex(pcActiveIndex === index ? null : index);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list} ref={headerListRef}>
        {headerNavItems.map((item: HeaderNavItem, index: number) => {
          const isOpen = pcActiveIndex === index;
          const panelId = `dropdown-panel-${index}`;

          return (
            <li key={item.label} className={styles.item}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => handleToggle(index)}
                    className={styles.button}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${item.label}のメニュー`}
                  
                  >
                    <span className="u-hover-line">{item.label}</span>
                    <svg
                      className={styles.arrow}
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                    >
                      <path
                        d="M1 1L5.5 6L10 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <DesktopDropdownMenu subItems={item.subItems} isOpen={isOpen} panelId={panelId}/>
                </>
              ) : item.href ? (
                <Link href={item.href} className={styles.link}>
                  <span className="u-hover-line">{item.label}</span>
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
