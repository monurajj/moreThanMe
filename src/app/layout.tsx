import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import RepublicDayFlowers from "../components/RepublicDayFlowers";
import FestivalTestButton from "../components/FestivalTestButton";
import { FestivalTestProvider } from "../contexts/FestivalTestContext";

export const metadata: Metadata = {
  title: "morethanme",
  description: "rishihood students batch 2023",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-700 min-h-screen flex flex-col">
        <FestivalTestProvider>
          <Navbar />
          <RepublicDayFlowers />
          <FestivalTestButton />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </FestivalTestProvider>
      </body>
    </html>
  );
}
