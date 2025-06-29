import { getProductBySlug } from "@/utils/supabase/supabaseServer";
import ProductDetail from "./ProductDetail";
import styles from "./page.module.css";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({params}: Props) {
  const product = await getProductBySlug(params.slug);

  return {
    title: `${product?.title} | ONEPLUS`
  }
}

export default async function Page({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <p>商品が見つかりませんでした。</p>;
  }

  return (
    <div className={styles.section}>
      <div className="inner">
          <ProductDetail product={product}/>
      </div>
    </div>
  );
}
