'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, Loader2, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
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
    <div className="min-h-screen pattern-bg pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">

        {/* Header */}
        <div className="section-header mb-8 animate-fade-in">
          <h1 className="text-gradient-hero" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            Search the Quran
          </h1>
          <p className="mt-2 text-base" style={{ color: 'var(--muted)' }}>
            Find any verse or phrase across all translations
          </p>
        </div>

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
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted)' }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter keyword to search..."
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm"
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
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Searching…</>
                ) : (
                  <><SearchIcon size={16} /> Search</>
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
                  Edition or language code
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
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: 'var(--primary)', opacity: 0.2 }} />
              <div className="absolute inset-0 rounded-full border-4 animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <div>
            {results.length > 0 ? (
              <>
                <p className="text-center text-sm mb-6 font-semibold" style={{ color: 'var(--muted)' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-5 md:p-6 rounded-2xl transition-all animate-fade-in"
                      style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        animationDelay: `${index * 40}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <Link
                          href={`/surah/${result.surah.number}`}
                          className="text-sm font-bold hover:underline flex items-center gap-1.5"
                          style={{ color: 'var(--primary)' }}
                        >
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: 'var(--primary)' }}
                          >
                            {result.surah.number}
                          </span>
                          {result.surah.englishName}
                          <span style={{ color: 'var(--muted)' }}>·</span>
                          <span style={{ fontFamily: 'Amiri Quran, Amiri, serif', color: 'var(--primary)' }}>
                            {result.surah.name}
                          </span>
                        </Link>
                        <span className="chip chip-muted flex-shrink-0">Ayah {result.numberInSurah}</span>
                      </div>

                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground)' }}>
                        {result.text}
                      </p>

                      <Link
                        href={`/surah/${result.surah.number}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                        style={{ color: 'var(--primary)' }}
                      >
                        Read full Surah <ChevronRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <SearchIcon size={48} style={{ color: 'var(--border-strong)', marginBottom: '1rem' }} />
                <p className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>
                  No results for &quot;{query}&quot;
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial state */}
        {!searched && !loading && (
          <div className="empty-state">
            <SearchIcon size={48} style={{ color: 'var(--border-strong)', marginBottom: '1rem' }} />
            <p className="text-base font-semibold" style={{ color: 'var(--accent)' }}>
              Enter a keyword to search
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Search across all English translations by default
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
