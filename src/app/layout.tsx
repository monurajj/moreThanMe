import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "morethanme",
  description: "rishihood students batch 2023",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-700 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
