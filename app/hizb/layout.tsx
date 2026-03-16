import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Quran by Hizb — 60 Parts | Noor ul Quran",
  description: "Read the Holy Quran organized by Hizb (60 quarter-sections). Each Hizb is a quarter of a Juz, providing granular navigation through the Quran.",
  keywords: ["Hizb", "Hizb Quarter", "Holy Quran", "60 parts", "Islamic reading"],
  openGraph: {
    title: "Quran by Hizb (60 Parts)",
    description: "Read the Holy Quran organized by Hizb with translations and audio recitations",
    url: "https://www.noorulquraan.com/hizb",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/hizb",
  },
};

export default function HizbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
