import { Hand } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import { getSajdas } from '@/lib/api';

export const metadata = {
  title: 'Sajda Verses - Al-Quran',
  description: 'All verses requiring prostration (Sajda) in the Quran',
};

export default async function SajdaPage() {
  const arabicData = await getSajdas('ar.alafasy');
  const translationData = await getSajdas('en.asad');

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <Hand className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Sajda Verses
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            Verses requiring prostration during recitation
          </p>
          <p className="text-xs md:text-sm text-[var(--accent)] mt-2 px-4">
            {arabicData.data.ayahs.length} Sajda verses
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-8 md:mb-12 max-w-3xl mx-auto p-4 md:p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] mx-2">
          <h2 className="text-lg md:text-xl font-bold text-[var(--primary)] mb-3">
            About Sajda
          </h2>
          <p className="text-sm md:text-base text-[var(--accent)] leading-relaxed">
            When reciting or hearing certain verses, prostration (Sajda Tilawa) is recommended. 
            These sacred moments deepen our connection with Allah.
          </p>
        </div>

        {/* Sajda Verses */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {arabicData.data.ayahs.map((ayah, index) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              translationText={translationData.data.ayahs[index]?.text}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
