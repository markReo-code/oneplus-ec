"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SignupData, signupSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "@/app/auth/actions";
import { PasswordField } from "@/app/_components/PasswordField";
import Link from "next/link";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupData) => {
    setServerError(null);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await signup(formData);

    if (result?.success === false) {
      setServerError(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="form">
      <div className="page-heading">
        <h1 className="page-title">新規会員登録</h1>
        <p className="page-description">以下の項目を入力してください</p>
      </div>

      {serverError && (
        <p className="formError" role="alert">
          {serverError}
        </p>
      )}
      <div className="formField">
        <label htmlFor="name" className="srOnly">
          名前
        </label>
        <input
          className="formInput"
          id="name"
          type="text"
          placeholder="氏名"
          autoComplete="name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="formError">{form.formState.errors.name.message}</p>
        )}
      </div>

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
        autoComplete="new-password"
        {...form.register("password")}
      />
      {form.formState.errors.password && (
        <p className="formError">{form.formState.errors.password.message}</p>
      )}

      <button type="submit" className="button button--lg">
        アカウントを作成する
      </button>

      <span className="formSecondary">
        既にアカウントをお持ちですか？
        <Link href="/login" className="link link--pad">
          ログイン
        </Link>
      </span>
    </form>
  );
};

export default RegisterForm;
