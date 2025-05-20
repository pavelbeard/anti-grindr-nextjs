import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";

import "./globals.css";
import favicon from "./favicon.ico";
import { lazy } from "react";
import UserStatus from "@/components/staff/user-status";

const DevStatus = dynamic(() =>
  import("@/components/staff/dev-status").then((mod) => mod.default)
);

const Geolocalization = lazy(
  () => import("@/components/staff/geolocalization")
);

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
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href={favicon.src} sizes="16x16" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
          suppressHydrationWarning
        >
          <UserStatus />
          <Geolocalization />
          <DevStatus />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
