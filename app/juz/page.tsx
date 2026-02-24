import Link from 'next/link';
import { Layers } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Juz Navigation - Al-Quran',
  description: 'Study the Quran by Juz (30 parts)',
};

export default async function JuzPage() {
  const metaData = await getMeta();
  const juzs = metaData.data.juzs.references;

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <Layers className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Juz Navigation
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            The Quran divided into 30 equal parts for daily reading
          </p>
        </div>

        {/* Juz Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {Array.isArray(juzs) && juzs.length > 0 ? juzs.map((juz, i) => (
            <Link
              key={`juz-${i}`}
              href={`/juz/${juz.index || juz.number || i+1}`}
              className="group p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 text-center animate-fade-in"
            >
              <div className="text-4xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                {juz.index || juz.number || i+1}
              </div>
              <div className="text-xs text-[var(--accent)] space-y-1">
                <div>From: {juz.start || juz.from || '-'}</div>
                <div>To: {juz.end || juz.to || '-'}</div>
              </div>
            </Link>
          )) : <div className="col-span-full text-center text-[var(--accent)]">No Juz data found.</div>}
        </div>

        {/* Info Box */}
        <div className="mt-8 md:mt-12 max-w-3xl mx-auto p-4 md:p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] mx-2">
          <h2 className="text-lg md:text-xl font-bold text-[var(--primary)] mb-3">
            About Juz
          </h2>
          <p className="text-sm md:text-base text-[var(--accent)] leading-relaxed">
            A Juz (plural: Ajzaa) is one of thirty parts of the Quran. Each Juz contains approximately 
            the same number of verses, making it easier to complete the entire Quran in a month by reading 
            one Juz per day, commonly practiced during Ramadan.
          </p>
        </div>
      </main>
    </div>
  );
}
