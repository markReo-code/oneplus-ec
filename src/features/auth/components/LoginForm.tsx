"use client";

import Link from "next/link";
import { login } from "@/app/auth/actions";
import { PasswordField } from "@/app/_components/PasswordField";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setServerError(null);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await login(formData);

    if (result?.success === false) {
      setServerError(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="form">
      <div className="page-heading">
        <h1 className="page-title">ログイン</h1>
        <p className="page-description">
          メールアドレスとパスワードを入力してください
        </p>
      </div>

      {serverError && (
        <p className="formAlert" role="alert">
          {serverError}
        </p>
      )}

      <div className="formField">
        <label htmlFor="email" className="srOnly">
          Email
        </label>
        <input
          className="formInput"
          id="email"
          type="email"
          placeholder="メールアドレス"
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="formError">{form.formState.errors.email.message}</p>
        )}
      </div>

      <PasswordField
        id="password"
        autoComplete="current-password"
        {...form.register("password")}
      />
      {form.formState.errors.password && (
        <p className="formError">{form.formState.errors.password.message}</p>
      )}

      <p className="formForgot">
        <Link href="/forget">パスワードをお忘れですか？</Link>
      </p>

      <button type="submit" className="button button--lg">
        ログイン
      </button>

      <span className="formSecondary">
        新規会員登録
        <Link href="/register" className="link link--pad">
          はじめてご利用の方はこちら
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
