import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Alldo Faiz Ramadhani" },
    {
      name: "Alldo Faiz Ramadhani",
      url: "https://www.linkedin.com/in/alldofaiz/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
