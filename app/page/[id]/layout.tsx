import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const pageNumber = parseInt(id, 10);

    return {
      title: `Quran Page ${pageNumber} — Read & Explore | Noor ul Quran`,
      description: `Read Page ${pageNumber} of the Holy Quran with translations and audio recitations. Complete Mushaf (Quran manuscript) view.`,
      keywords: [
        `Quran page ${pageNumber}`,
        "Quran pages",
        "Holy Quran",
        "Mushaf",
        "Islamic",
        "Quranic studies",
      ],
      openGraph: {
        title: `Quran Page ${pageNumber}`,
        description: `Read Page ${pageNumber} of the Holy Quran with translations and audio`,
        url: `https://www.noorulquraan.com/page/${pageNumber}`,
        type: "article",
      },
      alternates: {
        canonical: `https://www.noorulquraan.com/page/${pageNumber}`,
      },
    };
  } catch (error) {
    return {
      title: "Page | Noor ul Quran",
      description: "Read Pages of the Holy Quran",
    };
  }
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
