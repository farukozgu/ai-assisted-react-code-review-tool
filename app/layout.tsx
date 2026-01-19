import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AI Frontend Code Review",
  description: "AI-assisted React code review tool",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased bg-[#F9FAFB] dark:bg-[#1E1E1E]`} >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
