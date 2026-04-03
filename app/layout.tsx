import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

// Inter for body and headers
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// JetBrains Mono for math and code
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mathbox | Learn Math for AI/ML",
  description:
    "A premium interactive platform for mastering mathematics behind Artificial Intelligence and Machine Learning through code and 3D visualizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFas9aVVUsn"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
