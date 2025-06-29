import type { Metadata } from "next";
import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { PasswordField } from "@/app/_components/PasswordField";

export const metadata: Metadata = {
  title: "新規会員登録 | ONEPLUS",
  robots: { index: false, follow: true}
}

export default function RegisterPage() {
  return (
    <div className="page-content">
      <div className="page-inner">
        <form action={signup} className="form">
          <div className="page-heading">
            <h1 className="page-title">新規会員登録</h1>
            <p className="page-description">以下の項目を入力してください</p>
          </div>
          <div className="formField">
            <label htmlFor="name" className="srOnly">
              名前
            </label>
            <input
               className="formInput"
              id="name"
              type="text"
              name="name"
              placeholder="氏名"
              required
            />
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
              required
            />
          </div>

          <PasswordField id="password" autoComplete="new-password"/>

          <button type="submit" className="button button--lg">
            アカウントを作成する
          </button>

          <span className="formSecondary">
            既にアカウントをお持ちですか？<Link href="/login" className="link link--pad">ログイン</Link>
          </span>
        </form>
      </div>
    </div>
  );
}