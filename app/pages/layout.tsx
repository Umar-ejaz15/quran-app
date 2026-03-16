import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Quran by Page — Mushaf | Noor ul Quran",
  description: "Read the Holy Quran page by page in traditional Mushaf (manuscript) format. Complete 604-page view of the Holy Quran.",
  keywords: ["Quran pages", "Mushaf", "Quran manuscript", "page view", "Holy Quran", "traditional format"],
  openGraph: {
    title: "Quran by Page — Mushaf View",
    description: "Read the Holy Quran in traditional page format with 604 pages",
    url: "https://www.noorulquraan.com/page",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/page",
  },
};

export default function PageListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
