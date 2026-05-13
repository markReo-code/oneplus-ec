"use client";

import { resetPasswordRequest } from "@/app/auth/actions";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  ResetPasswordRequestData,
  resetPasswordRequestSchema,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ResetPasswordRequestData>({
    resolver: zodResolver(resetPasswordRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordRequestData) => {
    setServerError(null);

    const formData = new FormData();
    formData.append("email", data.email);

    const result = await resetPasswordRequest(formData);

    if (result?.success === false) {
      setServerError(result.message);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="page-heading">
        <h1 className="page-title">パスワードの再発行</h1>
        <p className="page-description">
          ご登録時のメールアドレスを入力してください。
          <br />
          パスワード再設定のための認証メールを送信します。
        </p>
      </div>

      {serverError && (
        <p className="formAlert" role="alert">
          {serverError}
        </p>
      )}

      <div className="formField">
        <label htmlFor="email" className="srOnly">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          placeholder="メールアドレス"
          className="formInput"
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="formError">{form.formState.errors.email.message}</p>
        )}
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
  );
};

export default ForgotPasswordForm;
