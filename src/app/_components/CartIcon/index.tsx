"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/_store/cartStore";
import styles from "./index.module.css";

export default function CartIcon() {
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link href="/cart" className={styles.link} aria-label="カートを見る">
      <Image src="/cart.svg" alt="Cart" width={24} height={24} />
      {isMounted && totalQuantity > 0 && (
        <span className={styles.badge}>{totalQuantity}</span>
      )}
    </Link>
  );
}
