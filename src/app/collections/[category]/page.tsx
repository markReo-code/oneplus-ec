import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/utils/supabase/supabaseServer";

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({params}: Props) {
  const { category } = params;

  // 英語カテゴリ名 → 日本語に変換
  const categoryLabelMap: Record<string, string> = {
    tshirts: "Tシャツ",
    shirts: "シャツ",
    bottoms: "ボトムス",
    caps: "キャップ",
  }

  const categoryLabel = categoryLabelMap[category] || category;

  return {
    title: `${categoryLabel}一覧 | ONEPLUS`
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = params;
  const products = await getProductsByCategory(category);

  return (
    <div className="product-wrapper">
      <div className="inner">
        <h1 className="product-heading">{category}</h1>
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.slug} className="product-item">
              <Link href={`/products/${product.slug}`}>
                <figure className="product-media">
                  <Image
                    src={product.image}
                    width={359}
                    height={513}
                    alt={product.title}
                    className="product-image"
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
