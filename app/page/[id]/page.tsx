'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, FileText, LayoutGrid, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPageWithOffset } from '@/lib/api';
import { Ayah, Surah } from '@/types/quran';

// Convert Western digits to Arabic-Indic numerals
function toArabicNumerals(n: number): string {
  const d = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  return n.toString().split('').map(c => d[parseInt(c)] ?? c).join('');
}

interface AyahGroup {
  surahNumber: number;
  surahInfo: Surah | null;
  ayahs: Ayah[];
  translationAyahs: Ayah[];
}

function groupAyahsBySurah(
  ayahs: Ayah[],
  translations: Ayah[],
  surahsMap: Record<string, Surah>
): AyahGroup[] {
  if (!ayahs.length) return [];

  const surahNumbers = Object.keys(surahsMap).map(Number).sort((a, b) => a - b);
  const groups: AyahGroup[] = [];
  let currentSurahIdx = 0;
  let currentGroup: AyahGroup | null = null;

  ayahs.forEach((ayah, index) => {
    const isNewSurah = ayah.numberInSurah === 1;

    if (isNewSurah && index > 0) {
      currentSurahIdx = Math.min(currentSurahIdx + 1, surahNumbers.length - 1);
    }

    const surahNum = surahNumbers[currentSurahIdx];
    const surahInfo = surahsMap[surahNum?.toString()] ?? null;

    if (!currentGroup || isNewSurah) {
      currentGroup = {
        surahNumber: surahNum,
        surahInfo,
        ayahs: [],
        translationAyahs: [],
      };
      groups.push(currentGroup);
    }

    currentGroup.ayahs.push(ayah);
    currentGroup.translationAyahs.push(translations[index] ?? ayah);
  });

  return groups;
}

