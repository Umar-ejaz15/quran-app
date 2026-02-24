'use client';

import { useEffect, useState } from 'react';
import { Globe, Tag } from 'lucide-react';
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

  const filteredEditions = editions.filter((edition) => {
    const matchesFormat = formatFilter === 'all' || edition.format === formatFilter;
    const matchesLanguage = languageFilter === 'all' || edition.language === languageFilter;
    return matchesFormat && matchesLanguage;
  });

  const languageOptions =
    languages.length > 0
      ? languages
      : Array.from(new Set(editions.map((e) => e.language))).sort();

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
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
            <Globe className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Quran Editions
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            Available translations and recitations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto animate-fade-in">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--accent)] mb-2">
              Format:
            </label>
            <div className="flex gap-2 flex-wrap">
              {['all', ...formats].map((value) => (
                <button
                  key={value}
                  onClick={() => setFormatFilter(value as 'all' | 'text' | 'audio')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formatFilter === value
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]'
                  }`}
                >
                  {value === 'all' ? 'All' : value[0].toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--accent)] mb-2">
              Language:
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="all">All Languages</option>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 text-[var(--accent)]">
          {filteredEditions.length} edition{filteredEditions.length !== 1 ? 's' : ''} found
        </div>

        {/* Editions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredEditions.map((edition, index) => (
            <div
              key={edition.identifier}
              className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] transition-all animate-fade-in"
              style={{ animationDelay: `${(index % 12) * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  {edition.language.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  edition.format === 'text'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}>
                  {edition.format === 'text' ? '📖 Text' : '🎵 Audio'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                {edition.englishName}
              </h3>
              
              {edition.name !== edition.englishName && (
                <p className="text-sm text-[var(--accent)] mb-3">
                  {edition.name}
                </p>
              )}
              
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--accent)]">
                  <code className="bg-[var(--hover)] px-2 py-1 rounded">
                    {edition.identifier}
                  </code>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[var(--hover)] text-[var(--accent)] border border-[var(--border)]">
                    <Tag size={12} />
                    {edition.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
