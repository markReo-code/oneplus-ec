"use client"

import styles from "./index.module.css";

type Props = {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

export default function DrawerButton({isDrawerOpen, toggleDrawer}: Props) {
  
  return (
      <button
        className={`${styles.button} ${isDrawerOpen ? styles.open : ""}`}
        onClick={toggleDrawer}
        aria-controls="drawer"
        aria-label={isDrawerOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isDrawerOpen}
      >
        <span className={styles.buttonLine}></span>
        <span className={styles.buttonLine}></span>
        <span className={styles.buttonLine}></span>
      </button>
  );
}
