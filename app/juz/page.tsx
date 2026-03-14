import Link from 'next/link';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import { getMeta } from '@/lib/api';

export const metadata = {
  title: 'Juz Navigation — Al-Quran Al-Kareem',
  description: 'Study the Quran by Juz — 30 equal parts for daily reading.',
};

const JUZ_COUNT = 30;

export default async function JuzPage() {
  let juzs: Array<{ index: number; start: string; end: string }> = [];

  try {
    const meta = await getMeta();
    const refs = meta?.data?.juzs?.references;
    if (Array.isArray(refs) && refs.length > 0) {
      juzs = refs.map((j, i) => ({
        index: (j as { index?: number; number?: number }).index ?? (j as { index?: number; number?: number }).number ?? i + 1,
        start: (j as { start?: string; from?: string }).start || (j as { start?: string; from?: string }).from || '',
        end: (j as { end?: string; to?: string }).end || (j as { end?: string; to?: string }).to || '',
      }));
    }
  } catch {
    // fall through to fallback
  }

  if (juzs.length === 0) {
    juzs = Array.from({ length: JUZ_COUNT }, (_, i) => ({
      index: i + 1,
      start: '',
      end: '',
    }));
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: 'var(--background)' }}>
      <Navigation />

      <PageHeader
        title="Juz Navigation"
        subtitle="30 equal parts — one per day completes the Quran in a month"
        badge={
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'rgba(242,181,11,0.15)',
              color: '#f2b50b',
              border: '1px solid rgba(242,181,11,0.25)',
            }}
          >
            30 Parts
          </span>
        }
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14">

        {/* Juz Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto mb-12">
          {juzs.map((juz, i) => (
            <Link
              key={juz.index}
              href={`/juz/${juz.index}`}
              className="group p-5 rounded-2xl text-center animate-fade-in transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                animationDelay: `${(i % 10) * 40}ms`,
              }}
            >
              <div
                className="font-extrabold mb-1 group-hover:scale-105 transition-transform"
                style={{
                  fontFamily: 'Amiri, Georgia, serif',
                  fontSize: '2.4rem',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--foreground)',
                }}
              >
                {juz.index}
              </div>
              <div
                className="text-[10px] font-bold tracking-widest uppercase mb-2"
                style={{ color: 'var(--secondary)' }}
              >
                Juz
              </div>
              {(juz.start || juz.end) && (
                <div className="text-[10px] space-y-0.5" style={{ color: 'var(--muted)' }}>
                  {juz.start && <div className="truncate">{juz.start}</div>}
                  {juz.end && <div className="truncate">{juz.end}</div>}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Info */}
        <div
          className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-bold mb-2 tracking-wide uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>About Juz</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
            A Juz (plural: Ajzaa) is one of thirty parts of the Quran. Each Juz contains approximately
            the same number of verses, making it easier to complete the entire Quran in a month by reading
            one Juz per day — a practice commonly observed during Ramadan.
          </p>
        </div>

      </main>
    </div>
  );
}
