import Link from 'next/link';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import FeatureGrid from '@/components/FeatureGrid';
import Navigation from '@/components/Navigation';
import LogoIcon from '@/components/LogoIcon';

export default function Home() {
  return (
    <div className="min-h-screen pb-24 md:pb-0" style={{ background: 'var(--background)' }}>
      <Navigation />

      <main>

        {/* ══════════════════════════════════════════
            HERO — full-width, left-anchored editorial
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{
            minHeight: 'clamp(520px, 80vh, 760px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Parchment texture gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 70% at 10% 50%, var(--primary-glow), transparent),
                radial-gradient(ellipse 50% 60% at 90% 20%, var(--gold-glow), transparent)
              `,
            }}
          />

          {/* ق watermark — behind the hero image */}
          <span
            className="absolute hidden md:block pointer-events-none select-none"
            aria-hidden="true"
            style={{
              right: '3%',
              top: '50%',
              transform: 'translateY(-52%)',
              fontFamily: 'var(--font-arabic)',
              fontSize: 'clamp(28rem, 48vw, 56rem)',
              lineHeight: 1,
              color: 'var(--primary)',
              opacity: 0.06,
              zIndex: 0,
            }}
          >
            ق
          </span>

          {/* Logo hero — floating right side */}
          <div
            className="absolute hidden md:flex items-center justify-center pointer-events-none"
            style={{
              right: '5%',
              top: 0,
              bottom: 0,
              margin: 'auto',
              width: 'clamp(360px, 44vw, 600px)',
              height: 'fit-content',
              zIndex: 1,
              animation: 'floatGlyph 6s ease-in-out infinite',
            }}
            aria-hidden="true"
          >
            <img
              src="/logo-hero.svg"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
              draggable={false}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-5 md:px-10 py-16 md:py-24">
            <div className="max-w-2xl">

              {/* Eyebrow + logo */}
              <div className="reveal reveal-delay-1 flex items-center gap-3 mb-8">
                <div className="logo-hero-wrap">
                  <LogoIcon size={52} />
                </div>
                <div
                  className="h-px w-10 flex-shrink-0"
                  style={{ background: 'var(--border-strong)' }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-arabic)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                    color: 'var(--primary)',
                    direction: 'rtl',
                    lineHeight: 1.8,
                  }}
                >
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </span>
              </div>

            </div>{/* close max-w-2xl */}

            <div className="max-w-2xl">
              {/* Main title */}
              <h1
                className="reveal reveal-delay-3 font-extrabold leading-[0.92] mb-5"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--foreground)',
                }}
              >
                Al-Quran
                <br />
                <span style={{ color: 'var(--secondary)' }}>
                  Al-Kareem
                </span>
              </h1>

              {/* Tagline */}
              <p
                className="reveal reveal-delay-4 text-base md:text-lg leading-relaxed mb-8 max-w-md"
                style={{ color: 'var(--muted)' }}
              >
                Read, reflect, and recite the blessed words of the Holy Quran —
                with translations, audio, and every navigation mode you need.
              </p>

              {/* CTAs */}
              <div className="reveal reveal-delay-5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/surahs"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    boxShadow: '0 4px 16px var(--primary-glow)',
                  }}
                >
                  <BookOpen size={16} strokeWidth={2.5} />
                  Begin Reading
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/search"
                  className="hero-search-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm border-2 transition-all hover:-translate-y-0.5"
                  style={{
                    color: 'var(--primary)',
                    borderColor: 'var(--primary)',
                  }}
                >
                  <Search size={16} strokeWidth={2.5} />
                  Search Verses
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* ══════════════════════════════════════════
            EXPLORE — editorial feature grid
        ══════════════════════════════════════════ */}
        <section className="container mx-auto px-5 md:px-10 py-14 md:py-20">

          {/* Section label */}
          <div className="reveal reveal-delay-1 flex items-center gap-4 mb-10">
            <div
              className="h-px w-8"
              style={{ background: 'var(--secondary)' }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.28em] uppercase"
              style={{ color: 'var(--secondary)' }}
            >
              Navigate the Quran
            </span>
          </div>

          <div className="reveal reveal-delay-2 mb-10">
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
                letterSpacing: '-0.025em',
                color: 'var(--foreground)',
              }}
            >
              Every path
              <br />
              <span style={{ color: 'var(--primary)' }}>to the Word.</span>
            </h2>
          </div>

          <FeatureGrid />
        </section>

        {/* ══════════════════════════════════════════
            STATS — typographic sculpture
        ══════════════════════════════════════════ */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-5 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 1} flex flex-col items-center justify-center py-8 px-4 relative`}
                >
                  {i < stats.length - 1 && (
                    <span
                      className="hidden md:block absolute right-0 top-1/2"
                      style={{
                        width: '1px',
                        height: '40px',
                        background: 'var(--border)',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: 'Amiri, Georgia, serif',
                      fontSize: 'clamp(3rem, 5.5vw, 5rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: 'var(--foreground)',
                      display: 'block',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="block my-3"
                    style={{ width: '24px', height: '2px', background: 'var(--secondary)' }}
                  />
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--muted)',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            VERSE SHOWCASE — full-bleed dark panel
        ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'var(--primary-dark)' }}
        >
          {/* Atmospheric glow behind verse */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,146,10,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Ghost Arabic letters — far left and right */}
          <span
            className="absolute pointer-events-none select-none hidden md:block"
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 'clamp(16rem, 22vw, 28rem)',
              lineHeight: 1,
              color: '#ffffff',
              opacity: 0.03,
              left: '-3rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >ا</span>
          <span
            className="absolute pointer-events-none select-none hidden md:block"
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 'clamp(16rem, 22vw, 28rem)',
              lineHeight: 1,
              color: '#ffffff',
              opacity: 0.03,
              right: '-3rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >م</span>

          <div className="relative z-10 container mx-auto px-5 md:px-10 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center reveal reveal-delay-1">

              {/* Gold small eyebrow */}
              <p
                className="mb-10 tracking-[0.28em] uppercase"
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'var(--secondary)',
                }}
              >
                Verse of Guidance
              </p>

              {/* Arabic verse — large, luminous */}
              <p
                style={{
                  fontFamily: 'var(--font-arabic)',
                  fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                  lineHeight: '3.2',
                  direction: 'rtl',
                  textAlign: 'center',
                  color: '#f5ede8',
                  letterSpacing: '0.02em',
                  marginBottom: '2.5rem',
                }}
              >
                إِنَّ هَٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ
              </p>

              {/* Gold dot separator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div style={{ width: '32px', height: '1px', background: 'var(--secondary)', opacity: 0.5 }} />
                <span style={{ color: 'var(--secondary)', fontSize: '0.5rem', opacity: 0.8 }}>◆</span>
                <div style={{ width: '32px', height: '1px', background: 'var(--secondary)', opacity: 0.5 }} />
              </div>

              {/* Translation */}
              <p
                className="italic mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  color: 'rgba(237,224,212,0.75)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.7,
                }}
              >
                &ldquo;Indeed, this Qur&apos;an guides to that which is most upright…&rdquo;
              </p>

              {/* Reference */}
              <p
                className="mb-12 tracking-widest uppercase"
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'rgba(237,224,212,0.35)',
                  letterSpacing: '0.2em',
                }}
              >
                Surah Al-Isra · Ayah 9
              </p>

              {/* CTA */}
              <Link
                href="/surahs"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: 'var(--secondary)',
                  color: '#1a0f0a',
                  boxShadow: '0 4px 24px rgba(200,146,10,0.3)',
                }}
              >
                Begin your recitation
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--card-bg)',
        }}
      >
        {/* ── Main footer body ── */}
        <div className="container mx-auto px-5 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Brand column */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <LogoIcon size={44} />
                <div>
                  <p
                    className="font-extrabold tracking-tight"
                    style={{ fontSize: '1.1rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}
                  >
                    Al-Quran Al-Kareem
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'Amiri, serif' }}>
                    القرآن الكريم
                  </p>
                </div>
              </div>
              <p
                className="leading-relaxed mb-6"
                style={{ fontSize: '0.85rem', color: 'var(--muted)', maxWidth: '30ch' }}
              >
                A complete digital companion for reading, listening to, and exploring the Holy Quran — with multiple translations, audio reciters, and every navigation mode.
              </p>
              {/* Gold ornament */}
              <p
                style={{
                  fontFamily: 'Amiri, serif',
                  fontSize: '1.1rem',
                  color: 'var(--secondary)',
                  opacity: 0.7,
                  letterSpacing: '0.1em',
                }}
              >
                ﷽
              </p>
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:col-span-1" />

            {/* Navigate */}
            <div className="md:col-span-2">
              <p
                className="font-bold mb-4"
                style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--foreground)' }}
              >
                Navigate
              </p>
              <ul className="space-y-2.5">
                {[
                  { href: '/surahs', label: 'Surahs' },
                  { href: '/juz',    label: 'Juz' },
                  { href: '/pages',  label: 'Pages' },
                  { href: '/hizb',   label: 'Hizb' },
                  { href: '/manzil', label: 'Manzil' },
                  { href: '/ruku',   label: 'Ruku' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:underline"
                      style={{ fontSize: '0.85rem', color: 'var(--muted)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div className="md:col-span-2">
              <p
                className="font-bold mb-4"
                style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--foreground)' }}
              >
                Discover
              </p>
              <ul className="space-y-2.5">
                {[
                  { href: '/search',   label: 'Search Verses' },
                  { href: '/sajda',    label: 'Sajda Verses' },
                  { href: '/editions', label: 'Editions' },
                  { href: '/about',    label: 'About' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:underline"
                      style={{ fontSize: '0.85rem', color: 'var(--muted)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* By the numbers */}
            <div className="md:col-span-3">
              <p
                className="font-bold mb-4"
                style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--foreground)' }}
              >
                By the Numbers
              </p>
              <ul className="space-y-3">
                {stats.map(({ value, label }) => (
                  <li key={label} className="flex items-baseline gap-2">
                    <span
                      style={{ fontFamily: 'Amiri, serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1 }}
                    >
                      {value}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Footer bottom bar ── */}
        <div
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="container mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p style={{ fontSize: '0.75rem', color: 'var(--subtle)', fontStyle: 'italic' }}>
              May Allah ﷻ accept from us and grant us beneficial knowledge · جزاكم الله خيرًا
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              Quranic data by{' '}
              <a
                href="https://alquran.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline transition-colors"
                style={{ color: 'var(--primary)' }}
              >
                AlQuran Cloud
              </a>
            </p>
          </div>
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
