import Link from 'next/link';
import { BookOpen, Search, BookText, Layers, Hand, Globe, FileText, BookMarked, ScrollText, Layers3 } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-2xl">
            <span className="text-4xl text-white font-bold">ق</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Al-Quran Al-Kareem
          </h1>
          
          <p className="text-lg md:text-2xl text-[var(--accent)] mb-4 max-w-3xl mx-auto leading-relaxed px-4">
            Read, Study, and Reflect upon the Holy Quran
          </p>
          
          <p className="text-sm md:text-base text-[var(--accent)]/80 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Access multiple translations, search verses, navigate by Juz or Surah
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-8 px-4">
            <Link
              href="/surahs"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              Read Surahs
            </Link>
            <Link
              href="/search"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--card-bg)] text-[var(--primary)] font-semibold border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Search
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-8 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-[var(--foreground)] px-4">
            Explore the Quran
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--accent)] leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 md:p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[var(--accent)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--card-bg)] py-6 md:py-8 mt-12 md:mt-20">
        <div className="container mx-auto px-4 text-center text-[var(--accent)]">
          <p className="mb-2 text-sm md:text-base">Al-Quran Al-Kareem • Holy Quran Reader</p>
          <p className="text-xs md:text-sm">
            Data provided by{' '}
            <a
              href="https://alquran.cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline"
            >
              AlQuran Cloud API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: '114 Surahs',
    description: 'Read all chapters with multiple translations and recitations',
    icon: <BookText className="text-[var(--primary)]" size={32} />,
    href: '/surahs',
  },
  {
    title: '30 Juz',
    description: 'Study the Quran organized into 30 equal parts',
    icon: <Layers className="text-[var(--primary)]" size={32} />,
    href: '/juz',
  },
  {
    title: '7 Manzils',
    description: 'Complete the Quran across a week-long reading plan',
    icon: <BookMarked className="text-[var(--primary)]" size={32} />,
    href: '/manzil',
  },
  {
    title: 'Search',
    description: 'Search through verses with powerful text search',
    icon: <Search className="text-[var(--primary)]" size={32} />,
    href: '/search',
  },
  {
    title: 'Sajda Verses',
    description: 'Find all verses requiring prostration',
    icon: <Hand className="text-[var(--primary)]" size={32} />,
    href: '/sajda',
  },
  {
    title: '556 Rukus',
    description: 'Browse thematic rukus across the Mushaf',
    icon: <ScrollText className="text-[var(--primary)]" size={32} />,
    href: '/ruku',
  },
  {
    title: 'Multiple Editions',
    description: 'Access various translations and audio recitations',
    icon: <Globe className="text-[var(--primary)]" size={32} />,
    href: '/editions',
  },
  {
    title: 'Page Navigation',
    description: 'Navigate by page numbers from the Mushaf',
    icon: <FileText className="text-[var(--primary)]" size={32} />,
    href: '/pages',
  },
  {
    title: '240 Hizb Quarters',
    description: 'Paced study with half-juz sections',
    icon: <Layers3 className="text-[var(--primary)]" size={32} />,
    href: '/hizb',
  },
];

const stats = [
  { value: '114', label: 'Surahs' },
  { value: '6,236', label: 'Verses' },
  { value: '30', label: 'Juz' },
  { value: '604', label: 'Pages' },
];
