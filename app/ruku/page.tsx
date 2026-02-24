import Link from 'next/link';
import { ScrollText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Ruku Navigation - Al-Quran',
  description: 'Browse the 556 rukus of the Quran.',
};

export default async function RukuPage() {
  const meta = await getMeta();
  const rukus = meta.data.rukus.references;

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <ScrollText className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Ruku Navigation
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            Explore 556 thematic rukus
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
          {rukus.map((ruku) => (
            <Link
              key={ruku.index}
              href={`/ruku/${ruku.index}`}
              className="group p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                  Ruku {ruku.index}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--hover)] text-[var(--accent)]">
                  {ruku.start} → {ruku.end}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
