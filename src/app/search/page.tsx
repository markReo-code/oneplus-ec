import type { Metadata } from "next";
import { searchProducts } from "@/utils/supabase/supabaseServer";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

type Props = {
  searchParams: {
    q?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {q?: string};
}): Promise<Metadata> {
  const query = searchParams.q ?? "";
  const results = query ? await searchProducts(query) : [];
  const count = results.length;

  return {
    title: query ? `検索: 「${query}」の検索結果 ${count}件` : `検索結果 | ONEPLUS`,
    description: query ? `${query}の検索結果ページです。全${count}件を表示しています。` : "検索結果ページです。検索ワードに一致する商品を表示します。",
    robots: {index: false, follow: true}
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q ?? "";
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="product-wrapper">
      <div className="inner">
        <h1 className="product-heading normalCase">{query}</h1>
        <div className={styles.results}>
          {results.length > 0 ? (
            <ul className="product-list">
              {results.map((product) => (
                <li key={product.slug} className="product-item">
                  <Link href={`products/${product.slug}`}>
                    <figure className="product-media">
                      <Image
                        src={product.image}
                        className="product-image"
                        width={272}
                        height={363}
                        alt={product.title}
                        priority
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
          ) : (
            <div className={styles.empty}>検索結果がありません。</div>
          )}
        </div>
      </div>
    </div>
  );
}
