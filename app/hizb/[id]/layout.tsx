import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const hizNumber = parseInt(id, 10);

    return {
      title: `Hizb ${hizNumber} — Holy Quran Reading | Noor ul Quran`,
      description: `Read Hizb ${hizNumber} (Quarter Section) of the Holy Quran with translations and audio recitations.`,
      keywords: [
        `Hizb ${hizNumber}`,
        "Hizb",
        "Holy Quran",
        "Islamic",
        "Quranic studies",
      ],
      openGraph: {
        title: `Hizb ${hizNumber} — Holy Quran`,
        description: `Read Hizb ${hizNumber} with translations and audio recitation`,
        url: `https://www.noorulquraan.com/hizb/${hizNumber}`,
        type: "article",
      },
      alternates: {
        canonical: `https://www.noorulquraan.com/hizb/${hizNumber}`,
      },
    };
  } catch (error) {
    return {
      title: "Hizb | Noor ul Quran",
      description: "Read Hizb (Quarter) of the Holy Quran",
    };
  }
}

export default function HizbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
