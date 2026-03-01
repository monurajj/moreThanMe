import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "../components/LayoutShell";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "morethanme",
  description: "rishihood students batch 2023",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-700 min-h-screen flex flex-col overflow-x-hidden">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
