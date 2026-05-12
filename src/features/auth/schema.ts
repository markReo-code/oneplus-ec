import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("適切なメールアドレスを入力してください。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, { error: "ユーザー名を入力してください。" }),
  email: z.email("適切なメールアドレスを入力してください。"),
  password: z
    .string()
    .min(6, "6文字以上で入力しください。")
    .max(128, "パスワードは128文字以内で入力してください。"),
});

export const resetPasswordRequestSchema = z.object({
  email: z.email("適切なメールアドレスを入力してください。"),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, "6文字以上で入力してください。")
    .max(128, "パスワードは128文字以内で入力してください。"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type ResetPasswordRequestData = z.infer<
  typeof resetPasswordRequestSchema
>;
export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
