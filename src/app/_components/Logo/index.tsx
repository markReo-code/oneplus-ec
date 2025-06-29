"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../Header/Header.module.css"
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const WrapperTag = isHome ? "h1" : "div";

  return (
    <WrapperTag className={styles.logo}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/new_2.png"
          width={122}
          height={22}
          className={styles.logoImage}
          alt="ONEPLUS"
        />
      </Link>
    </WrapperTag>
  );
}
