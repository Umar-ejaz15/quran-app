import Link from 'next/link';
import { FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Pages Navigation — Al-Quran Al-Kareem',
  description: 'Navigate through all 604 Mushaf pages of the Holy Quran.',
};

export default function PagesNavigationPage() {
  const pages = Array.from({ length: 604 }, (_, i) => i + 1);

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
            <FileText className="text-white" size={26} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            Page Navigation
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            Jump to any of the 604 Mushaf pages
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 md:gap-2.5 max-w-6xl mx-auto">
          {pages.map((pageNum, index) => (
            <Link
              key={pageNum}
              href={`/page/${pageNum}`}
              className="aspect-square rounded-xl flex items-center justify-center text-sm font-bold animate-fade-in hover-page-num"
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

        {/* Info card */}
        <div
          className="mt-10 max-w-3xl mx-auto p-6 rounded-2xl"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--secondary)',
          }}
        >
          <h2 className="text-base font-bold mb-2" style={{ color: 'var(--primary)' }}>About Page Navigation</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>
            The Quran is traditionally divided into 604 pages in the standard Mushaf.
            Each page view shows all verses on that page as a continuous, authentic Arabic text layout —
            just like reading a real Mushaf.
          </p>
        </div>
      </main>
    </div>
  );
}
