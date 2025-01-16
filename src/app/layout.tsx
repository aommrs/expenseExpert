import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expert Expense",
  description: "Simplifying Finance, Elevating Experiences",
  icons: {
    icon: "/images/expense-logo.svg",
    shortcut: "/images/expense-logo-32x32.png",
    apple: "/images/expense-logo-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
