import type { Metadata } from "next";
import ForgetPassword from "./ForgetPassword";

export const metadata: Metadata = {
  title: "パスワード再設定メール送信 | ONEPLUS",
  robots: { index: false, follow: true}
}

export default function Page() {
  
  return (
    <ForgetPassword />
  );
}