export default function PageDetailPage() {
  const params = useParams();
  const pageNumber = parseInt(params.id as string);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [translations, setTranslations] = useState<Ayah[]>([]);
  const [surahsMap, setSurahsMap] = useState<Record<string, Surah>>({});
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState('en.asad');
  const [reciterEdition, setReciterEdition] = useState('ar.alafasy');
  const [viewMode, setViewMode] = useState<'mushaf' | 'cards'>('mushaf');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);
        const [arabicData, translationData] = await Promise.all([
          getPageWithOffset(pageNumber, reciterEdition),
          getPageWithOffset(pageNumber, selectedEdition),
        ]);

        setAyahs(arabicData.data.ayahs);
        setTranslations(translationData.data.ayahs);
        setSurahsMap((arabicData.data.surahs as Record<string, Surah>) ?? {});
      } catch (error) {
        console.error('Error loading page:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPage();
  }, [pageNumber, selectedEdition, reciterEdition]);

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg pb-20 md:pb-0">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  const groups = groupAyahsBySurah(ayahs, translations, surahsMap);

  return (
    <div className="min-h-screen pattern-bg pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-4xl">

        {/* ── Page Header ── */}
        <div
          className="rounded-2xl p-5 md:p-7 mb-6 animate-fade-in"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Title */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
              >
                <FileText className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--foreground)' }}>
                  Page {pageNumber}
                </h1>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {ayahs.length} verses · Mushaf page {pageNumber} of 604
                </p>
              </div>
            </div>

            {/* Page navigation */}
            <div className="flex items-center gap-2">
              {pageNumber > 1 && (
                <a
                  href={`/page/${pageNumber - 1}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--hover)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  }}
                >
                  <ChevronLeft size={16} />
                  Prev
                </a>
              )}
              {pageNumber < 604 && (
                <a
                  href={`/page/${pageNumber + 1}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--hover)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                  }}
                >
                  Next
                  <ChevronRight size={16} />
                </a>
              )}
            </div>
          </div>

          {/* View mode + Settings toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>

            {/* View mode toggle */}
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: '1.5px solid var(--border)' }}
            >
              <button
                onClick={() => setViewMode('mushaf')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all"
                style={{
                  background: viewMode === 'mushaf' ? 'var(--primary)' : 'var(--card-bg)',
                  color: viewMode === 'mushaf' ? 'white' : 'var(--accent)',
                }}
              >
                <BookOpen size={14} />
                Mushaf View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all"
                style={{
                  background: viewMode === 'cards' ? 'var(--primary)' : 'var(--card-bg)',
                  color: viewMode === 'cards' ? 'white' : 'var(--accent)',
                  borderLeft: '1.5px solid var(--border)',
                }}
              >
                <LayoutGrid size={14} />
                Cards View
              </button>
            </div>

            {/* Settings toggle */}
            <button
              onClick={() => setShowSettings(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: showSettings ? 'var(--primary-faint)' : 'var(--hover)',
                color: showSettings ? 'var(--primary)' : 'var(--accent)',
                border: '1.5px solid var(--border)',
              }}
            >
              Edition &amp; Reciter
              {showSettings ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Translation
                </label>
                <select
                  value={selectedEdition}
                  onChange={e => setSelectedEdition(e.target.value)}
                  className="form-control"
                >
                  <option value="en.asad">English — Muhammad Asad</option>
                  <option value="en.sahih">English — Sahih International</option>
                  <option value="en.yusufali">English — Yusuf Ali</option>
                  <option value="en.pickthall">English — Pickthall</option>
                  <option value="ur.jalandhry">Urdu — Jalandhry</option>
                  <option value="id.indonesian">Indonesian</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                  Reciter (for audio)
                </label>
                <select
                  value={reciterEdition}
                  onChange={e => setReciterEdition(e.target.value)}
                  className="form-control"
                >
                  <option value="ar.alafasy">Mishary Alafasy</option>
                  <option value="ar.husary">Mahmoud Al-Husary</option>
                  <option value="ar.shaatree">Abu Bakr Ash-Shaatree</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ── MUSHAF VIEW ── */}
        {viewMode === 'mushaf' && (
          <div className="animate-draw-in">
            {/* The Mushaf Page */}
            <div className="mushaf-page mx-auto max-w-3xl">

              {/* Mushaf page header */}
              <div className="mushaf-header">
                <span className="mushaf-page-number">
                  ﴿ Page {pageNumber} ﴾
                </span>
              </div>

              {/* Verse groups by surah */}
              {groups.map((group, gIdx) => (
                <div key={gIdx}>
                  {/* Surah title */}
                  {group.surahInfo && (
                    <div className="text-center my-4">
                      <div
                        className="inline-block px-8 py-2 rounded-lg"
                        style={{
                          background: 'var(--mushaf-secondary)',
                          border: '1px solid var(--mushaf-border)',
                        }}
                      >
                        <span className="mushaf-surah-title" style={{ display: 'block', margin: 0 }}>
                          سُورَةُ {group.surahInfo.name}
                        </span>
                        <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--mushaf-ornament)', opacity: 0.8 }}>
                          {group.surahInfo.englishName} · {group.surahInfo.numberOfAyahs} verses
                        </span>
                      </div>

                      {/* Bismillah (not for Al-Fatiha and At-Tawbah) */}
                      {group.surahNumber !== 1 && group.surahNumber !== 9 && (
                        <div className="mushaf-bismillah mt-3">
                          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </div>
                      )}
                    </div>
                  )}

                  {/* Continuous verse text */}
                  <p className="mushaf-text">
                    {group.ayahs.map((ayah) => (
                      <span key={ayah.number}>
                        {ayah.text}
                        {' '}
                        <span className="mushaf-verse-number">
                          ﴿{toArabicNumerals(ayah.numberInSurah)}﴾
                        </span>
                        {' '}
                      </span>
                    ))}
                  </p>
                </div>
              ))}

              {/* Mushaf page footer */}
              <div className="mushaf-footer">
                <span className="mushaf-page-number">
                  {pageNumber} · Juz {ayahs[0]?.juz ?? '—'}
                </span>
              </div>
            </div>

            {/* Translation toggle */}
            <div className="mt-6 max-w-3xl mx-auto">
              <button
                onClick={() => setShowTranslation(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: showTranslation ? 'var(--primary-faint)' : 'var(--hover)',
                  border: '1.5px solid var(--border)',
                  color: showTranslation ? 'var(--primary)' : 'var(--accent)',
                }}
              >
                {showTranslation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showTranslation ? 'Hide' : 'Show'} Translation
              </button>

              {/* Translations per verse */}
              {showTranslation && (
                <div
                  className="mt-3 rounded-2xl overflow-hidden animate-fade-in"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {groups.map((group, gIdx) => (
                    <div key={gIdx}>
                      {group.surahInfo && (
                        <div
                          className="px-6 py-3 text-sm font-bold"
                          style={{
                            background: 'var(--hover)',
                            borderBottom: '1px solid var(--border)',
                            color: 'var(--primary)',
                          }}
                        >
                          {group.surahInfo.englishName} — {group.surahInfo.englishNameTranslation}
                        </div>
                      )}
                      {group.ayahs.map((ayah, idx) => (
                        <div
                          key={ayah.number}
                          className="px-6 py-4 flex gap-4"
                          style={{
                            borderBottom: idx < group.ayahs.length - 1 ? '1px solid var(--border)' : 'none',
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
                          >
                            {ayah.numberInSurah}
                          </div>
                          <p className="text-sm leading-relaxed italic flex-1" style={{ color: 'var(--accent)' }}>
                            {group.translationAyahs[idx]?.text ?? ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CARDS VIEW ── */}
        {viewMode === 'cards' && (
          <div className="space-y-4 md:space-y-5 animate-fade-in">
            {ayahs.map((ayah, index) => (
              <AyahCard
                key={ayah.number}
                ayah={ayah}
                translationText={translations[index]?.text}
              />
            ))}
          </div>
        )}

        {/* ── Bottom page navigation ── */}
        <div className="flex items-center justify-between mt-8 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          {pageNumber > 1 ? (
            <a
              href={`/page/${pageNumber - 1}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              <ChevronLeft size={16} />
              Page {pageNumber - 1}
            </a>
          ) : <div />}

          {pageNumber < 604 ? (
            <a
              href={`/page/${pageNumber + 1}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              Page {pageNumber + 1}
              <ChevronRight size={16} />
            </a>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
