"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FooterNavItems } from "@/app/_constants/footerNavData";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { useResetOnResize } from "@/app/_hooks/useResetOnResize";
import styles from "./FooterNav.module.css";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";

export function FooterNav() {
  const [footerNavOpenIndex, setFooterNavOpenIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const footerNavRef = useRef<HTMLDivElement>(null);

  useOutsideClick(footerNavRef, () => {
    setFooterNavOpenIndex(null);
  });

  useResetOnResize({ setFooterNavOpenIndex });

  const toggle = (index: number) => {
    setFooterNavOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <nav className={styles.nav} ref={footerNavRef}>
      <ul className={styles.list}>
        {FooterNavItems.map((item, index) => {
          const isOpen = footerNavOpenIndex === index; // そのindexが開いてるかどうか判定
          const panelId = `footer-panel-${index + 1}`;

          return (
            <li key={item.title} className={styles.item}>
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className={styles.navTitle}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {item.title}
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
              ) : (
                <p className={styles.navTitle}>{item.title}</p>
              )}
              <div
                id={panelId}
                className={`${styles.panel} ${isOpen ? styles.open : ""}`}
                {...(isMobile ? { "aria-hidden": !isOpen } : {})}
              >
                <div className={styles.panelInner}>
                  <ul className={styles.panelList}>
                    {item.links.map((link) => (
                      <li key={link.label} className={styles.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
        <li className={styles.item}>
          <p className={styles.navTitle}>Follow Us</p>
          <ul className={styles.snsList}>
            <li className={styles.snsItem}>
              <a href="#">
                <Image src="/line.svg" alt="LINE" width={20} height={20} />
              </a>
            </li>
            <li className={styles.snsItem}>
              <a href="#">
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li className={styles.snsItem}>
              <a href="#">
                <Image src="/x.svg" alt="X (Twitter)" width={20} height={20} />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
