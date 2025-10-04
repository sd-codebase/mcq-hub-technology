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

import { THEME_PRIMARY, THEME_SECONDARY } from "../config";

import "./globals.css";

export const metadata = {
  title: "MCQ Hub Technology",
  description: `MCQ App for coding skill`,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          // Set CSS variables for theming
          ["--color-primary" as any]: THEME_PRIMARY,
          ["--color-secondary" as any]: THEME_SECONDARY,
        }}
      >
        {children}
      </body>
    </html>
  );
}
