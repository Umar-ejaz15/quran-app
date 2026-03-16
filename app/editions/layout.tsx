import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quran Editions & Translations — Noor ul Quran",
  description: "Browse available Quran editions and translations. Read the Holy Quran in 50+ languages and multiple scholarly translations.",
  keywords: ["Quran editions", "Quran translations", "Holy Quran", "translations", "scholarly editions"],
  openGraph: {
    title: "Quran Editions & Translations",
    description: "Browse available Quran editions and translations in multiple languages",
    url: "https://www.noorulquraan.com/editions",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/editions",
  },
};

export default function EditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
