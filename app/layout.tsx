import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi-User Blogging Platform",
  description: "A modern, full-stack blogging platform built with Next.js, tRPC, and PostgreSQL.",
  keywords: ["blog", "blogging", "content", "writing", "publishing"],
  authors: [{ name: "BlogPlatform Team" }],
  openGraph: {
    title: "Multi-User Blogging Platform",
    description: "A modern, full-stack blogging platform built with Next.js, tRPC, and PostgreSQL.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-User Blogging Platform",
    description: "A modern, full-stack blogging platform built with Next.js, tRPC, and PostgreSQL.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
