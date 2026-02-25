import Link from 'next/link';
import { ScrollText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Ruku — Al-Quran Al-Kareem',
  description: 'Browse the 556 thematic Rukus of the Holy Quran.',
};

const RUKU_COUNT = 556;

export default async function RukuPage() {
  let rukus: Array<{ index: number; start: string; end: string }> = [];

  try {
    const meta = await getMeta();
    const refs = meta?.data?.rukus?.references;
    if (Array.isArray(refs) && refs.length > 0) {
      rukus = refs;
    }
  } catch {
    // fall through to fallback
  }

  // Fallback: generate indices if API returned nothing
  if (rukus.length === 0) {
    rukus = Array.from({ length: RUKU_COUNT }, (_, i) => ({
      index: i + 1,
      start: '',
      end: '',
    }));
  }

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Header */}
        <div className="section-header mb-8 md:mb-10 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'var(--primary)', boxShadow: '0 4px 16px var(--green-glow)' }}
          >
            <ScrollText className="text-white" size={24} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}>
            Ruku
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
            556 thematic passages of the Holy Quran
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-w-6xl mx-auto">
          {rukus.map((ruku, i) => (
            <Link
              key={ruku.index}
              href={`/ruku/${ruku.index}`}
              className="group flex flex-col items-center justify-center p-2.5 rounded-lg text-center animate-fade-in hover-card-mini"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                animationDelay: `${(i % 40) * 8}ms`,
                minHeight: '52px',
              }}
            >
              <span
                className="text-sm font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                {ruku.index}
              </span>
              {ruku.start && (
                <span className="text-[8px] mt-0.5 truncate w-full text-center" style={{ color: 'var(--muted)' }}>
                  {ruku.start}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Info */}
        <div
          className="mt-10 max-w-2xl mx-auto p-5 rounded-xl text-sm leading-relaxed"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--primary)', color: 'var(--accent)' }}
        >
          <span className="font-bold block mb-1" style={{ color: 'var(--primary)' }}>About Ruku</span>
          A Ruku is a thematic passage or paragraph of the Quran. The Quran contains 556 Rukus, used to organise the text by meaning and subject.
        </div>
      </main>
    </div>
  );
}
