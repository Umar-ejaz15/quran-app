import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Al-Quran Al-Kareem — Read, Search & Explore the Holy Quran",
    template: "%s | Al-Quran Al-Kareem"
  },
  description: "Read and explore the Holy Quran with multiple translations, audio recitations, and rich navigation by Surah, Juz, Page, and more.",
  keywords: ["Quran", "Al-Quran", "Holy Quran", "Islamic", "Quran Online", "Quran Translation", "Read Quran", "Quran Search"],
  authors: [{ name: "Al-Quran Al-Kareem" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Quran",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Al-Quran" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Al-Quran" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1b6b4a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;700&family=Amiri+Quran&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
