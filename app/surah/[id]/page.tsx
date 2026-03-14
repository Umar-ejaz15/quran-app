'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getSurahWithOffset } from '@/lib/api';
import { Surah } from '@/types/quran';

export default function SurahDetailPage() {
  const params = useParams();
  const surahNumber = parseInt(params.id as string);

  const [surah, setSurah] = useState<Surah | null>(null);
  const [translation, setTranslation] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState('en.asad');
  const [reciterEdition, setReciterEdition] = useState('ar.alafasy');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    async function loadSurah() {
      try {
        setLoading(true);
        const [arabicData, translationData] = await Promise.all([
          getSurahWithOffset(surahNumber, reciterEdition),
          getSurahWithOffset(surahNumber, selectedEdition),
        ]);
        setSurah(arabicData.data);
        setTranslation(translationData.data);
      } catch (error) {
        console.error('Error loading surah:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSurah();
  }, [surahNumber, selectedEdition, reciterEdition]);

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg pb-20 md:pb-0">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  if (!surah || !translation) {
    return (
      <div className="min-h-screen pattern-bg pb-20 md:pb-0">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl" style={{ color: 'var(--accent)' }}>Surah not found</p>
        </div>
      </div>
    );
  }

  const isMakki = surah.revelationType?.toLowerCase() === 'meccan';

  return (
    <div className="min-h-screen pattern-bg pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-4xl">

        {/* ── Surah Header ── */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-6 animate-fade-in"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',

            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}
        >
          <div className="text-center">
            {/* Surah number */}
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-white text-xl font-extrabold mb-4 shadow-md"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
            >
              {surah.number}
            </div>

            <h1
              className="text-3xl md:text-4xl font-extrabold mb-2"
              style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}
            >
              {surah.englishName}
            </h1>

            <p
              className="text-2xl md:text-3xl mb-2"
              style={{
                fontFamily: 'Amiri Quran, Amiri, serif',
                color: 'var(--primary)',
                direction: 'rtl',
              }}
            >
              {surah.name}
            </p>

            <p className="text-base md:text-lg mb-5" style={{ color: 'var(--accent)' }}>
              {surah.englishNameTranslation}
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span
                className="chip"
                style={{ color: isMakki ? 'var(--primary)' : 'var(--secondary)', borderColor: 'currentColor', background: isMakki ? 'var(--primary-faint)' : 'var(--secondary-faint)' }}
              >
                {isMakki ? 'Makki' : 'Madani'}
              </span>
              <span className="chip chip-muted">{surah.numberOfAyahs} Verses</span>
              <span className="chip chip-muted">Surah {surah.number}</span>
            </div>
          </div>

          {/* Settings toggle */}
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => setShowSettings(v => !v)}
              className="flex items-center gap-2 text-xs font-semibold transition-colors"
              style={{ color: 'var(--muted)' }}
            >
              {showSettings ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showSettings ? 'Hide' : 'Change'} translation &amp; reciter
            </button>

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
                    Reciter
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

          {/* Surah navigation */}
          <div className="flex items-center justify-between mt-4">
            {surah.number > 1 ? (
              <a href={`/surah/${surah.number - 1}`} className="flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
                <ChevronLeft size={14} /> Previous Surah
              </a>
            ) : <span />}
            {surah.number < 114 ? (
              <a href={`/surah/${surah.number + 1}`} className="flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
                Next Surah <ChevronRight size={14} />
              </a>
            ) : <span />}
          </div>
        </div>

        {/* ── Bismillah ── */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div
            className="mb-5 p-5 rounded-xl text-center animate-fade-in"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
            }}
          >
            <p
              className="arabic-text"
              style={{ fontSize: '1.9rem', color: 'var(--primary)', lineHeight: 2.4 }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}

        {/* ── Verses ── */}
        <div className="space-y-4 md:space-y-5">
          {surah.ayahs?.map((ayah, index) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              translationText={translation.ayahs?.[index]?.text}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
