import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Noor ul-Quran — Read, Search & Explore the Holy Quran",
    template: "%s | Noor ul-Quran"
  },
  description: "Read and explore the Holy Quran with multiple translations, audio recitations, and rich navigation by Surah, Juz, Page, and more.",
  keywords: ["Quran", "Noor ul-Quran", "Holy Quran", "Islamic", "Quran Online", "Quran Translation", "Read Quran", "Quran Search"],
  authors: [{ name: "Noor ul-Quran" }],
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
    title: "Noor ul-Quran",
    description: "Read and explore the Holy Quran online",
    siteName: "Noor ul-Quran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor ul-Quran",
    description: "Read and explore the Holy Quran online",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Canonical tag for technical SEO */}
        <link rel="canonical" href="https://www.noorulquran.com/" />
        {/* Google site verification for SEO */}
        <meta name="google-site-verification" content="QR53olZK-kEVM-9UQuyGAdJKPgbCunhTTnub23K_V54" />
        {/* JSON-LD Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Noor ul-Quran',
              description: 'Read and explore the Holy Quran with multiple translations, audio recitations, and rich navigation',
              url: 'https://www.noorulquran.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.noorulquran.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Noor ul-Quran',
              url: 'https://www.noorulquran.com',
              description: 'A reverent platform to read, listen to, and explore the Holy Quran',
              sameAs: [],
              image: 'https://www.noorulquran.com/logo.svg',
            }),
          }}
        />
        <meta name="application-name" content="Noor ul-Quran" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Noor ul-Quran" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#6d4831" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;700&family=Amiri+Quran&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
