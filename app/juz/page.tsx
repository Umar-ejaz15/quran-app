import Link from 'next/link';
import { Layers } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Juz Navigation — Al-Quran Al-Kareem',
  description: 'Study the Quran by Juz — 30 equal parts for daily reading.',
};

export default async function JuzPage() {
  const metaData = await getMeta();
  const juzs = metaData.data.juzs.references;

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Header */}
        <div className="section-header mb-8 md:mb-10 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
          >
            <Layers className="text-white" size={26} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            Juz Navigation
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            The Quran divided into 30 equal parts for daily reading
          </p>
        </div>

        {/* Juz Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
          {Array.isArray(juzs) && juzs.length > 0 ? (
            juzs.map((juz, i) => (
              <Link
                key={`juz-${i}`}
                href={`/juz/${juz.index ?? i + 1}`}
                className="group p-5 rounded-2xl text-center animate-fade-in hover-card"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  animationDelay: `${(i % 10) * 40}ms`,
                }}
              >
                <div
                  className="text-3xl font-extrabold mb-2 group-hover:scale-110 transition-transform text-gradient-primary"
                  style={{ lineHeight: 1 }}
                >
                  {juz.index ?? i + 1}
                </div>
                <div className="text-[10px] space-y-0.5" style={{ color: 'var(--muted)' }}>
                  <div className="truncate">From {juz.start || juz.from || '—'}</div>
                  <div className="truncate">To {juz.end || juz.to || '—'}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12" style={{ color: 'var(--accent)' }}>
              No Juz data found.
            </div>
          )}
        </div>

        {/* Info card */}
        <div
          className="mt-10 max-w-3xl mx-auto p-6 rounded-2xl"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--secondary)',
          }}
        >
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--primary)' }}>About Juz</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>
            A Juz (plural: Ajzaa) is one of thirty parts of the Quran. Each Juz contains approximately
            the same number of verses, making it easier to complete the entire Quran in a month by reading
            one Juz per day — commonly practiced during Ramadan.
          </p>
        </div>
      </main>
    </div>
  );
}
