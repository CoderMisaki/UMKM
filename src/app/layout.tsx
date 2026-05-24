import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReplyUMKM AI - Asisten Operasional UMKM",
  description: "Asisten AI untuk membantu UMKM Indonesia mengelola komunikasi pelanggan dan operasional ringan secara lebih cepat, rapi, dan profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}
