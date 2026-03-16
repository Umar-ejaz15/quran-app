import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Quran by Juz — 30 Parts | Noor ul Quran",
  description: "Read the Holy Quran organized by Juz (30 parts). Each Juz is roughly equal in length and represents one day of Ramadan recitation.",
  keywords: ["Juz", "Juz Amma", "Holy Quran", "30 parts", "Islamic reading", "Ramadan"],
  openGraph: {
    title: "Quran by Juz (30 Parts)",
    description: "Read the Holy Quran organized by Juz with translations and audio recitations",
    url: "https://www.noorulquraan.com/juz",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/juz",
  },
};

export default function JuzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
