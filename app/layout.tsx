import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: "OWASP Dependency-Track Dashboard",
  description: "Management and reporting dashboard for OWASP Dependency-Track"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>{children}</body>
    </html>
  );
}
