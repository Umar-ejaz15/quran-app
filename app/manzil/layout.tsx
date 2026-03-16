import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Quran by Manzil — Daily Sections | Noor ul Quran",
  description: "Read the Holy Quran organized by Manzil (7 daily reading sections). Traditionally used to complete the Quran over a week.",
  keywords: ["Manzil", "daily reading", "Holy Quran", "7 parts", "Islamic schedule"],
  openGraph: {
    title: "Quran by Manzil (Daily Sections)",
    description: "Read the Holy Quran organized by Manzil with translations and audio recitations",
    url: "https://www.noorulquraan.com/manzil",
  },
  alternates: {
    canonical: "https://www.noorulquraan.com/manzil",
  },
};

export default function ManzilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
