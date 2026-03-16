import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Surahs — Al-Quran Al-Kareem | Noor ul Quran",
  description: "Read all 114 blessed Surahs of the Holy Quran with translations, audio recitations, and detailed information about each chapter.",
  keywords: ["Surahs", "chapters", "Holy Quran", "Al-Quran Al-Kareem", "Islamic scripture", "Quranic chapters"],
  openGraph: {
    title: "All 114 Surahs — Holy Quran",
    description: "Browse all Surahs (chapters) of the Holy Quran with translations and audio recitations",
    url: "https://www.noorulquraan.com/surahs",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/surahs",
  },
};

export default function SurahsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
