import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "ワリカン裁判所 | 飲み会の割り勘、判決します",
  description:
    "飲み会の割り勘金額を「判決」形式で算出。公正な判決をグループLINEに送ろう！",
  openGraph: {
    title: "ワリカン裁判所",
    description: "飲み会の割り勘金額を「判決」形式で算出。公正な判決をグループLINEに送ろう！",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ワリカン裁判所",
    description: "飲み会の割り勘金額を「判決」形式で算出。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
