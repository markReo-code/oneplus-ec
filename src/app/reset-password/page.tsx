import type { Metadata } from "next";
import ResetPassword from "./ResetPassword";

export const metadata: Metadata = {
  title: "新しいパスワードの設定 | ONEPLUS",
  robots: { index: false, follow: true}
}

export default function Page() {
  return (
    <ResetPassword />
  );
}
