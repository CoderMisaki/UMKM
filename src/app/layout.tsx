import type { Metadata } from "next";
import "./globals.css";


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
      <body className="antialiased min-h-screen bg-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
