import type { Metadata } from "next";
import Cart from "./Cart";

export const metadata: Metadata = {
  title: "ショッピングカート | ONEPLUS",
  description: "ONEPLUSのカートページです。",
  robots: { index: false, follow: true}
};

export default function Page() {
  return (
    <Cart />
  )
}
