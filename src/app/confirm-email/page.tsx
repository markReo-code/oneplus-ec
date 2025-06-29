import Link from "next/link";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メールアドレスの確認 | ONEPLUS",
  robots: { index: false, follow: true}
};

export default function ConfirmEmailPage() {
  return (
    <section className="page-content">
      <div className="page-inner">
        <div className="">
          <div className="page-heading">
            <h1 className="page-title">確認メールを確認してください</h1>
            <p className="page-description is-left">
              アカウントを有効化するため、メールに記載されたリンクをクリックしてください。
              <br />
              もしメールが届いていない場合、迷惑メールフォルダを確認するか、もう一度新規登録してください。
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
