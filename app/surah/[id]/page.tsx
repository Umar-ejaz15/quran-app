'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getSurah, getAyahMultipleEditions } from '@/lib/api';
import { Surah, Ayah } from '@/types/quran';

export default function SurahDetailPage() {
  const params = useParams();
  const surahNumber = parseInt(params.id as string);
  
  const [surah, setSurah] = useState<Surah | null>(null);
  const [translation, setTranslation] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState('en.asad');

  useEffect(() => {
    async function loadSurah() {
      try {
        setLoading(true);
        const [arabicData, translationData] = await Promise.all([
          getSurah(surahNumber, 'ar.alafasy'),
          getSurah(surahNumber, selectedEdition),
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
  }, [surahNumber, selectedEdition]);

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  if (!surah || !translation) {
    return (
      <div className="min-h-screen pattern-bg">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl text-[var(--accent)]">Surah not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Surah Header */}
        <div className="mb-12 p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white text-2xl font-bold shadow-md">
              {surah.number}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[var(--foreground)]">
              {surah.englishName}
            </h1>
            
            <p className="text-3xl mb-3 text-[var(--primary)] arabic-text">
              {surah.name}
            </p>
            
            <p className="text-xl text-[var(--accent)] mb-4">
              {surah.englishNameTranslation}
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-[var(--accent)]">
              <span className="px-4 py-2 rounded-full bg-[var(--hover)] capitalize">
                {surah.revelationType}
              </span>
              <span className="px-4 py-2 rounded-full bg-[var(--hover)]">
                {surah.numberOfAyahs} Ayahs
              </span>
            </div>
          </div>

          {/* Edition Selector */}
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <label className="block text-sm font-medium text-[var(--accent)] mb-2">
              Select Translation:
            </label>
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="en.asad">English - Muhammad Asad</option>
              <option value="en.sahih">English - Sahih International</option>
              <option value="en.yusufali">English - Yusuf Ali</option>
              <option value="en.pickthall">English - Pickthall</option>
              <option value="ur.jalandhry">Urdu - Jalandhry</option>
              <option value="id.indonesian">Indonesian</option>
            </select>
          </div>
        </div>

        {/* Bismillah */}
        {surah.number !== 1 && surah.number !== 9 && (
          <div className="mb-8 p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center animate-fade-in">
            <p className="arabic-text text-3xl text-[var(--primary)]">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-sm text-[var(--accent)] mt-2">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}

        {/* Ayahs */}
        <div className="space-y-6">
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
