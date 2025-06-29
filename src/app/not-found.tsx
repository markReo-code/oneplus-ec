import Link from "next/link";
import styles from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ページが見つかりませんでした | ONEPLUS",
    description: "アクセスしようとしたページが見つかりませんでした。URLをご確認ください。",
    robots: { index: false, follow: false}
}

export default function NotFound() {
  return (
    <div className={styles.content}>
      <div className={styles.inner}>
        <div className={styles.wrap}>
          <span className={styles.bgText}>404</span>
          <div className={styles.heading}>
            <h1 className={styles.title}>ページが見つかりませんでした</h1>
            <p className={styles.description}>
              申し訳ありません、お客様がアクセスしようとしたページが見つかりませんでした。
              <br />
              恐れ入りますが、正しくアドレスが入力されているか、もう一度ご確認ください。
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Link href="/" className="button">
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
