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
} from "../config";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          // Set CSS variables for theming
          ["--color-primary" as any]: THEME_PRIMARY,
          ["--color-secondary" as any]: THEME_SECONDARY,
        }}
      >
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
          <header className="flex items-center gap-4 px-6 shadow bg-white">
            <img src={APP_LOGO} alt="Logo" className="h-20 w-auto rounded" />
            <h1
              className="text-xl font-bold mr-auto"
              style={{ color: "var(--color-primary)" }}
            >
              MCQ Hub{" "}
              <span
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.875rem",
                }}
              >
                Technology
              </span>
            </h1>
            <a
              href="/"
              className="px-4 py-2 rounded font-medium text-white"
              style={{ background: "var(--color-primary)" }}
            >
              Topics
            </a>
          </header>
        </div>
        <main className="pt-32">{children}</main>
      </body>
    </html>
  );
}
