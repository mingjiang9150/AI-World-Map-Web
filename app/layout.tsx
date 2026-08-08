import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-world-map-museum.mingjiang9150.chatgpt.site"),
  title: "AI World Map · 人工智能演进地图",
  description: "穿越人工智能的历史、动态、研究与核心概念。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AI World Map · Transformer",
    description: "在 AI 数字博物馆中理解 Transformer。",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI World Map — Transformer" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={geist.variable}>{children}</body></html>;
}
