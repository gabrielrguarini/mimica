import type { Viewport, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimica",
  description: "Divirta-se",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "Mimica",
    "jogo",
    "mimica",
    "imagem",
    "ação",
    "palavras",
    "imitar",
  ],

  authors: [
    { name: "Gabriel Guarini" },
    {
      name: "Gabriel Guarini",
      url: "https://www.linkedin.com/in/gabriel-guarini",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  viewportFit: "cover",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Analytics />
      <body className={`select-none ${inter.className}`}>{children}</body>
    </html>
  );
}
