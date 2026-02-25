import { Hand } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import { getSajdas } from '@/lib/api';

export const metadata = {
  title: 'Sajda Verses — Al-Quran Al-Kareem',
  description: 'All 15 verses requiring prostration (Sajda Tilawa) in the Quran.',
};

export default async function SajdaPage() {
  const arabicData = await getSajdas('ar.alafasy');
  const translationData = await getSajdas('en.asad');

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">

        {/* Header */}
        <div className="section-header mb-8 md:mb-10 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
          >
            <Hand className="text-white" size={26} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            Sajda Verses
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            Verses requiring prostration during recitation
          </p>
          <div className="mt-3">
            <span className="chip chip-gold">{arabicData.data.ayahs.length} Sajda verses</span>
          </div>
        </div>

        {/* Info */}
        <div
          className="mb-8 p-5 rounded-2xl animate-fade-in"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--secondary)',
          }}
        >
          <h2 className="text-base font-bold mb-1.5" style={{ color: 'var(--primary)' }}>About Sajda</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>
            When reciting or hearing certain verses, prostration (Sajda Tilawa) is recommended.
            These sacred moments deepen our connection with Allah.
          </p>
        </div>

        {/* Sajda Verses */}
        <div className="space-y-4 md:space-y-5">
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
