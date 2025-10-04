import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import {
  APP_SUBJECT,
  APP_LOGO,
  THEME_PRIMARY,
  THEME_SECONDARY,
} from "../../config";
import "../globals.css";
import { Zap } from "@/components/zap";
import { Header } from "@/components/header";

export const metadata = {
  title: APP_SUBJECT,
  description: `MCQ App for ${APP_SUBJECT}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen bg-gray-950 font-sans">
        <Header hasStartTestButton={false} />
        <main className="pt-32">{children}</main>
      </div>
    </>
  );
}
