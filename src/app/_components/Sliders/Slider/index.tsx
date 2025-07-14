"use client";

import { useEffect, useState } from "react";
import { getTshirts, Product } from "@/utils/supabase/supabaseClient";

import Image from "next/image";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";

export default function Slider() {
  const[tshirts, setTshirts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTshirts = async () => {
      const data = await getTshirts();
      setTshirts(data)
    }
    fetchTshirts();
  },[]);

  return (
    <div className={styles.section}>
      <div className="inner">
        <h2 className={styles.title}>New Arrivals</h2>
        <Swiper
          id="swiper02"
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={12}
          breakpoints={{
             860: {
              spaceBetween: 24,
            },
            1025: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          navigation={{
            nextEl: `.swiper-button-next02`,
            prevEl: `.swiper-button-prev02`,
          }}
          className={styles.swiperContainer}
        >
          {tshirts.map((product) => (
            <SwiperSlide key={product.slug} className={styles.slide}>
              <Link href={`/products/${product.slug}`}>
                <figure className="product-media">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={204}
                    height={292}
                    className="product-image"
                    style={{ height: "auto" }}
                  />
                </figure>
                <p className="product-title">{product.title}</p>
                <p className="product-price">
                  ￥{product.price.toLocaleString()}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="swiper-button-prev swiper-button-prev02"
          role="button"
          aria-label="前の商品へ"
          aria-controls="swiper02"
          tabIndex={0}
        ></div>
        <div
          className="swiper-button-next swiper-button-next02"
          role="button"
          aria-label="次の商品へ"
          aria-controls="swiper02"
          tabIndex={0}
        ></div>
      </div>
        <div className="button-block">
          <Link href="/collections/tshirts" className="button button--base">
            VIEW MORE
          </Link>
        </div>
    </div>
  );
}
