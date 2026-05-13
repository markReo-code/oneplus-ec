import Link from "next/link";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メールアドレスの確認 | ONEPLUS",
  robots: { index: false, follow: true },
};

export default function ConfirmEmailPage() {
  return (
    <section className="page-content">
      <div className="page-inner">
        <div className="">
          <div className="page-heading">
            <h1 className="page-title">確認メールを確認してください</h1>
            <p className="page-description is-left">
              新規登録が完了している場合は、入力したメールアドレス宛に確認メールをお送りしています。
              <br />
              メールに記載されたリンクをクリックして、アカウントを有効化してください。
              <br />
              メールが届かない場合は、迷惑メールフォルダをご確認ください。
              <br />
              すでに登録済みの方は、ログインまたはパスワード再設定をお試しください。
            </p>
          </div>
          <span className="formSecondary">
            <Link href="/login" className={styles.link}>
              ログインページへ
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
