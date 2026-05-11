import { getProductBySlug } from "@/utils/supabase/supabaseServer";
import ProductDetail from "./ProductDetail";
import styles from "./page.module.css";

type Props = {
  // params: {
  //   slug: string;
  // };
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: `${product?.title} | ONEPLUS`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <p>商品が見つかりませんでした。</p>;
  }

  return (
    <div className={styles.section}>
      <div className="inner">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
