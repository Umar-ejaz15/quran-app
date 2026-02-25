import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Manzil — Al-Quran Al-Kareem',
  description: 'Complete the recitation of the Holy Quran over a week with 7 Manzils.',
};

const MANZIL_COUNT = 7;

export default async function ManzilPage() {
  let manzils: Array<{ index: number; start: string; end: string }> = [];

  try {
    const meta = await getMeta();
    const refs = meta?.data?.manzils?.references;
    if (Array.isArray(refs) && refs.length > 0) {
      manzils = refs;
    }
  } catch {
    // fall through to fallback
  }

  // Fallback: generate indices if API returned nothing
  if (manzils.length === 0) {
    manzils = Array.from({ length: MANZIL_COUNT }, (_, i) => ({
      index: i + 1,
      start: '—',
      end: '—',
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
            <BookMarked className="text-white" size={24} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}>
            Manzil
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
            7 sections for completing the Quran in one week
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {manzils.map((m, i) => (
            <Link
              key={m.index}
              href={`/manzil/${m.index}`}
              className="group p-5 rounded-xl animate-fade-in hover-card"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                animationDelay: `${i * 70}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-3xl font-extrabold text-gradient-primary"
                  style={{ lineHeight: 1 }}
                >
                  {m.index}
                </span>
                <span className="chip chip-gold text-[10px]">Week {m.index}</span>
              </div>
              <div className="text-[11px] space-y-1" style={{ color: 'var(--muted)' }}>
                {m.start !== '—' && <div>From <span className="font-semibold" style={{ color: 'var(--accent)' }}>{m.start}</span></div>}
                {m.end !== '—' && <div>To <span className="font-semibold" style={{ color: 'var(--accent)' }}>{m.end}</span></div>}
              </div>
            </Link>
          ))}
        </div>

        {/* Info */}
        <div
          className="mt-10 max-w-2xl mx-auto p-5 rounded-xl text-sm leading-relaxed"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--primary)', color: 'var(--accent)' }}
        >
          <span className="font-bold block mb-1" style={{ color: 'var(--primary)' }}>About Manzil</span>
          The Quran is divided into 7 Manzils for those who wish to complete the entire recitation within a week — reading one Manzil each day.
        </div>
      </main>
    </div>
  );
}
