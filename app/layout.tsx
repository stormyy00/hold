import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Navigation from "@/components/navigation";
import Providers from "@/components/session";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Hold",
  description: "The modern link management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navigation />
          {children}
          <Toaster />
          {/* <Footer /> */}
        </body>
      </html>
    </Providers>
  );
}
