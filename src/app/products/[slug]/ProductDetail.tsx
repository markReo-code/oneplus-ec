"use client";

import Image from "next/image";
import { useCartStore } from "@/app/_store/cartStore";
import CheckoutButton from "@/app/_components/CheckoutButton";
import { notify } from "@/app/_components/Toast";
import CustomToast from "@/app/_components/Toast";
import styles from "./ProductDetail.module.css"

type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    slug: string;
  };
};

export default function ProductDetail({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
   
  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    notify("カートに入りました");
  };

  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.media}>
          <Image
            src={product.image}
            className={styles.image}
            width={272}
            height={363}
            alt={product.title}
            priority
          />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>
              ￥{product.price.toLocaleString()}
            </p>
          </div>
          <div className={styles.actions}>
            <button onClick={handleAddToCart} className="button button--gray" type="button">
              カートに入れる
            </button>
            <CheckoutButton productId={product.id} />
          </div>
        </div>
        <CustomToast />
      </div>
    </div>
  );
}
