'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { searchQuran } from '@/lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
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
    <div className="min-h-screen pattern-bg pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent px-4">
            Search the Quran
          </h1>
          <p className="text-base md:text-lg text-[var(--accent)] px-4">
            Search through verses to find guidance
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in px-2">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter keyword to search..."
                className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-sm md:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon size={20} />
                    Search
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--accent)] mb-2">
                  Surah scope:
                </label>
                <select
                  value={surah}
                  onChange={(e) => setSurah(e.target.value as 'all' | string)}
                  className="w-full px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="all">All surahs</option>
                  {Array.from({ length: 114 }).map((_, idx) => (
                    <option key={idx + 1} value={String(idx + 1)}>
                      Surah {idx + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--accent)] mb-2">
                  Edition or language code:
                </label>
                <input
                  type="text"
                  value={editionOrLanguage}
                  onChange={(e) => setEditionOrLanguage(e.target.value)}
                  placeholder="e.g., en.asad or en"
                  className="w-full px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
                <p className="text-xs text-[var(--accent)] mt-1">
                  Use an edition id (en.asad) or 2-letter language (en, fr). Default searches all English texts.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)]/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {!loading && searched && (
          <div className="max-w-4xl mx-auto">
            {results.length > 0 ? (
              <>
                <div className="mb-6 text-center text-[var(--accent)]">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all animate-fade-in"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Link
                          href={`/surah/${result.surah.number}`}
                          className="text-lg font-bold text-[var(--primary)] hover:underline"
                        >
                          {result.surah.englishName} ({result.surah.name})
                        </Link>
                        <span className="text-sm text-[var(--accent)]">
                          Ayah {result.numberInSurah}
                        </span>
                      </div>
                      
                      <p className="text-base leading-relaxed text-[var(--foreground)]">
                        {result.text}
                      </p>
                      
                      <Link
                        href={`/surah/${result.surah.number}`}
                        className="inline-block mt-4 text-sm text-[var(--primary)] hover:underline"
                      >
                        Read full Surah →
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 px-4">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" />
                <p className="text-lg md:text-xl text-[var(--accent)]">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="text-xs md:text-sm text-[var(--accent)] mt-2">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>
        )}

        {!searched && !loading && (
          <div className="text-center py-12 px-4">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" />
            <p className="text-lg md:text-xl text-[var(--accent)]">
              Enter a keyword to search
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
