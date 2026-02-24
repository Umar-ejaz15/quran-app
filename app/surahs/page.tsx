import Link from 'next/link';
import Navigation from '@/components/Navigation';
import SurahCard from '@/components/SurahCard';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'All Surahs - Al-Quran',
  description: 'Browse all 114 Surahs of the Holy Quran',
};

export default async function SurahsPage() {
  const metaData = await getMeta();
  const surahs = metaData.data.surahs.references;

  return (
    <div className="min-h-screen pattern-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            All Surahs
          </h1>
          <p className="text-lg text-[var(--accent)]">
            Browse all 114 chapters of the Holy Quran
          </p>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      </main>
    </div>
  );
}
