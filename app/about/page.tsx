import { BookOpen, Search, Hand, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'About — Al-Quran Al-Kareem',
  description: 'About the Al-Quran Al-Kareem web application',
};

const features = [
  { icon: BookOpen, text: 'Read all 114 Surahs with multiple translations' },
  { icon: Search,   text: 'Full-text search across all verses and translations' },
  { icon: Globe,    text: 'Navigate by Juz, Page, Manzil, Ruku, and Hizb Quarter' },
  { icon: Hand,     text: 'Find all 15 Sajda (prostration) verses easily' },
  { icon: BookOpen, text: 'Audio recitations by multiple renowned reciters' },
  { icon: Globe,    text: 'Available in 50+ languages and translations' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: 'var(--background)' }}>
      <Navigation />

      <PageHeader
        titleArabic="القرآن الكريم"
        title="About Al-Quran"
        subtitle="A reverent platform to read, listen to, and explore the Holy Quran"
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-3xl">
        <div className="space-y-4">

          {/* Mission */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <h2
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}
            >
              Our Mission
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
              Our mission is to make the Holy Quran accessible to everyone, everywhere.
              We provide a clean, focused interface to read, search, and explore the Quran
              with multiple translations, audio recitations, and rich navigation tools.
            </p>
          </section>

          {/* Features */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <h2
              className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}
            >
              Features
            </h2>
            <ul className="space-y-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--primary-faint)', color: 'var(--primary)' }}
                    >
                      <Icon size={14} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
                      {f.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Data Source */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <h2
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}
            >
              Data Source
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
              All Quranic text, translations, and metadata are provided by the{' '}
              <a
                href="https://alquran.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline transition-opacity"
                style={{ color: 'var(--primary)' }}
              >
                AlQuran Cloud API
              </a>
              , a free, open-source RESTful API for the Holy Quran.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
              We are grateful to the developers and maintainers of this API for making
              the Quran accessible to developers worldwide.
            </p>
          </section>

          {/* Disclaimer */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in"
            style={{
              background: 'var(--secondary-faint)',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: 'var(--secondary-dark)', letterSpacing: '0.12em' }}
            >
              Disclaimer
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif' }}>
              While we strive for accuracy, we recommend consulting qualified scholars
              for detailed understanding and interpretation of Quranic verses. This
              platform is meant to facilitate access to the Quran and should not replace
              traditional learning methods.
            </p>
          </section>

          {/* Dua */}
          <div className="text-center py-4">
            <p
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '1.1rem',
                color: 'var(--muted)',
                direction: 'rtl',
                lineHeight: 2,
              }}
            >
              جزاكم الله خيرًا
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--subtle)', fontStyle: 'italic' }}>
              May Allah reward you with good
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
