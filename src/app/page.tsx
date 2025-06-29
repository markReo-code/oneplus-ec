import { Metadata } from "next";
import Image from "next/image";
import styles from "./home.module.css";
import Slider from "./_components/Sliders/Slider";
// import "swiper/css";
// import "swiper/css/navigation";

import {
  getBottoms,
  getShirts,
} from "@/utils/supabase/supabaseServer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ONEPLUS | メンズファッション",
  description: "ONEPLUS(ワンプラス)はミニマルで洗練されたデザインを提案するメンズ向けアパレルブランド。Tシャツ、シャツ、ボトムス、キャップなど日常にプラスaのスタイルを。"
}

export default async function Home() {
  const bottoms = await getBottoms();
  const shirts = await getShirts();
  const sliceBottomsData = bottoms.slice(0, 4);
  const sliceShirtsData = shirts.slice(0, 4);

  return (
    <>
      <section className={styles.mainvisual}>
        <picture>
          <source srcSet="/mainvisual_sp.jpg" media="(max-width: 768px)" />
          <img
            src="/mainvisual_pc.jpg"
            alt="ONEPLUSのTシャツを着用した男性モデルのブランドビジュアル"
            className={styles.mainvisualImage}
          />
        </picture>
      </section>

      <Slider />

      <section className={styles.section}>
        <div className="inner">
          <h2 className={styles.heading}>Shirts</h2>
          <ul className="product-list">
            {sliceShirtsData.map((product) => (
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
          <div className="button-block">
            <Link href="/collections/shirts" className="button button--base">
              VIEW MORE
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles["section--bottoms"]}`}>
        <div className="inner">
          <h2 className={styles.heading}>Bottoms</h2>
          <ul className="product-list">
            {sliceBottomsData.map((product) => (
              <li key={product.slug} className="product-item">
                <Link href={`/products/${product.slug}`} className="">
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
          <div className="button-block">
            <Link href="/collections/bottoms" className="button button--base">
              VIEW MORE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
