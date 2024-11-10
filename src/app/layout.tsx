import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeContextProvider from "@/context/theme-provider";

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
  title: "Next.js Blog Boilerplate",
  description: "Blog Boilerplate built with Next.js in Typescript with Prisma, and Tailwind CSS",
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
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
