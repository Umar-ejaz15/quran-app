import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search the Quran — Find Verses & Phrases | Noor ul Quran",
  description: "Search the Quran by keyword or phrase. Find any verse across all translations and editions with advanced filtering options.",
  keywords: ["Quran search", "search Quran online", "find Quranic verses", "Quran translations search"],
  openGraph: {
    title: "Search the Quran — Find Verses & Phrases",
    description: "Search the Quran by keyword or phrase across all translations",
    url: "https://www.noorulquraan.com/search",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
