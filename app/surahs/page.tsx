import Navigation from '@/components/Navigation';
import SurahCard from '@/components/SurahCard';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'All Surahs — Al-Quran Al-Kareem',
  description: 'Read all 114 blessed Surahs of the Holy Quran with translations and recitations.',
};

export default async function SurahsPage() {
  const metaData = await getMeta();
  const surahs = metaData.data.surahs.references;

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Header */}
        <div className="section-header mb-8 md:mb-10 animate-fade-in">
          <h1
            className="text-gradient-hero"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}
          >
            The 114 Surahs
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            All chapters of the Holy Quran — Al-Quran Al-Kareem
          </p>
        </div>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <span className="chip chip-green">114 Chapters</span>
          <span className="chip chip-gold">6,236 Verses</span>
          <span className="chip chip-muted">Makki &amp; Madani</span>
        </div>

        {/* Surahs list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      </main>
    </div>
  );
}
