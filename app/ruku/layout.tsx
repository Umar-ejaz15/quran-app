import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Quran by Ruku — Verses Section | Noor ul Quran",
  description: "Read the Holy Quran organized by Ruku (559 verse sections). Navigate the Quran using the traditional Ruku divisions.",
  keywords: ["Ruku", "verse section", "Holy Quran", "Islamic reading", "Quranic structure"],
  openGraph: {
    title: "Quran by Ruku (Verse Sections)",
    description: "Read the Holy Quran organized by Ruku with translations and audio recitations",
    url: "https://www.noorulquraan.com/ruku",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/ruku",
  },
};

export default function RukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
