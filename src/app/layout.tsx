import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  getBaseMetadata,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";

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

export const metadata: Metadata = getBaseMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: THEME_PRIMARY,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
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
