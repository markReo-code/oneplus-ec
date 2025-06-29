"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCartStore } from "@/app/_store/cartStore";
import Link from "next/link";
import CartItem from "@/app/_components/CartItem";
import styles from "./cart.module.css";
import LoadingButton from "../_components/LoadingButton";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // Supabase からログインユーザー情報を取得
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;

    if (!userId) {
      alert("ログインが必要です");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, userId }),
      });

      if (!res.ok) {
        throw new Error("サーバーエラー");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url; // Stripeの決済ページにリダイレクト
      }
    } catch (error) {
      console.error("決済エラー", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className="inner">
        <div className={styles.container}>
          <h1 className={styles.title}>ショッピングカート</h1>

          {cart.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>カートに商品はありません。</p>
            </div>
          ) : (
            <>
              <ul className={styles.list}>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>

              <div className={styles.totalWrapper}>
                <dl className={styles.totalTerm}>
                  <dt className={styles.totalText}>合計</dt>
                  <dd className={styles.totalAmount}>
                    ￥{totalPrice.toLocaleString()}
                  </dd>
                </dl>
              </div>

              <div className={styles.btnWrapper}>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="button button--md button--accent"
                  disabled={loading}
                >
                  {loading ? <LoadingButton /> : "購入する"}
                </button>
              </div>
            </>
          )}

          <div className={styles.btnWrapper}>
            <Link href="/" className="button button--base">
              ショッピングを続ける
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
