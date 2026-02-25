'use client';

import { useEffect, useState } from 'react';
import { Globe, BookOpen, Volume2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getEditions, getFormats, getLanguages } from '@/lib/api';
import { Edition } from '@/types/quran';

export default function EditionsPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [formatFilter, setFormatFilter] = useState<'all' | 'text' | 'audio'>('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [languages, setLanguages] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>(['text', 'audio']);

  useEffect(() => {
    async function loadEditions() {
      try {
        const [editionResponse, languagesResponse, formatsResponse] = await Promise.all([
          getEditions(),
          getLanguages(),
          getFormats(),
        ]);
        setEditions(editionResponse.data);
        setLanguages(languagesResponse.data ?? []);
        setFormats(formatsResponse.data ?? ['text', 'audio']);
      } catch (error) {
        console.error('Error loading editions:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEditions();
  }, []);

  const filteredEditions = editions.filter(edition => {
    const matchesFormat = formatFilter === 'all' || edition.format === formatFilter;
    const matchesLanguage = languageFilter === 'all' || edition.language === languageFilter;
    return matchesFormat && matchesLanguage;
  });

  const languageOptions = languages.length > 0
    ? languages
    : Array.from(new Set(editions.map(e => e.language))).sort();

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg pb-20 md:pb-0">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

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
            <Globe className="text-white" size={26} />
          </div>
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            Quran Editions
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            Available translations and audio recitations
          </p>
        </div>

        {/* Filters */}
        <div
          className="max-w-5xl mx-auto mb-6 p-5 rounded-2xl animate-fade-in"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex flex-col sm:flex-row gap-5">

            {/* Format filter */}
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>
                Format
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['all', ...formats] as string[]).map(value => (
                  <button
                    key={value}
                    onClick={() => setFormatFilter(value as 'all' | 'text' | 'audio')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={
                      formatFilter === value
                        ? { background: 'var(--primary)', color: 'white' }
                        : { background: 'var(--hover)', color: 'var(--accent)', border: '1px solid var(--border)' }
                    }
                  >
                    {value === 'text' && <BookOpen size={12} />}
                    {value === 'audio' && <Volume2 size={12} />}
                    {value === 'all' ? 'All' : value[0].toUpperCase() + value.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language filter */}
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>
                Language
              </label>
              <select
                value={languageFilter}
                onChange={e => setLanguageFilter(e.target.value)}
                className="form-control"
              >
                <option value="all">All Languages</option>
                {languageOptions.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-4 text-xs" style={{ color: 'var(--muted)' }}>
            Showing {filteredEditions.length} of {editions.length} editions
          </p>
        </div>

        {/* Editions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {filteredEditions.map((edition, index) => (
            <div
              key={edition.identifier}
              className="p-5 rounded-2xl transition-all animate-fade-in"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                animationDelay: `${(index % 12) * 40}ms`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'var(--primary)';
                el.style.boxShadow = '0 4px 16px rgba(27,107,74,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'var(--border)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="chip chip-green">{edition.language.toUpperCase()}</span>
                <span
                  className="chip"
                  style={
                    edition.format === 'audio'
                      ? { color: 'var(--secondary)', background: 'var(--secondary-faint)', borderColor: 'var(--secondary)' }
                      : { color: 'var(--primary)', background: 'var(--primary-faint)', borderColor: 'var(--primary)' }
                  }
                >
                  {edition.format === 'audio' ? <Volume2 size={10} /> : <BookOpen size={10} />}
                  {edition.format === 'audio' ? 'Audio' : 'Text'}
                </span>
              </div>

              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                {edition.englishName}
              </h3>

              {edition.name !== edition.englishName && (
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                  {edition.name}
                </p>
              )}

              <div
                className="mt-3 pt-3 flex items-center gap-2"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <code
                  className="text-[10px] px-2 py-1 rounded-md font-mono"
                  style={{ background: 'var(--hover)', color: 'var(--accent)' }}
                >
                  {edition.identifier}
                </code>
                <span className="chip chip-muted" style={{ fontSize: '9px' }}>{edition.type}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
