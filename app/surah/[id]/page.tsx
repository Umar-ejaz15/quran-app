'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getSurahWithOffset } from '@/lib/api';
import { setCanonicalUrl, getSurahUrl } from '@/lib/canonical';
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
    // Set canonical URL for SEO
    setCanonicalUrl(getSurahUrl(surahNumber));

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
      <div className="min-h-screen pb-20 md:pb-0" style={{ background: 'var(--background)' }}>
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  if (!surah || !translation) {
    return (
      <div className="min-h-screen pb-20 md:pb-0" style={{ background: 'var(--background)' }}>
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl" style={{ color: 'var(--accent)' }}>Surah not found</p>
        </div>
      </div>
    );
  }

  const isMakki = surah.revelationType?.toLowerCase() === 'meccan';

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ background: 'var(--background)' }}>
      <Navigation />

      {/* ══════════════════════════════════════════
          SURAH HEADER — immersive banner
      ══════════════════════════════════════════ */}
      <header
        className="relative overflow-hidden"
        style={{ background: 'var(--primary-dark)' }}
      >
        {/* Atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(200,146,10,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Ghost surah number — large typographic backdrop */}
        <span
          className="absolute pointer-events-none select-none"
          aria-hidden="true"
          style={{
            fontFamily: 'Amiri, Georgia, serif',
            fontSize: 'clamp(10rem, 20vw, 18rem)',
            fontWeight: 700,
            lineHeight: 1,
            color: '#fff',
            opacity: 0.04,
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            letterSpacing: '-0.05em',
          }}
        >
          {surah.number}
        </span>

        <div className="relative z-10 container mx-auto px-5 md:px-10 py-10 md:py-14">

          {/* Navigation row */}
          <div className="flex items-center justify-between mb-8">
            {surah.number > 1 ? (
              <a
                href={`/surah/${surah.number - 1}`}
                className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'rgba(237,224,212,0.6)' }}
              >
                <ChevronLeft size={13} /> Previous
              </a>
            ) : <span />}
            <span
              style={{
                fontFamily: 'Amiri, serif',
                fontSize: '0.7rem',
                color: 'rgba(237,224,212,0.4)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Surah {surah.number} of 114
            </span>
            {surah.number < 114 ? (
              <a
                href={`/surah/${surah.number + 1}`}
                className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'rgba(237,224,212,0.6)' }}
              >
                Next <ChevronRight size={13} />
              </a>
            ) : <span />}
          </div>

          {/* Surah identity */}
          <div className="text-center">

            {/* Arabic name — the hero */}
            <p
              style={{
                fontFamily: 'Amiri Quran, Amiri, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                lineHeight: 1.4,
                direction: 'rtl',
                color: '#f5ede8',
                marginBottom: '0.5rem',
                display: 'block',
              }}
            >
              {surah.name}
            </p>

            {/* Gold separator */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div style={{ width: '40px', height: '1px', background: 'var(--secondary)', opacity: 0.5 }} />
              <span style={{ color: 'var(--secondary)', fontSize: '0.45rem', opacity: 0.7 }}>◆</span>
              <div style={{ width: '40px', height: '1px', background: 'var(--secondary)', opacity: 0.5 }} />
            </div>

            {/* English name */}
            <h1
              className="font-extrabold mb-1"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: '#f5ede8',
                letterSpacing: '-0.02em',
              }}
            >
              {surah.englishName}
            </h1>

            {/* Meaning */}
            <p
              className="mb-6"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(237,224,212,0.55)',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
              }}
            >
              {surah.englishNameTranslation}
            </p>

            {/* Metadata pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: isMakki ? 'rgba(109,72,49,0.4)' : 'rgba(200,146,10,0.2)',
                  color: isMakki ? '#e8c4a0' : '#f2b50b',
                  border: `1px solid ${isMakki ? 'rgba(232,196,160,0.3)' : 'rgba(242,181,11,0.3)'}`,
                }}
              >
                {isMakki ? 'Makki' : 'Madani'}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(237,224,212,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {surah.numberOfAyahs} Verses
              </span>
            </div>
          </div>

          {/* Settings row */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setShowSettings(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all mx-auto hover:opacity-90"
              style={{
                color: '#f5ede8',
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.20)',
              }}
            >
              <Settings2 size={13} />
              {showSettings ? 'Hide Settings' : 'Translation & Reciter'}
              {showSettings ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            {showSettings && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(237,224,212,0.45)' }}>
                    Translation
                  </label>
                  <select
                    value={selectedEdition}
                    onChange={e => setSelectedEdition(e.target.value)}
                    className="form-control"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#f5ede8', borderColor: 'rgba(255,255,255,0.12)' }}
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
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(237,224,212,0.45)' }}>
                    Reciter
                  </label>
                  <select
                    value={reciterEdition}
                    onChange={e => setReciterEdition(e.target.value)}
                    className="form-control"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#f5ede8', borderColor: 'rgba(255,255,255,0.12)' }}
                  >
                    <option value="ar.alafasy">Mishary Alafasy</option>
                    <option value="ar.husary">Mahmoud Al-Husary</option>
                    <option value="ar.shaatree">Abu Bakr Ash-Shaatree</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">

        {/* ── Bismillah ── */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="text-center mb-10 animate-fade-in">
            <p
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                lineHeight: 2.6,
                color: 'var(--primary)',
                display: 'block',
              }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}

        {/* ── Verses ── */}
        <div className="space-y-3 md:space-y-4">
          {surah.ayahs?.map((ayah, index) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              translationText={translation.ayahs?.[index]?.text}
            />
          ))}
        </div>

        {/* ── Bottom navigation ── */}
        <div
          className="flex items-center justify-between mt-12 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {surah.number > 1 ? (
            <a
              href={`/surah/${surah.number - 1}`}
              className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: 'var(--primary)' }}
            >
              <ChevronLeft size={16} /> Previous Surah
            </a>
          ) : <span />}
          {surah.number < 114 ? (
            <a
              href={`/surah/${surah.number + 1}`}
              className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: 'var(--primary)' }}
            >
              Next Surah <ChevronRight size={16} />
            </a>
          ) : <span />}
        </div>
      </main>
    </div>
  );
}
