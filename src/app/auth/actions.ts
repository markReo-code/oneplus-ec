"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  loginSchema,
  resetPasswordRequestSchema,
  signupSchema,
} from "@/features/auth/schema";
import { revalidatePath } from "next/cache";

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
    redirect("/error?type=login");
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error.message);
    redirect("/error?type=login");
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
    redirect("/login"); // エラー時はログインページへリダイレクト
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
    redirect("/error?type=signup-other");
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
      redirect("/error?type=signup-duplicate");
    }

    redirect("/error?type=signup-other");
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
    redirect("/error?type=reset");
  }
  const { email } = result.data;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });

  if (error) {
    console.error("Password Reset Error:", error.message);
    redirect("/error?type=reset");
  }

  redirect("/check-email");
}
