import { Info, BookOpen, Search, Hand, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'About — Al-Quran Al-Kareem',
  description: 'About the Al-Quran Al-Kareem web application',
};

const features = [
  { icon: BookOpen, text: 'Read all 114 Surahs with multiple translations' },
  { icon: Search, text: 'Full-text search across all verses and translations' },
  { icon: Globe, text: 'Navigate by Juz, Page, Manzil, Ruku, and Hizb Quarter' },
  { icon: Hand, text: 'Find all 15 Sajda (prostration) verses easily' },
  { icon: BookOpen, text: 'Audio recitations by multiple renowned reciters' },
  { icon: Globe, text: 'Available in 50+ languages and translations' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-3xl">

        {/* Header */}
        <div className="section-header mb-8 md:mb-10 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
          >
            <Info className="text-white" size={26} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            About Al-Quran
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            A reverent platform to read and study the Holy Quran
          </p>
        </div>

        <div className="space-y-5">
          {/* Mission */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderTop: '3px solid var(--primary)' }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--primary)' }}>Our Mission</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>
              Our mission is to make the Holy Quran accessible to everyone, everywhere.
              We provide a clean, modern interface to read, search, and explore the Quran
              with multiple translations, audio recitations, and rich navigation tools.
            </p>
          </section>

          {/* Features */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in stagger-1"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderTop: '3px solid var(--secondary)' }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--primary)' }}>Features</h2>
            <ul className="space-y-3">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--primary-faint)', color: 'var(--primary)' }}
                    >
                      <Icon size={13} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>{f.text}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Data Source */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in stagger-2"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--primary)' }}>Data Source</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--accent)' }}>
              All Quranic text, translations, and metadata are provided by the{' '}
              <a
                href="https://alquran.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
                style={{ color: 'var(--primary)' }}
              >
                AlQuran Cloud API
              </a>
              , a free, open-source RESTful API for the Holy Quran.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>
              We are grateful to the developers and maintainers of this API for making
              the Quran accessible to developers worldwide.
            </p>
          </section>

          {/* Disclaimer */}
          <section
            className="p-6 md:p-8 rounded-2xl animate-fade-in stagger-3"
            style={{
              background: 'var(--secondary-faint)',
              border: '1px solid var(--secondary)',
              borderLeft: '3px solid var(--secondary)',
            }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--secondary-dark)' }}>Disclaimer</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--accent)' }}>
              While we strive for accuracy, we recommend consulting with qualified scholars
              for detailed understanding and interpretation of the Quranic verses. This
              platform is meant to facilitate access to the Quran and should not replace
              traditional learning methods.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
