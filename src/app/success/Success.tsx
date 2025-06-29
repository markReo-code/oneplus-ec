"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/_store/cartStore";
import styles from "./success.module.css";
import Link from "next/link";

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("決済処理中...");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!sessionId) {
      setMessage("決済情報が見つかりませんでした。");
      setLoading(false);
      return;
    }

    const saveOrder = async () => {
      try {
        // サーバー API にリクエストを送る
        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "注文情報の取得に失敗しました");
        }
        setMessage("ご購入ありがとうございます。");

        //カートをクリア
        clearCart();
      } catch (error) {
        // error の型を明示的に `Error` にキャスト
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("不明なエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };

    saveOrder();
  }, []);

  return (
    <section className="page-content">
      <div className="page-inner">
        <div className="">
          <div className="page-heading">
            <h1 className="page-title">決済完了</h1>
            <p className="page-description">
              {loading ? "決済処理中..." : message}
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Link href="/" className={styles.button}>
              トップページへ戻る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
