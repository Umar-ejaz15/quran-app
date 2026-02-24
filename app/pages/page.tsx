import Link from 'next/link';
import { FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Page Navigation - Al-Quran',
  description: 'Navigate through 604 Mushaf pages',
};

export default function PagesNavigationPage() {
  // Generate array of 604 pages
  const pages = Array.from({ length: 604 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <FileText className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Page Navigation
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            Navigate through Mushaf pages
          </p>
          <p className="text-xs md:text-sm text-[var(--accent)] mt-2 px-4">
            604 pages total
          </p>
        </div>

        {/* Page Grid */}
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3 max-w-6xl mx-auto px-2">
          {pages.map((pageNum, index) => (
            <Link
              key={pageNum}
              href={`/page/${pageNum}`}
              className="group aspect-square p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 flex items-center justify-center animate-fade-in"
              style={{ animationDelay: `${(index % 60) * 10}ms` }}
            >
              <span className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] group-hover:scale-110 transition-all">
                {pageNum}
              </span>
            </Link>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 md:mt-12 max-w-3xl mx-auto p-4 md:p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] mx-2">
          <h2 className="text-lg md:text-xl font-bold text-[var(--primary)] mb-3">
            About Page Navigation
          </h2>
          <p className="text-sm md:text-base text-[var(--accent)] leading-relaxed">
            The Quran is traditionally divided into 604 pages in the standard Mushaf. 
            This division aids in systematic reading and memorization.
          </p>
        </div>
      </main>
    </div>
  );
}
