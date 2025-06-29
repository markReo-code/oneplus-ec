"use client";

import { useRef } from "react";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import Link from "next/link";
import styles from "./index.module.css";
import { headerNavItems } from "@/app/_constants/headerNavData";
import DrawerDropdownMenu from "../DrawerDropdownMenu";

type Props = {
  isDrawerOpen: boolean;
  closeMenu: () => void;
  activeDropdownIndex: number | null;
  setActiveDropdownIndex: (index: number | null) => void;
};

export default function DrawerMenu({
  isDrawerOpen,
  closeMenu,
  activeDropdownIndex,
  setActiveDropdownIndex,
}: Props) {
  const drawerListRef = useRef<HTMLUListElement>(null);

  useOutsideClick(drawerListRef, () => {
    setActiveDropdownIndex(null)
  });

   const handleToggle = (index: number | null) => {
    setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
  };

  return (
    <div
      id="drawer"
      className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}
      aria-hidden={!isDrawerOpen}
    >
      <div className={styles.overlay} onClick={closeMenu}></div>
      <div className={styles.body}>
        <ul className={styles.list} ref={drawerListRef}>
          {headerNavItems.map((item, index) => {
            const isDropdownOpen = activeDropdownIndex === index;
            const panelId = `drawer-dropdown-panel-${index}`;

            return (
              <li key={item.label} className={styles.item}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => handleToggle(index)}
                      className={styles.itemButton}
                      type="button"
                      aria-controls={panelId}
                      aria-expanded={isDropdownOpen}
                      aria-label={`${item.label}のメニュー`}
                    >
                      <span className={styles.label}>{item.label}</span>
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
                    <DrawerDropdownMenu
                      subItems={item.subItems}
                      isDropdownOpen={isDropdownOpen}
                      panelId={panelId}
                    />
                  </>
                ) : (
                  <Link href={item.href ?? "#"} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
