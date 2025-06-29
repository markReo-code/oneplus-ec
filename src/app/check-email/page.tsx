import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "メールを確認してください | ONEPLUS",
  description:
    "ご入力いただいたメールアドレス宛に、パスワード再設定用のリンクを送信しました。メールに記載されたリンクから手続きを進めてください。",
  robots: { index: false, follow: true}
};

export default function CheckEmailPage() {
  return (
    <section className="page-content">
      <div className="page-inner">
        <div className="">
          <div className="page-heading">
            <h1 className="page-title">メールを確認してください</h1>
            <p className="page-description is-left">
              ご入力いただいたメールアドレス宛に、パスワード再設定用のリンクを送信しました。
            </p>
            <p className="page-note is-left indent">
              ※メールが届かない場合は、迷惑メールフォルダをご確認ください。
              <br />
              それでも届かない場合は、再度メールアドレスをご確認の上お試しください。
            </p>
          </div>
          <span className="formSecondary">
            <Link href="/login" className="link">
              ログイン画面に戻る
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
