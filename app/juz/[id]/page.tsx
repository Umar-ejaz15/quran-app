'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getJuzWithOffset } from '@/lib/api';
import { Ayah } from '@/types/quran';

export default function JuzDetailPage() {
  const params = useParams();
  const juzNumber = parseInt(params.id as string);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [translations, setTranslations] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState('en.asad');
  const [reciterEdition, setReciterEdition] = useState('ar.alafasy');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    async function loadJuz() {
      try {
        setLoading(true);
        const [arabicData, translationData] = await Promise.all([
          getJuzWithOffset(juzNumber, reciterEdition),
          getJuzWithOffset(juzNumber, selectedEdition),
        ]);
        setAyahs(arabicData.data.ayahs);
        setTranslations(translationData.data.ayahs);
      } catch (error) {
        console.error('Error loading juz:', error);
      } finally {
        setLoading(false);
      }
    }
    loadJuz();
  }, [juzNumber, selectedEdition, reciterEdition]);

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg pb-20 md:pb-0">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg pb-24 md:pb-8">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-4xl">

        {/* Header */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-6 animate-fade-in"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderTop: '3px solid var(--secondary)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-extrabold shadow-md"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
              >
                {juzNumber}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--foreground)' }}>
                  Juz {juzNumber}
                </h1>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {ayahs.length} verses
                </p>
              </div>
            </div>

            {/* Juz navigation */}
            <div className="flex items-center gap-2">
              {juzNumber > 1 && (
                <a
                  href={`/juz/${juzNumber - 1}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--hover)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                >
                  <ChevronLeft size={16} /> Prev
                </a>
              )}
              {juzNumber < 30 && (
                <a
                  href={`/juz/${juzNumber + 1}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--hover)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                >
                  Next <ChevronRight size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => setShowSettings(v => !v)}
              className="flex items-center gap-2 text-xs font-semibold"
              style={{ color: 'var(--muted)' }}
            >
              {showSettings ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showSettings ? 'Hide' : 'Change'} translation &amp; reciter
            </button>

            {showSettings && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Translation</label>
                  <select value={selectedEdition} onChange={e => setSelectedEdition(e.target.value)} className="form-control">
                    <option value="en.asad">English — Muhammad Asad</option>
                    <option value="en.sahih">English — Sahih International</option>
                    <option value="en.yusufali">English — Yusuf Ali</option>
                    <option value="en.pickthall">English — Pickthall</option>
                    <option value="ur.jalandhry">Urdu — Jalandhry</option>
                    <option value="id.indonesian">Indonesian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Reciter</label>
                  <select value={reciterEdition} onChange={e => setReciterEdition(e.target.value)} className="form-control">
                    <option value="ar.alafasy">Mishary Alafasy</option>
                    <option value="ar.husary">Mahmoud Al-Husary</option>
                    <option value="ar.shaatree">Abu Bakr Ash-Shaatree</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ayahs */}
        <div className="space-y-4 md:space-y-5">
          {ayahs.map((ayah, index) => (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              translationText={translations[index]?.text}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
