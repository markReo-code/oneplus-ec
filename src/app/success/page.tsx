import type { Metadata } from "next";
import { Suspense } from "react";
import Success from "./Success";

export const metadata: Metadata = {
  title: "決済完了 | ONEPLUS",
  robots: { index: false, follow: true}
}

export default function Page() {
  return (
    <Suspense>
        <Success />
    </Suspense>
  )
}
