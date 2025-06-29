import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductsDetail } from "@/utils/supabase/supabaseServer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

type CartItem = {
  id: number;
  quantity: number;
};

type RequestBody = {
  cart: CartItem[];
  userId?: string;
};

export async function POST(req: NextRequest) {
  try {
    // リクエストのBodyを取得
    const { cart, userId }: RequestBody = await req.json();

    // ユーザーが未ログインの場合はエラーを返す
    if (!userId) {
      return NextResponse.json(
        { error: "ログインが必要です" },
        { status: 401 }
      );
    }

    // カート内の全商品の詳細を Supabase から取得
    const products = await Promise.all(
      cart.map(async (item: CartItem) => {
        const product = await getProductsDetail(item.id);
        if (!product) {
          throw new Error(`商品ID${item.id}が見つかりません`);
        }
        return { ...product, quantity: item.quantity };
      })
    );

    // Stripe の Checkout セッション用に `line_items` を作成
    const line_items = products.map((product) => ({
      price_data: {
        currency: "jpy",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: product.price,
      },
      quantity: product.quantity,
    }));

    // Stripe の Checkout セッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items,
      metadata: {
        userId,
        cart: JSON.stringify(cart.map(item => ({id: item.id, quantity: item.quantity})))
      }
    });

    // Stripeの決済URLをフロントに返す
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout セッション作成エラー:", error);
    return NextResponse.json({ error: "決済エラー" }, { status: 500 });
  }
}

