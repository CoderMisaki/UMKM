import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReplyUMKM AI - Dashboard",
  description: "Asisten AI untuk membantu UMKM Indonesia mengelola komunikasi pelanggan dan operasional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} antialiased min-h-screen bg-slate-50 font-sans`}>
        {children}
      </body>
    </html>
  );
}
