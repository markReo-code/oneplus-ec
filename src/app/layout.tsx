// import Head from "next/head";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { RouteAnnouncer } from "./_components/RouteAnnoumcer";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ONEPLUS",
  description: "ONEPLUS(ワンプラス)はミニマルで洗練されたデザインを提案するメンズ向けアパレルブランド。Tシャツ、シャツ、ボトムス、キャップなど日常にプラスaのスタイルを。",
  openGraph: {
    title: "洗練されたメンズアパレルEC",
    description: "機能性とデザイン性を追求したメンズアパレルECサイト",
    url: "https://まだ未定です",
    siteName: "ONEPLUS",
    images: [
      {
        url: "http://localhost:3000/eyecatch.jpg",
        width: 1200,
        height: 630,
        alt: "ONEPLUS"
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONEPLUS",
    description: "機能性とデザイン性を追求したメンズアパレルECサイト",
    images: ["https://まだ未定です"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <RouteAnnouncer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
