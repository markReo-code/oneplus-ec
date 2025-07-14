import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getProductsList } from "@/utils/supabase/supabaseServer";

export const metadata: Metadata = {
  title: "ALL ITEMS  商品一覧 | ONEPLUS",
  description: "ONEPLUSの全アイテム一覧ページ。Tシャツ、シャツ、ボトムス、キャップなど、ミニマルで洗練されたデザインのメンズアパレルをラインナップ。"
}

export default async function Page() {
  const products = await getProductsList();

  if (!products.length) {
    return <p>商品が見つかりませんでした。</p>;
  }

  return (
    <div className="product-wrapper">
      <div className="inner">
        <h1 className="product-heading">ALL ITEMS</h1>
        <ul className="product-list">
          {products.map((product, index) => (
            <li key={product.slug} className="product-item">
              <Link href={`/products/${product.slug}`} className="">
                <figure className="product-media">
                  <Image
                    src={product.image || "/fallback-image.jpg"}
                    className="product-image"
                    width={272}
                    height={363}
                    alt={product.title}
                    priority={index < 4}
                  />
                </figure>
                <div className="product-content">
                  <p className="product-title">{product.title}</p>
                  <p className="product-price">
                    ￥{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
