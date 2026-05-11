import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "毛球护理所 | 宠物洗护美容",
  description: "预约制宠物洗护美容，从皮毛评估、低敏清洁到造型修剪。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
