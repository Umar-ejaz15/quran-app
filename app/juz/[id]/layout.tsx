import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const juzNumber = parseInt(id, 10);

    return {
      title: `Juz ${juzNumber} — Read & Explore | Noor ul Quran`,
      description: `Read Juz ${juzNumber} (Part ${juzNumber}) of the Holy Quran with translations and audio recitations`,
      keywords: [
        `Juz ${juzNumber}`,
        `Part ${juzNumber}`,
        "Quran",
        "Holy Quran",
        "Islamic",
        "Quranic studies",
      ],
      openGraph: {
        title: `Juz ${juzNumber} — Holy Quran`,
        description: `Read Juz ${juzNumber} with translations and audio recitation`,
        url: `https://www.noorulquraan.com/juz/${juzNumber}`,
        type: "article",
      },
      alternates: {
        canonical: `https://www.noorulquraan.com/juz/${juzNumber}`,
      },
    };
  } catch (error) {
    return {
      title: "Juz | Noor ul Quran",
      description: "Read Juz (Part) of the Holy Quran",
    };
  }
}

export default function JuzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
