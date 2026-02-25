import Link from 'next/link';
import { Layers3 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Hizb Quarter — Al-Quran Al-Kareem',
  description: 'Navigate the 240 Hizb quarters of the Holy Quran.',
};

const HIZB_COUNT = 240;

export default async function HizbPage() {
  let hizbs: Array<{ index: number; start: string; end: string }> = [];

  try {
    const meta = await getMeta();
    const refs = meta?.data?.hizbQuarters?.references;
    if (Array.isArray(refs) && refs.length > 0) {
      hizbs = refs;
    }
  } catch {
    // fall through to fallback
  }

  // Fallback: generate indices if API returned nothing
  if (hizbs.length === 0) {
    hizbs = Array.from({ length: HIZB_COUNT }, (_, i) => ({
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
            <Layers3 className="text-white" size={24} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}>
            Hizb Quarter
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
            240 quarters for structured daily recitation
          </p>
        </div>

        {/* Grid — compact number grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-w-5xl mx-auto">
          {hizbs.map((hizb, i) => (
            <Link
              key={hizb.index}
              href={`/hizb/${hizb.index}`}
              className="aspect-square rounded-lg flex items-center justify-center text-sm font-bold animate-fade-in hover-page-num"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                animationDelay: `${(i % 30) * 10}ms`,
              }}
            >
              {hizb.index}
            </Link>
          ))}
        </div>

        {/* Info */}
        <div
          className="mt-10 max-w-2xl mx-auto p-5 rounded-xl text-sm leading-relaxed"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--primary)', color: 'var(--accent)' }}
        >
          <span className="font-bold block mb-1" style={{ color: 'var(--primary)' }}>About Hizb</span>
          The Quran is divided into 60 Hizbs, each further split into 4 quarters — giving 240 Hizb Quarters in total. This system allows for precise, structured daily recitation.
        </div>
      </main>
    </div>
  );
}
