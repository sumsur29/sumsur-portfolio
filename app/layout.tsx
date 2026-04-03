import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Devanagari, Cormorant, Alex_Brush } from "next/font/google";
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

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sumeet Surana",
  description: "Builder, Writer, Photographer. The journey is more beautiful than the destination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} ${cormorant.variable} ${alexBrush.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
