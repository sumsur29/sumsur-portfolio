import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Devanagari, Cormorant } from "next/font/google";
import "./globals.css";

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

const gravitySignature = localFont({
  src: "./fonts/Gravity.ttf",
  variable: "--font-signature",
  weight: "400",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Sumeet Surana",
  description: "Partner at Cypher Capital, backing builders across crypto, AI, and emerging tech. Builder, writer, photographer, father.",
  openGraph: {
    title: "Sumeet Surana",
    description: "Partner at Cypher Capital, backing builders across crypto, AI, and emerging tech.",
  },
  twitter: {
    card: "summary",
    title: "Sumeet Surana",
    description: "Partner at Cypher Capital, backing builders across crypto, AI, and emerging tech.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} ${cormorant.variable} ${gravitySignature.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
