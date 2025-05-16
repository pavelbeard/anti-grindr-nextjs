import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import DevLogo from "@/components/svg/staff/dev-logo";
import PreviewLogo from "@/components/svg/staff/preview-logo";

import "./globals.css";

import favicon from "./favicon.ico";

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
        >
          {process.env.NODE_ENV !== "production" && (
            <div className="absolute flex place-content-center bottom-5 right-5 bg-[#b7acac] rounded-full p-0.5 font-bold">
              {process.env.NODE_ENV == "test" ? (
                <PreviewLogo height={48} width={48} />
              ) : (
                <DevLogo height={48} width={48} />
              )}
            </div>
          )}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
