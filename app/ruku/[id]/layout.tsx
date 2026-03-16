import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const rokuNumber = parseInt(id, 10);

    return {
      title: `Ruku ${rokuNumber} — Holy Quran Reading | Noor ul Quran`,
      description: `Read Ruku ${rokuNumber} (Verse Section) of the Holy Quran with translations and audio recitations.`,
      keywords: [
        `Ruku ${rokuNumber}`,
        "Ruku",
        "Holy Quran",
        "Islamic",
        "Quranic studies",
      ],
      openGraph: {
        title: `Ruku ${rokuNumber} — Holy Quran`,
        description: `Read Ruku ${rokuNumber} with translations and audio recitation`,
        url: `https://www.noorulquraan.com/ruku/${rokuNumber}`,
        type: "article",
      },
      alternates: {
        canonical: `https://www.noorulquraan.com/ruku/${rokuNumber}`,
      },
    };
  } catch (error) {
    return {
      title: "Ruku | Noor ul Quran",
      description: "Read Ruku (Section) of the Holy Quran",
    };
  }
}

export default function RukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
