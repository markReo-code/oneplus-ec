import type { Metadata } from "next";
import { Suspense } from "react";
import ErrorClient from "./ErrorClient";

export const metadata: Metadata = {
  title: "エラーが発生しました | ONEPLUS",
  description:
    "申し訳ありません。予期しないエラーが発生しました。時間をおいて再度お試しいただくか、サポートまでお問い合わせください。",
    robots: { index: false, follow: true}
};

export default function ErrorPage() {
  return (
    <div className="page-content">
      <div className="page-inner">
        <Suspense>
          <ErrorClient />
        </Suspense>
      </div>
    </div>
  );
}