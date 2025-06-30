import Image from "next/image";
import Link from "next/link";
import HeaderNav from "../HeaderNav";
import styles from "./Header.module.css";
import SearchPanel from "../SearchPanel";
import CartIcon from "../CartIcon";
import Drawer from "../Drawer";
import Logo from "../Logo";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Drawer />

        <HeaderNav />

        <Logo />

        <div className={styles.actions}>
          <Suspense>
              <SearchPanel />
          </Suspense>
          <Link href="/login" className={styles.actionItem}>
            <Image src="/login.svg" alt="Login" width={24} height={24} />
          </Link>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}