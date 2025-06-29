import type { Metadata } from "next";
import Success from "./Success";

export const metadata: Metadata = {
  title: "決済完了 | ONEPLUS",
  robots: { index: false, follow: true}
}

export default function Page() {
  return (
    <Success />
  )
}
