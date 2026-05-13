"use client";
import { PasswordField } from "@/app/_components/PasswordField";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UpdatePasswordData, updatePasswordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPasswordForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        alert(
          "リンクが無効または期限切れです。もう一度パスワード再設定メールを受け取ってください。",
        );
        router.push("/forget");
        return;
      }

      setEmail(data.user.email ?? null);
    };

    fetchUser();
  }, [supabase, router]);

  // パスワード更新の送信処理
  const onSubmit = async (data: UpdatePasswordData) => {
    setServerError(null);

    if (!email) {
      setServerError(
        "リンクの有効期限が切れています。再度パスワード再設定を行ってください。",
      );
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setServerError(
        "パスワードの更新に失敗しました。時間をおいて再度お試しください。",
      );
      return;
    }
    router.push("/login");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h1 className="page-title">
        新しいパスワードを
        <br className="sp__only" />
        設定してください
      </h1>

      {email && (
        <input
          type="email"
          name="email"
          value={email}
          autoComplete="username"
          hidden
          readOnly
        />
      )}

      <PasswordField
        id="password"
        placeholder="新しいパスワード"
        label="新しいパスワード"
        autoComplete="new-password"
        {...form.register("password")}
      />

      {form.formState.errors.password && (
        <p className="formError">{form.formState.errors.password.message}</p>
      )}

      <p className="page-hint">
        ※パスワードは半角英数6文字以上で入力してください。
      </p>
      <p className="page-hint indent">
        ※このリンクは短時間（約5〜15分程度）で無効になります。
        <br />
        メールを開いたらすぐにパスワードを設定してください。
      </p>

      <button type="submit" className="button button--lg">
        パスワードを更新
      </button>
      <p className="formSecondary">
        パスワードを更新後は
        <br className="sp__only" />
        <Link href="/login" className="link">
          ログインページ
        </Link>
        へお進みください。
      </p>
    </form>
  );
};

export default ResetPasswordForm;
