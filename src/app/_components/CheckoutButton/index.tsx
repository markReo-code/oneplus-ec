"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LoadingButton from "../LoadingButton";

type CheckoutButtonProps = {
    productId: number;
}

export default function CheckoutButton({ productId }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleCheckout = async () => {
        // ログイン状態を管理
        const { data: user } = await supabase.auth.getUser();
        const userId = user?.user?.id;

        if (!userId) {
            router.push("/login");
            return;
        }

        setLoading(true);

        try {
            // /api/checkout にリクエスト（productId, userId を送る）
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({cart: [{id: productId, quantity: 1}], userId}),
            });

            if (!res.ok) {
                throw new Error("サーバーエラー");
            }

            // レスポンスから Stripe の決済 URL を取得
            const { url } = await res.json();
            if (url) {
                // Stripe の決済ページへリダイレクト
                window.location.href = url;
            }

        } catch(error) {
            console.log("決済エラー:", error)
        }
        setLoading(false);
    };

    return (
        <button onClick={handleCheckout} disabled={loading} className="button button--accent" type="button">
            {loading ?  <LoadingButton /> : "購入する"}
        </button>
    )
}