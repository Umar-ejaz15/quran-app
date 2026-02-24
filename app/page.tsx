import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import FeatureGrid from '@/components/FeatureGrid';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 py-8 md:py-12">

        {/* Hero Section */}
        <section className="text-center py-12 md:py-20 animate-fade-in">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-linear-to-br from-primary to-(--primary-dark) shadow-2xl">
            <span className="text-4xl text-white font-bold" style={{ fontFamily: 'var(--font-amiri), serif' }}>ق</span>
          </div>

          {/* Bismillah */}
          <div className="mb-6 px-4">
            <p className="bismillah">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className="text-xs text-(--muted) mt-1 tracking-wide">In the Name of Allah, the Most Gracious, the Most Merciful</p>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-gradient-hero px-4">
            Al-Quran Al-Kareem
          </h1>

          <p className="text-lg md:text-2xl text-(--accent) mb-3 max-w-2xl mx-auto leading-relaxed px-4">
            Read, Reflect, and Recite the Words of Allah
          </p>

          <p className="text-sm md:text-base text-(--muted) mb-10 md:mb-14 max-w-xl mx-auto px-4">
            Explore the Holy Quran with multiple translations, audio recitations, and rich navigation tools.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 px-4">
            <Link
              href="/surahs"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-primary to-(--primary-light) text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              Begin Reading
            </Link>
            <Link
              href="/search"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-(--card-bg) text-primary font-semibold border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Search Verses
            </Link>
          </div>
        </section>

        {/* Decorative divider */}
        <div className="islamic-divider my-6 md:my-10 px-4">
          <span className="text-lg text-secondary opacity-50">۞</span>
        </div>

        {/* Features Grid */}
        <section className="py-6 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-foreground px-4">
            Explore the Holy Quran
          </h2>
          <p className="text-center text-(--muted) text-sm mb-8 md:mb-12 px-4">
            Navigate by chapter, division, or verse — however you prefer to read
          </p>
          <FeatureGrid />
        </section>

        {/* Stats Section */}
        <section className="py-6 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-5 md:p-6 rounded-xl bg-(--card-bg) border border-(--border) text-center animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-hero mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-(--accent)">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Inspirational verse */}
        <section className="py-6 md:py-10 px-2">
          <div className="max-w-3xl mx-auto p-6 md:p-10 rounded-2xl bg-(--card-bg) border border-(--border) text-center"
               style={{ borderTop: '4px solid var(--secondary)' }}>
            <p className="bismillah text-2xl md:text-3xl mb-4">
              إِنَّ هَٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ
            </p>
            <p className="text-sm md:text-base text-(--accent) italic mb-2">
              "Indeed, this Quran guides to that which is most upright…"
            </p>
            <p className="text-xs text-(--muted)">Surah Al-Isra, 17:9</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border) bg-(--card-bg) py-8 md:py-10 mt-8 md:mt-16">
        <div className="container mx-auto px-4 text-center text-(--accent) space-y-2">
          <p className="font-semibold text-primary">Al-Quran Al-Kareem • القرآن الكريم</p>
          <p className="text-xs text-(--muted)">
            Quranic text and data provided by{' '}
            <a
              href="https://alquran.cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              AlQuran Cloud API
            </a>
          </p>
          <p className="text-xs text-(--muted)">
            May Allah grant us beneficial knowledge • جزاكم الله خيرًا
          </p>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { value: '114', label: 'Surahs' },
  { value: '6,236', label: 'Verses (Ayahs)' },
  { value: '30', label: 'Juz Parts' },
  { value: '604', label: 'Mushaf Pages' },
];
