"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorClient() {
  const type = useSearchParams().get("type");

  const map = {
    login: {
      title: "ログインできませんでした",
      message: "メールアドレスまたはパスワードが間違っています。",
      href: "/login",
      label: "ログインページに戻る",
    },
    signup: {
      title: "登録できませんでした",
      message: "メールアドレスが既に使用されています。",
      href: "/register",
      label: "新規登録ページに戻る",
    },
    reset: {
      title: "メール送信に失敗しました",
      message: "再設定用メールの送信中にエラーが発生しました。入力されたメールアドレスに誤りがある可能性があります。再度お試しください。",
      href: "/forget",
      label: "パスワード再設定ページに戻る",
    },
  } as const;

  const { title, message, href, label } = map[type as keyof typeof map] ?? {
    title: "エラーが発生しました",
    message: "申し訳ありません。予期しないエラーが発生しました。",
    href: "/",
    label: "トップページに戻る",
  };

  return (
    <>
      <div className="page-heading">
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{message}</p>
      </div>
      <Link href={href} className="button button--lg button--base">{label}</Link>
    </>
  );
}
