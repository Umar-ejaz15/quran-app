import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Al-Quran Al-Kareem - Read, Search & Explore the Holy Quran",
    template: "%s | Al-Quran"
  },
  description: "Read and explore the Holy Quran with multiple translations, search verses, navigate by Juz, Surah, or Page. A modern, clean interface for accessing the Quran online.",
  keywords: ["Quran", "Al-Quran", "Holy Quran", "Islamic", "Quran Online", "Quran Translation", "Read Quran", "Quran Search"],
  authors: [{ name: "Al-Quran" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Quran",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alquran.example.com",
    title: "Al-Quran Al-Kareem",
    description: "Read and explore the Holy Quran online",
    siteName: "Al-Quran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Quran Al-Kareem",
    description: "Read and explore the Holy Quran online",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="application-name" content="Al-Quran" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Al-Quran" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#2d5f4f" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
