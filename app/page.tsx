import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen pattern-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center py-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-2xl">
            <span className="text-4xl text-white font-bold">ق</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--secondary)] bg-clip-text text-transparent">
            Al-Quran Al-Kareem
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--accent)] mb-4 max-w-3xl mx-auto leading-relaxed">
            Read, Search, and Explore the Holy Quran
          </p>
          
          <p className="text-base text-[var(--accent)]/80 mb-12 max-w-2xl mx-auto">
            Access multiple translations, search through verses, navigate by Juz, Surah, or Page
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/surahs"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Surahs
            </Link>
            <Link
              href="/search"
              className="px-8 py-4 rounded-xl bg-[var(--card-bg)] text-[var(--primary)] font-semibold border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            >
              Search Quran
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--foreground)]">
            Explore the Quran
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[var(--accent)] leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--accent)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--card-bg)] py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-[var(--accent)]">
          <p className="mb-2">Al-Quran Al-Kareem • Holy Quran Reader</p>
          <p className="text-sm">
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
    description: 'Browse all chapters of the Quran with multiple translations and recitations',
    icon: '📖',
    href: '/surahs',
  },
  {
    title: '30 Juz',
    description: 'Read the Quran organized into 30 equal parts for daily reading',
    icon: '📚',
    href: '/juz',
  },
  {
    title: 'Search Quran',
    description: 'Search through verses with powerful text search across translations',
    icon: '🔍',
    href: '/search',
  },
  {
    title: 'Sajda Verses',
    description: 'Find all verses that require prostration during recitation',
    icon: '🕌',
    href: '/sajda',
  },
  {
    title: 'Multiple Editions',
    description: 'Access various translations and audio recitations in different languages',
    icon: '🌍',
    href: '/editions',
  },
  {
    title: 'Page Navigation',
    description: 'Navigate by page numbers as they appear in the Mushaf',
    icon: '📄',
    href: '/pages',
  },
];

const stats = [
  { value: '114', label: 'Surahs' },
  { value: '6,236', label: 'Ayahs' },
  { value: '30', label: 'Juz' },
  { value: '604', label: 'Pages' },
];

