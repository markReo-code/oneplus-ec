import type { Metadata } from "next";
import RegisterForm from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "新規会員登録 | ONEPLUS",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <div className="page-content">
      <div className="page-inner">
        <RegisterForm />
      </div>
    </div>
  );
}
