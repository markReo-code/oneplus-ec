import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";
import { getProductsDetail } from "@/utils/supabase/supabaseServer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia'
});

type CartItem = {
    id: number;
    quantity: number;
}

export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ error: "sessionId がありません"}, {status: 400})
        }

         // Stripeのセッション情報を取得
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // metadataからcartデータとuserIdを取得
        const cart: CartItem[] = session.metadata?.cart
            ? JSON.parse(session.metadata.cart)
            : [];

        const userId = session.metadata?.userId;

        if (!cart.length || !userId) {
            return NextResponse.json({error: "商品情報の取得に失敗しました"}, {status: 400})
        }

        const supabase = createClient();

        const orders = await Promise.all(
            cart.map(async (item) => {
                const product = await getProductsDetail(item.id);
                if (!product) {
                    throw new Error(`商品ID${item.id}が見つかりません`);
                }

                return {
                    stripe_payment_id: sessionId,
                    user_id: userId,
                    product_id: item.id,
                    quantity: item.quantity,
                    price: product.price,
                    status: "pending",
                }
            })
        );

        // ordersテーブルにデータを挿入
        const { error } = await supabase.from("orders").insert(orders);

        if (error) {
            console.error("Supabaseへの注文保存エラー:", error);
            return NextResponse.json({ error: "注文情報の保存に失敗しました" }, { status: 500 });
        }

        return NextResponse.json({ success: true});

    } catch(error) {
        console.error("決済完了処理エラー:", error);
        return NextResponse.json({ error: "注文処理中にエラーが発生しました" }, { status: 500 });
    }
}
