import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Manzil Navigation - Al-Quran',
  description: 'Read the Quran split across 7 Manzils (one per day).',
};

export default async function ManzilPage() {
  const meta = await getMeta();
  const manzils = meta.data.manzils.references;

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <BookMarked className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Manzil Navigation
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            Complete the Quran over a week with 7 Manzils
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {manzils.map((m) => (
            <Link
              key={m.index}
              href={`/manzil/${m.index}`}
              className="group p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 animate-fade-in"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
                  {m.index}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--hover)] text-[var(--accent)]">
                  {m.start} → {m.end}
                </span>
              </div>
              <p className="text-sm text-[var(--accent)]">
                From {m.start} to {m.end}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
