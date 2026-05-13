import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パスワード再設定メール送信 | ONEPLUS",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div className="page-content">
      <div className="page-inner">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
