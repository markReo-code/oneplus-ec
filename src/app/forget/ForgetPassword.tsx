"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPasswordRequest } from "../auth/actions";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    await resetPasswordRequest(formData);
  };

  return (
    <div className="page-content">
      <div className="page-inner">
        <form onSubmit={handleSubmit}>
          <div className="page-heading">
            <h1 className="page-title">パスワードの再発行</h1>
            <p className="page-description">
              ご登録時のメールアドレスを入力してください。
              <br />
              パスワード再設定のための認証メールを送信します。
            </p>
          </div>

          <div className="formField">
            <label htmlFor="email" className="srOnly">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={email}
              className="formInput"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button button--lg">
            再発行する
          </button>
          <span className="formSecondary">
            <Link href="/login" className="link">
              ログイン画面に戻る
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
