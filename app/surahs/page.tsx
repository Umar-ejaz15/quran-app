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

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gradient-hero px-4">
            The 114 Surahs
          </h1>
          <p className="text-base md:text-lg text-(--accent) px-4">
            All chapters of the Holy Quran — Al-Quran Al-Kareem
          </p>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-2">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      </main>
    </div>
  );
}
