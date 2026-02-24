'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  const [offset, setOffset] = useState<string>('');
  const [limit, setLimit] = useState<string>('');

  useEffect(() => {
    async function loadJuz() {
      try {
        setLoading(true);
        const offVal = offset ? parseInt(offset, 10) : undefined;
        const limitVal = limit ? parseInt(limit, 10) : undefined;
        const [arabicData, translationData] = await Promise.all([
          getJuzWithOffset(juzNumber, reciterEdition, offVal, limitVal),
          getJuzWithOffset(juzNumber, selectedEdition, offVal, limitVal),
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
  }, [juzNumber, selectedEdition, reciterEdition, offset, limit]);

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
      
      <main className="container mx-auto px-4 py-12">
        {/* Juz Header */}
        <div className="mb-12 p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white text-2xl font-bold shadow-md">
              {juzNumber}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[var(--foreground)]">
              Juz {juzNumber}
            </h1>
            
            <p className="text-lg text-[var(--accent)] mb-4">
              {ayahs.length} Ayahs
            </p>
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

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-[var(--accent)] mb-2">
                  Reciter (audio):
                </label>
                <select
                  value={reciterEdition}
                  onChange={(e) => setReciterEdition(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="ar.alafasy">Mishary Alafasy</option>
                  <option value="ar.husary">Mahmoud Al-Husary</option>
                  <option value="ar.shaatree">Abu Bakr Ash-Shaatree</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--accent)] mb-2">
                  Offset
                </label>
                <input
                  type="number"
                  min={0}
                  value={offset}
                  onChange={(e) => setOffset(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--accent)] mb-2">
                  Limit
                </label>
                <input
                  type="number"
                  min={1}
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                  placeholder="e.g., 10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ayahs */}
        <div className="space-y-4 md:space-y-6 px-2">
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
