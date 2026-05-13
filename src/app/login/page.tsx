import type { Metadata } from "next";
import { logout, getUserSession } from "@/app/auth/actions";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "ログイン | ONEPLUS",
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  const session = await getUserSession();

  return (
    <div className="page-content">
      <div className="page-inner">
        {session ? (
          <form action={logout} className="form">
            <div className="page-heading">
              <h1 className="page-title">ログアウト</h1>
              <p className="page-description">
                現在ログインしています。
                <br />
                ログアウトするには下のボタンを押してください。
              </p>
            </div>
            <button type="submit" className="button button--lg">
              ログアウト
            </button>
          </form>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
