import type { Metadata } from "next";
import { getMeta } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const surahNumber = parseInt(id, 10);
    const metaData = await getMeta();
    const surah = metaData.data.surahs.references.find(
      (s: any) => s.number === surahNumber
    );

    if (!surah) {
      return {
        title: "Surah | Noor ul Quran",
        description: "Read Surah of the Holy Quran",
      };
    }

    return {
      title: `${surah.englishName} — Surah ${surahNumber} | Noor ul Quran`,
      description: `Read Surah ${surah.englishName} (Chapter ${surahNumber}) with translations and recitations. ${surah.ayahs} verses of the Holy Quran.`,
      keywords: [
        `Surah ${surah.englishName}`,
        `Chapter ${surahNumber}`,
        "Quran",
        "Holy Quran",
        "Islamic",
      ],
      openGraph: {
        title: `${surah.englishName} — Surah ${surahNumber}`,
        description: `Read Surah ${surah.englishName} with translations and audio recitation`,
        url: `https://www.noorulquraan.com/surah/${surahNumber}`,
        type: "article",
      },
      alternates: {
        canonical: `https://www.noorulquraan.com/surah/${surahNumber}`,
      },
    };
  } catch (error) {
    return {
      title: "Surah | Noor ul Quran",
      description: "Read Surah of the Holy Quran",
    };
  }
}

export default function SurahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
