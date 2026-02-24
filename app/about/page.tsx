import { Info } from 'lucide-react';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'About - Al-Quran',
  description: 'About the Al-Quran web application',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-2">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
              <Info className="text-white" size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
              About Al-Quran
            </h1>
            <p className="text-base md:text-lg text-[var(--accent)] px-4">
              A reverent platform to read and study the Holy Quran
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                Our Mission
              </h2>
              <p className="text-[var(--accent)] leading-relaxed">
                Our mission is to make the Holy Quran accessible to everyone, everywhere. 
                We provide a clean, modern interface to read, search, and explore the Quran 
                with multiple translations and navigation options.
              </p>
            </section>

            <section className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                Features
              </h2>
              <ul className="space-y-3 text-[var(--accent)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--secondary)] mt-1">✓</span>
                  <span>Read all 114 Surahs with multiple translations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--secondary)] mt-1">✓</span>
                  <span>Navigate by Juz, Page, Surah, or Ayah</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--secondary)] mt-1">✓</span>
                  <span>Search through verses across different translations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--secondary)] mt-1">✓</span>
                  <span>Find Sajda verses easily</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--secondary)] mt-1">✓</span>
                  <span>Clean, responsive design for all devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--secondary)] mt-1">✓</span>
                  <span>Multiple language support</span>
                </li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                Data Source
              </h2>
              <p className="text-[var(--accent)] leading-relaxed mb-4">
                All Quranic text, translations, and metadata are provided by the{' '}
                <a
                  href="https://alquran.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline font-semibold"
                >
                  AlQuran Cloud API
                </a>
                , a free, open-source RESTful API for the Holy Quran.
              </p>
              <p className="text-[var(--accent)] leading-relaxed">
                We are grateful to the developers and maintainers of this API for making 
                the Quran accessible to developers worldwide.
              </p>
            </section>

            <section className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] animate-fade-in">
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
                Disclaimer
              </h2>
              <p className="text-[var(--accent)] leading-relaxed">
                While we strive for accuracy, we recommend consulting with qualified scholars 
                for detailed understanding and interpretation of the Quranic verses. This 
                platform is meant to facilitate access to the Quran and should not replace 
                traditional learning methods.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
