import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sajda (Prostration) Verses — Holy Quran | Noor ul Quran",
  description: "Find all 15 Sajda (prostration) verses in the Holy Quran. These are the verses where prostration is recommended during recitation.",
  keywords: ["Sajda", "prostration verses", "Holy Quran", "Islamic worship", "Quranic guidance"],
  openGraph: {
    title: "Sajda (Prostration) Verses — Holy Quran",
    description: "Find all 15 Sajda verses where prostration is performed during Quran recitation",
    url: "https://www.noorulquraan.com/sajda",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/sajda",
  },
};

export default function SajdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
