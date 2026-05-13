"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  loginSchema,
  resetPasswordRequestSchema,
  signupSchema,
} from "@/features/auth/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ログイン機能
export async function login(formData: FormData) {
  //Supabaseクライアント取得
  const supabase = await createClient();

  // フォームからデータ取得
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Login Validation Error:", result.error);
    return {
      success: false,
      message: "入力内容を確認してください。",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error.message);
    return {
      success: false,
      message: "メールアドレスまたはパスワードが間違っています。",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// ログアウト機能
export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout Error:", error.message);
  }

  redirect("/");
}

//  ログインユーザーを確認する関数
export async function getUserSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Session Fetch Error:", error.message);
    redirect("/login");
  }
  return session;
}

// サインアップ
export async function signup(formData: FormData) {
  //Supabaseクライアント取得
  const supabase = await createClient();

  // フォームからデータ取得
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signupSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Signup Validation Error:", result.error);

    return {
      success: false,
      message: "入力内容を確認してください。",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const { name, email, password } = result.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    const status = "status" in error ? error.status : undefined;

    const isDuplicate =
      error.name === "AuthApiError" &&
      status === 400 &&
      error.message.toLowerCase().includes("already");

    console.error("SignUp Error:", error.message);

    if (isDuplicate) {
      return {
        success: false,
        message: "このメールアドレスはすでに登録されています。",
        errors: {
          email: ["このメールアドレスはすでに登録されています。"],
        },
      };
    }

    return {
      success: false,
      message:
        "アカウントの作成に失敗しました。時間をおいて再度お試しください。",
    };
  }
  redirect("/confirm-email");
}

// パスワード再設定メールをユーザーに送信する関数　（パスワードリセット）
export async function resetPasswordRequest(formData: FormData) {
  const supabase = await createClient();
  const rawData = {
    email: formData.get("email"),
  };

  const result = resetPasswordRequestSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Password Reset Error:", result.error);

    return {
      success: false,
      message: "入力内容を確認してください。",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }
  const { email } = result.data;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });

  if (error) {
    console.error("Password Reset Error:", error.message);

    return {
      success: false,
      message:
        "パスワード再設定メールの送信に失敗しました。時間をおいて再度お試しください。",
    };
  }

  redirect("/check-email");
}
