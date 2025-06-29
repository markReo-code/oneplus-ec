"use client";

import { useCartStore } from "@/app/_store/cartStore";
import Image from "next/image";
import styles from "./index.module.css";
import Link from "next/link";

type Props = {
  item: {
    id: number;
    slug: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
};

export default function CartItem({ item }: Props) {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <li className={styles.item}>
      <Link href={`/products/${item.slug}`}>
        <figure className={styles.media}>
          <Image 
            src={item.image} 
            width={240} 
            height={320}
            alt={item.title} 
            priority
            />
        </figure>
      </Link>

      <div className={styles.details}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.price}>
          価格：￥{item.price.toLocaleString()}
        </p>
        <div className={styles.quantityControls}>
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className={styles.quantityBtn}
            type="button"
            aria-label="商品を1点減らす"
          >
            −
          </button>
          <span className={styles.quantity} aria-label={`現在の数量は${item.quantity}です`}>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className={styles.quantityBtn}
            type="button"
            aria-label="商品を1点増やす"
          >
            ＋
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className={styles.deleteBtn}
          type="button"
          aria-label={`「${item.title}」をカートから削除`}
        >
          削除
        </button>
      </div>
    </li>
  );
}
