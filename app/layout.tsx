import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Noor ul Quran — Read, Search & Explore the Holy Quran",
    template: "%s | Noor ul Quran"
  },
  description: "Read and explore the Holy Quran with multiple translations, audio recitations, and rich navigation by Surah, Juz, Page, and more.",
  keywords: ["Quran", "Noor ul Quran", "Holy Quran", "Islamic", "Quran Online", "Quran Translation", "Read Quran", "Quran Search", "Islamic Knowledge", "Quranic Studies"],
  authors: [{ name: "Noor ul Quran" }],
  creator: "Noor ul Quran",
  publisher: "Noor ul Quran",
  manifest: "/manifest.json",
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Noor ul Quran",
  },
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    google: "QR53olZK-kEVM-9UQuyGAdJKPgbCunhTTnub23K_V54",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.noorulquraan.com",
    siteName: "Noor ul Quran",
    title: "Noor ul Quran — Read, Search & Explore the Holy Quran",
    description: "Read and explore the Holy Quran with multiple translations, audio recitations, and rich navigation by Surah, Juz, Page, and more.",
    images: [
      {
        url: "https://www.noorulquraan.com/logo.svg",
        width: 200,
        height: 200,
        alt: "Noor ul Quran Logo",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@noorulquran",
    creator: "@noorulquran",
    title: "Noor ul Quran — Read, Search & Explore the Holy Quran",
    description: "Read and explore the Holy Quran online with multiple translations and audio recitations",
    images: ["https://www.noorulquraan.com/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
    shortcut: "/logo.svg",
  },
  category: "Religion",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Canonical tag for technical SEO */}
        <link rel="canonical" href="https://www.noorulquraan.com/" />
        {/* Google site verification for SEO */}
        <meta name="google-site-verification" content="QR53olZK-kEVM-9UQuyGAdJKPgbCunhTTnub23K_V54" />
        {/* Performance and crawling optimization */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* JSON-LD Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Noor ul Quran',
              description: 'Read and explore the Holy Quran with multiple translations, audio recitations, and rich navigation',
              url: 'https://www.noorulquraan.com',
              image: {
                '@type': 'ImageObject',
                url: 'https://www.noorulquraan.com/logo.svg',
                width: 200,
                height: 200,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.noorulquraan.com/search?q={search_term_string}',
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
              name: 'Noor ul Quran',
              url: 'https://www.noorulquraan.com',
              description: 'A reverent platform to read, listen to, and explore the Holy Quran',
              logo: 'https://www.noorulquraan.com/logo.svg',
              image: 'https://www.noorulquraan.com/logo.svg',
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                url: 'https://www.noorulquraan.com',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Noor ul Quran',
              description: 'Read and explore the Holy Quran online with translations and audio',
              url: 'https://www.noorulquraan.com',
              applicationCategory: 'Reference',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
        <meta name="application-name" content="Noor ul Quran" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Noor ul Quran" />
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
