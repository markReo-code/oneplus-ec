"use client";

import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { PasswordField } from "../_components/PasswordField";

export default function ResetPassword() {
  const supabase = createClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        alert("リンクが無効または期限切れです。もう一度パスワード再設定メールを受け取ってください。");
        router.push("/forget");
        return;
      }

      setEmail(data.user.email ?? null);
    }

    fetchUser();
  },[]);


  // パスワード更新の送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert("リンクの有効期限が切れています。再度パスワード再設定を行ってください。");
      return;
    }

    if (!password) {
      alert("パスワードを入力してください。");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert("パスワードの更新に失敗しました");
      return;
    }

    alert("パスワードが更新されました。ログインしてください");
    router.push("/login");
  };

  return (
    <section className="page-content">
      <div className="page-inner">
        <form onSubmit={handleSubmit}>
          <h1 className="page-title">新しいパスワードを<br className="sp__only"/>設定してください</h1>
         
          <PasswordField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="新しいパスワード"
            label="新しいパスワード"
            autoComplete="new-password"
            required
          />

          <p className="page-hint">※パスワードは半角英数6文字以上で入力してください。</p>
          <p className="page-hint indent">※このリンクは短時間（約5〜15分程度）で無効になります。<br />メールを開いたらすぐにパスワードを設定してください。</p>

          <button type="submit" className="button button--lg">
            パスワードを更新
          </button>
          <p className="formSecondary">
            パスワードを更新後は<br className="sp__only"/>
            <Link href="/login" className="link">
              ログインページ
            </Link>
            へお進みください。
          </p>
        </form>
      </div>
    </section>
  );
}
