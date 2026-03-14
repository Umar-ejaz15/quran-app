import Link from 'next/link';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Pages Navigation — Al-Quran Al-Kareem',
  description: 'Navigate through all 604 Mushaf pages of the Holy Quran.',
};

export default function PagesNavigationPage() {
  const pages = Array.from({ length: 604 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: 'var(--background)' }}>
      <Navigation />

      <PageHeader
        title="Page Navigation"
        subtitle="Jump to any of the 604 Mushaf pages"
        badge={
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'rgba(242,181,11,0.15)',
              color: '#f2b50b',
              border: '1px solid rgba(242,181,11,0.25)',
            }}
          >
            604 Pages
          </span>
        }
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14">

        {/* Pages Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 md:gap-2.5 max-w-6xl mx-auto mb-12">
          {pages.map((pageNum, index) => (
            <Link
              key={pageNum}
              href={`/page/${pageNum}`}
              className="aspect-square rounded-xl flex items-center justify-center text-sm font-bold animate-fade-in transition-all hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                animationDelay: `${(index % 60) * 8}ms`,
              }}
            >
              {pageNum}
            </Link>
          ))}
        </div>

        {/* Info */}
        <div
          className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-bold mb-2 tracking-wide uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>About Page Navigation</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
            The Quran is traditionally divided into 604 pages in the standard Mushaf.
            Each page view shows all verses on that page as a continuous, authentic Arabic text layout —
            just like reading a real Mushaf.
          </p>
        </div>

      </main>
    </div>
  );
}
