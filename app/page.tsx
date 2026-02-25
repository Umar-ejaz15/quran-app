import Link from 'next/link';
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import FeatureGrid from '@/components/FeatureGrid';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6">

        {/* ─── Hero ─── */}
        <section className="relative text-center py-12 md:py-22 animate-fade-in overflow-hidden">
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 30%, var(--green-glow), transparent)',
            }}
          />

          {/* Quran emblem */}
          <div
            className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-2xl"
            style={{ background: 'linear-gradient(145deg, var(--primary), var(--primary-dark))' }}
          >
            <span
              className="text-white font-bold"
              style={{ fontFamily: 'Amiri Quran, Amiri, serif', fontSize: '2.5rem', lineHeight: 1 }}
            >ق</span>
          </div>

          {/* Bismillah */}
          <div className="relative z-10 mb-6">
            <p className="bismillah" style={{ fontSize: '2rem' }}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              In the Name of Allah — the Most Gracious, the Most Merciful
            </p>
          </div>

          {/* Title */}
          <h1
            className="relative z-10 font-extrabold mb-4 px-4 leading-tight text-gradient-hero"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
          >
            Al-Quran Al-Kareem
          </h1>
          <p className="relative z-10 text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--secondary)' }}>
            القرآن الكريم
          </p>

          <p
            className="relative z-10 text-base md:text-lg mb-2 max-w-xl mx-auto leading-relaxed px-4"
            style={{ color: 'var(--accent)' }}
          >
            Read, reflect upon, and recite the blessed words of the Holy Quran
          </p>
          <p
            className="relative z-10 text-sm mb-10 max-w-lg mx-auto px-4"
            style={{ color: 'var(--muted)' }}
          >
            Multiple translations &middot; Audio recitations &middot; Full Mushaf navigation
          </p>

          {/* CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            <Link
              href="/surahs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--primary)', boxShadow: '0 2px 12px var(--green-glow)' }}
            >
              <BookOpen size={17} />
              Read the Quran
            </Link>
            <Link
              href="/search"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border-2 hover-btn-outline"
              style={{
                background: 'var(--card-bg)',
                color: 'var(--primary)',
                borderColor: 'var(--primary)',
              }}
            >
              <Search size={17} />
              Search Verses
            </Link>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="islamic-divider my-2 md:my-6">
          <span className="text-xl" style={{ color: 'var(--secondary)', opacity: 0.5 }}>۩</span>
        </div>

        {/* ─── Stats Strip ─── */}
        <section className="py-5 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-5 rounded-2xl animate-fade-in text-center"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div className="stat-number text-gradient-hero mb-1">{stat.value}</div>
                <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Explore ─── */}
        <section className="py-5 md:py-10">
          <div className="section-header mb-8">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
              Explore the Holy Quran
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Navigate by Surah, Juz, Page, or verse — however you prefer to recite
            </p>
          </div>
          <FeatureGrid />
        </section>

        {/* ─── Quranic Verse ─── */}
        <section className="py-5 md:py-10">
          <div
            className="max-w-3xl mx-auto p-8 md:p-12 rounded-2xl text-center"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderTop: '3px solid var(--secondary)',
            }}
          >
            <p
              className="arabic-text mb-5"
              style={{ fontSize: '1.85rem', lineHeight: '3.2', color: 'var(--primary)' }}
            >
              إِنَّ هَٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ
            </p>
            <p className="text-sm md:text-base italic mb-2" style={{ color: 'var(--accent)' }}>
              &ldquo;Indeed, this Qur&apos;an guides to that which is most upright…&rdquo;
            </p>
            <p className="text-xs font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>
              Surah Al-Isra · Ayah 9
            </p>

            <div className="mt-6">
              <Link
                href="/surahs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                style={{ color: 'var(--primary)' }}
              >
                Begin your recitation
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer
        className="mt-8 md:mt-16 py-8 md:py-10"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--card-bg)' }}
      >
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
            Al-Quran Al-Kareem &bull; القرآن الكريم
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Quranic data provided with gratitude by{' '}
            <a
              href="https://alquran.cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              AlQuran Cloud
            </a>
          </p>
          <p className="text-xs" style={{ color: 'var(--subtle)' }}>
            May Allah ﷻ accept from us and grant us beneficial knowledge &bull; جزاكم الله خيرًا
          </p>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { value: '114',   label: 'Blessed Surahs'  },
  { value: '6,236', label: 'Holy Verses'      },
  { value: '30',    label: 'Juz Parts'        },
  { value: '604',   label: 'Mushaf Pages'     },
];
