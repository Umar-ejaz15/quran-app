'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, Loader2, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import { searchQuran } from '@/lib/api';
import type { SearchResponse } from '@/types/quran';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse['data']['matches']>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [editionOrLanguage, setEditionOrLanguage] = useState('en');
  const [surah, setSurah] = useState<'all' | string>('all');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      setSearched(true);
      const response = await searchQuran(
        query,
        surah === 'all' ? 'all' : Number(surah),
        editionOrLanguage
      );
      setResults(response.data.matches || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: 'var(--background)' }}>
      <Navigation />

      <PageHeader
        title="Search the Quran"
        subtitle="Find any verse or phrase across all translations"
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-4xl">

        {/* Search Form */}
        <div
          className="p-5 md:p-6 rounded-2xl mb-8 animate-fade-in"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search input row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <SearchIcon
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--muted)' }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter keyword to search…"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-colors"
                  style={{
                    background: 'var(--hover)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--foreground)',
                    outline: 'none',
                  }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--primary)'; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{
                  background: 'var(--primary)',
                  boxShadow: '0 2px 12px var(--primary-glow)',
                }}
              >
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Searching…</>
                ) : (
                  <><SearchIcon size={15} /> Search</>
                )}
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Surah scope
                </label>
                <select
                  value={surah}
                  onChange={e => setSurah(e.target.value)}
                  className="form-control"
                >
                  <option value="all">All Surahs</option>
                  {Array.from({ length: 114 }).map((_, idx) => (
                    <option key={idx + 1} value={String(idx + 1)}>
                      Surah {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Edition or language
                </label>
                <input
                  type="text"
                  value={editionOrLanguage}
                  onChange={e => setEditionOrLanguage(e.target.value)}
                  placeholder="e.g., en.asad or en"
                  className="form-control"
                />
                <p className="text-[10px] mt-1" style={{ color: 'var(--subtle)' }}>
                  Edition id (en.asad) or 2-letter language code (en, ur, id)
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'var(--border)' }} />
              <div className="absolute inset-0 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <div className="animate-fade-in">
            {results.length > 0 ? (
              <>
                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: 'var(--muted)' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                </p>
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-5 md:p-6 rounded-2xl animate-fade-in transition-all hover:border-[var(--border-strong)]"
                      style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        animationDelay: `${index * 35}ms`,
                      }}
                    >
                      {/* Result header */}
                      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                        <Link
                          href={`/surah/${result.surah.number}`}
                          className="flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70"
                          style={{ color: 'var(--primary)' }}
                        >
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: 'var(--primary)' }}
                          >
                            {result.surah.number}
                          </span>
                          {result.surah.englishName}
                          <span style={{ color: 'var(--border-strong)' }}>·</span>
                          <span style={{ fontFamily: 'Amiri Quran, Amiri, serif' }}>
                            {result.surah.name}
                          </span>
                        </Link>
                        <span
                          className="text-xs px-2 py-0.5 rounded-md flex-shrink-0"
                          style={{ background: 'var(--hover)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                        >
                          Ayah {result.numberInSurah}
                        </span>
                      </div>

                      {/* Verse text */}
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground)', fontFamily: 'Georgia, serif' }}>
                        {result.text}
                      </p>

                      <Link
                        href={`/surah/${result.surah.number}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
                        style={{ color: 'var(--primary)' }}
                      >
                        Read full Surah <ChevronRight size={11} />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial state */}
        {!searched && !loading && (
          <div className="text-center py-16">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--primary-faint)' }}
            >
              <SearchIcon size={28} style={{ color: 'var(--primary)' }} />
            </div>
            <p className="text-base font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
              Search the Quran
            </p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Enter a keyword to search across all English translations
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
