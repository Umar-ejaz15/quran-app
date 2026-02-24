import Link from 'next/link';
import { Layers3 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Hizb Quarter Navigation - Al-Quran',
  description: 'Navigate 240 Hizb quarters (half of a Juz).',
};

export default async function HizbPage() {
  const meta = await getMeta();
  const hizbs = meta.data.hizbQuarters.references;

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <Layers3 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Hizb Quarter Navigation
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            240 quarters (half-Juz) for paced recitation
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 max-w-6xl mx-auto">
          {hizbs.map((hizb) => (
            <Link
              key={hizb.index}
              href={`/hizb/${hizb.index}`}
              className="group p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 animate-fade-in"
            >
              <div className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                Hizb {hizb.index}
              </div>
              <div className="text-xs text-[var(--accent)] mt-2">
                {hizb.start} → {hizb.end}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
