import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Noor ul Quran",
  description: "Learn about Noor ul Quran, a reverent platform dedicated to reading, studying, and exploring the Holy Quran with multiple translations, audio recitations, and comprehensive navigation features.",
  keywords: ["about Noor ul Quran", "Quran platform", "Islamic app", "Quran reader", "about us"],
  openGraph: {
    title: "About Noor ul Quran",
    description: "A reverent platform to read, listen to, and explore the Holy Quran",
    url: "https://www.noorulquraan.com/about",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
