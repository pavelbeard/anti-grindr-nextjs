import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LandingBanner from "@/app/components/landing/banner";

import "@/app/globals.css";
import favicon from "@/app/favicon.ico";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greender",
  description: "Greender - Be free from bindings. You are our focus.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} sizes="16x16" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LandingBanner />
        {children}
      </body>
    </html>
  );
}
