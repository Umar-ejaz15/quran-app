import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const manzilNumber = parseInt(id, 10);

    return {
      title: `Manzil ${manzilNumber} — Holy Quran Reading | Noor ul Quran`,
      description: `Read Manzil ${manzilNumber} (Daily Reading Section) of the Holy Quran with translations and audio recitations.`,
      keywords: [
        `Manzil ${manzilNumber}`,
        "Manzil",
        "Holy Quran",
        "Islamic",
        "Quranic studies",
      ],
      openGraph: {
        title: `Manzil ${manzilNumber} — Holy Quran`,
        description: `Read Manzil ${manzilNumber} with translations and audio recitation`,
        url: `https://www.noorulquraan.com/manzil/${manzilNumber}`,
        type: "article",
      },
      alternates: {
        canonical: `https://www.noorulquraan.com/manzil/${manzilNumber}`,
      },
    };
  } catch (error) {
    return {
      title: "Manzil | Noor ul Quran",
      description: "Read Manzil (Daily Reading) of the Holy Quran",
    };
  }
}

export default function ManzilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
