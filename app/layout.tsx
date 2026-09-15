import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Space Grotesk is Latin-only, so next/font's self-hosting works fine here
// (unlike IBM Plex Sans KR below, which needs a real Korean subset next/font can't serve yet).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "허니팟 기반 사이버 공격 분석 시스템",
  description:
    "T-Pot 허니팟으로 실제 사이버 공격을 수집하고, LightGBM과 Claude API가 자동으로 공격을 분류·해설하는 AI 기반 위협 분석 플랫폼",
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`h-full antialiased ${spaceGrotesk.variable}`}>
      <head>
        {/* next/font/google has no Korean subset for IBM Plex Sans KR (or any CJK font) yet, so a
            self-hosted build would silently drop Hangul glyphs. Loading via <link> keeps full Hangul coverage. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
