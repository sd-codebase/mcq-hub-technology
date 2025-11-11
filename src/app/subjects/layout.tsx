import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { generatePageMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import "../globals.css";
import { Zap } from "@/components/zap";
import { Header } from "@/components/header";

export const metadata: Metadata = generatePageMetadata({
  title: "Subjects & Topics - Browse Coding Quizzes",
  description:
    "Explore coding quizzes across multiple programming languages and technologies. Choose from JavaScript, TypeScript, React, Node.js, and more.",
  path: "/subjects",
});

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
