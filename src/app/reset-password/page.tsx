import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "新しいパスワードの設定 | ONEPLUS",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <section className="page-content">
      <div className="page-inner">
        <ResetPasswordForm />
      </div>
    </section>
  );
}
