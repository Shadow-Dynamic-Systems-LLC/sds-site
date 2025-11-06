import type { Metadata } from "next";
import { Tomorrow, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import FallbackNav from "@/components/FallbackNav";
import Console from "@/components/Console";
import "./globals.css";

const tomorrow = Tomorrow({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Shadow Dynamic Systems",
  description: "Digital Organism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tomorrow.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans bg-deep-black text-brand-white antialiased`}
      >
        <FallbackNav />
        <Console />
        {children}
      </body>
    </html>
  );
}
