# ONEPLUS

## 概要

このリポジトリは、Next.js（App Router）と TypeScript を用いて構築した、架空のメンズアパレルECサイト「ONEPLUS」の実装例です。  
現在の実務ではWordPressが中心のため、Reactベースの最新技術スタック（Next.js, Supabase, Stripe, Zustandなど）を活用した実践的なECサイトを構築し、**フロントエンド技術の証明およびポートフォリオとして可視化**することを目的としています。
実在のブランドではありませんが、UI設計・アクセシビリティ・デザイン面にも配慮し、**Jamstack構成で本番想定のECサイトを構築する技術力**を表現しています。

## 技術スタック

- Next.js 14.1.4（App Router）
- TypeScript
- Supabase（データベース、認証、ストレージ）
- Stripe （決済機能・テストモード）
- Zustand （カート状態の管理）
- CSS Modules
- React Hooks
- HTML / WAI-ARIA（アクセシビリティ対応）
- Node.js（開発環境）

## 主なディレクトリ構成

```
src/
├── app/
│   ├── _components/         # 共通UIコンポーネント群（ヘッダー、ドロワー、ボタンなど）
│   ├── _constants/          # 定数やナビゲーションデータなど
│   ├── _hooks/              # カスタムフック群（フォーカストラップや背景固定など）
│   ├── _store/              # Zustandによる状態管理（カート機能周り）
│   ├── api/                 # SupabaseやStripe関連のAPI関数
│   ├── auth/                # 認証関連ユーティリティ
│   ├── cart/                # カートページ
│   ├── check-email/         # パスワード再設定用リンク送信の案内ページ
│   ├── collections/         # 商品カテゴリページ（動的ルーティング）
│   │   └── [category]/      # カテゴリ別の商品一覧ページ
│   │       └── page.tsx
│   ├── confirm-email/       # 新規会員登録後の「アカウント有効化」案内ページ
│   ├── error/               # エラーページ
│   ├── forget/              # パスワード再設定メール申請ページ
│   ├── login/               # ログインページ（ログイン、ログアウト）
│   ├── products/            # 商品関連ページ（一覧・詳細）
│   │   ├── page.tsx         # 商品一覧ページ（全商品）
│   │   └── [slug]/          # 商品詳細ページ（動的ルーティング）
│   │       └── page.tsx     # ※内部で ProductDetail.tsx を分割して管理
│   ├── register/            # 新規会員登録ページ（サインアップ）
│   ├── reset-password/      # パスワード再設定ページ
│   ├── search/              # 商品検索ページ
│   ├── success/             # 決済完了ページ
│   └── page.tsx             # トップページ
│
├── utils/
│   └── supabase/            # Supabase関連の初期化・共通処理
│
├── middleware.ts           # Edge Middleware（Supabase セッション同期）
├── next.config.mjs         # Next.js 設定
├── tsconfig.json           # TypeScript 設定
├── package.json            # スクリプト & 依存
├── .env.example            # 環境変数テンプレート（本番は Vercel に設定）
```

## 主な実装機能

- **ユーザー認証 & アカウント管理**  
   メール確認付き Sign-Up / Login / Logout / パスワード再設定（Supabase Auth）

- **商品検索機能**  
  カテゴリ名の同義語に対応したシンプルかつ高速な検索体験を実現（Supabase + PGroonga）

- **カート機能**  
  カートへの追加 / 削除 / 数量変更を Zustand　でリアルタイム同期

- **決済処理**  
  Stripe Checkout を組み込み、メールアドレスとカード情報だけでワンページ決済。  
  **テストモード**のため課金は発生せず、カード番号は `4242 4242 4242 4242` を入力すれば動作確認できます。  
  決済完了後は - Stripe ダッシュボードに支払いインテントが反映され、同時に注文データが Supabase の `orders` テーブルへ自動 INSERT される仕組みです。

- **アクセシブルな UI コンポーネント**  
  ドロワー・ドロップダウン・ フォーカストラップ（WAI-ARIA対応）

- **メタデータ対応**  
  各ページに動的 `<title>` / OGP / Twitter Card を設定

- **カスタムフックの活用**  
  `useEscapeToClose`, `useFocusTrap`、`useOutsideClick` など UI 制御系

## スクリーンショット
GIF と数枚のスクリーンショットを準備中です。近日追加予定 🔧

## 使い方