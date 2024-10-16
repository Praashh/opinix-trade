import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProviders } from "./_provider";
import Navbar from "@/components/landing/Appbar/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OpiniX",
  description: "An Opinion Trading Platform",
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
      >
        <Navbar/>
        <SessionProviders>{children}</SessionProviders>
      </body>
    </html>
  );
}
