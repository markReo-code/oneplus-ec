"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// ログイン機能
export async function login(formData: FormData) {
  //Supabaseクライアント取得
  const supabase = createClient();

  // フォームからデータ取得
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // ログイン
  const { error } = await supabase.auth.signInWithPassword(data);

  // ログインエラーの場合
  if (error) {
    console.error("Login Error:", error.message);
    redirect("/error?type=login");
  }

  // トップページのlayoutを再検証
  revalidatePath("/", "layout");
  //トップページへリダイレクト
  redirect("/");
}

// ログアウト機能
export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout Error:", error.message);
  }

  redirect("/");
}

//  ログインユーザーを確認する関数
export async function getUserSession() {
  const supabase = createClient();
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
  const supabase = createClient();

  // フォームからデータ取得
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  //サインアップ
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data.name,
      },
    },
  });

  //サインアップエラー
  if (error) {
    const isDuplicate = 
    error.name === "AuthApiError" && 
    (error as any).status === 400 && error.message.toLowerCase().includes("already");

    console.error("SignUp Error:", error.message);

    // 重複登録の場合は signup-duplicate
    if (isDuplicate) {
      redirect("/error?type=signup-duplicate");
    }

     // その他のサインアップエラー signup-other
      redirect("/error?type=signup-other");
  }

  // 確認メールページへリダイレクト
  redirect("/confirm-email");
}

// パスワード再設定メールをユーザーに送信する関数　（パスワードリセット）
export async function resetPasswordRequest(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });

  if (error) {
    console.error("Password Reset Error:", error.message);
    redirect("/error?type=reset");
  }

  redirect("/check-email");
}