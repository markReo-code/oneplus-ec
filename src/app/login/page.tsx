import type { Metadata } from "next";
import { login, logout, getUserSession } from "@/app/auth/actions";
import Link from "next/link";
import styles from "./page.module.css";
import { PasswordField } from "@/app/_components/PasswordField";

export const metadata: Metadata = {
  title: "ログイン | ONEPLUS",
  robots: { index: false, follow: true}
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
          <form action={login} className="form">
            <div className="page-heading">
              <h1 className="page-title">ログイン</h1>
              <p className="page-description">
                メールアドレスとパスワードを入力してください
              </p>
            </div>
            <div className="formField">
              <label htmlFor="email" className="srOnly">
                Email
              </label>
              <input
                className="formInput"
                id="email"
                type="email"
                name="email"
                placeholder="メールアドレス"
                autoComplete="email"
                required
              />
            </div>

            <PasswordField id="password" autoComplete="current-password" />

            <p className="formForgot">
              <Link href="/forget">パスワードをお忘れですか？</Link>
            </p>

            <button type="submit" className="button button--lg">
              ログイン
            </button>

            <span className="formSecondary">
              新規会員登録
              <Link href="/register" className="link link--pad">
                はじめてご利用の方はこちら
              </Link>
            </span>
          </form>
        )}
      </div>
    </div>
  );
}
