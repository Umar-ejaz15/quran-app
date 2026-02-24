'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AyahCard from '@/components/AyahCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPageWithOffset } from '@/lib/api';
import { Ayah } from '@/types/quran';

export default function PageDetailPage() {
  const params = useParams();
  const pageNumber = parseInt(params.id as string);
  
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [translations, setTranslations] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState('en.asad');
  const [reciterEdition, setReciterEdition] = useState('ar.alafasy');
  const [offset, setOffset] = useState<string>('');
  const [limit, setLimit] = useState<string>('');

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);
        const offVal = offset ? parseInt(offset, 10) : undefined;
        const limitVal = limit ? parseInt(limit, 10) : undefined;
        const [arabicData, translationData] = await Promise.all([
          getPageWithOffset(pageNumber, reciterEdition, offVal, limitVal),
          getPageWithOffset(pageNumber, selectedEdition, offVal, limitVal),
        ]);
        
        setAyahs(arabicData.data.ayahs);
        setTranslations(translationData.data.ayahs);
      } catch (error) {
        console.error('Error loading page:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [pageNumber, selectedEdition, reciterEdition, offset, limit]);

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
        {/* Page Header */}
        <div className="mb-8 md:mb-12 p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg animate-fade-in mx-2">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-4 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-md">
              <FileText className="text-white" size={28} />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-[var(--foreground)]">
              Page {pageNumber}
            </h1>
            
            <p className="text-base md:text-lg text-[var(--accent)] mb-4">
              {ayahs.length} Verses
            </p>

            {/* Page Navigation */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-6">
              {pageNumber > 1 && (
                <a
                  href={`/page/${pageNumber - 1}`}
                  className="px-4 md:px-6 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)] transition-all flex items-center gap-2 text-sm md:text-base"
                >
                  <ChevronLeft size={18} />
                  Previous
                </a>
              )}
              {pageNumber < 604 && (
                <a
                  href={`/page/${pageNumber + 1}`}
                  className="px-4 md:px-6 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)] transition-all flex items-center gap-2 text-sm md:text-base"
                >
                  Next
                  <ChevronRight size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Edition Selector */}
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <label className="block text-xs md:text-sm font-medium text-[var(--accent)] mb-2">
              Select Translation:
            </label>
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm md:text-base"
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
                <label className="block text-xs md:text-sm font-medium text-[var(--accent)] mb-2">
                  Reciter (audio):
                </label>
                <select
                  value={reciterEdition}
                  onChange={(e) => setReciterEdition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                >
                  <option value="ar.alafasy">Mishary Alafasy</option>
                  <option value="ar.husary">Mahmoud Al-Husary</option>
                  <option value="ar.shaatree">Abu Bakr Ash-Shaatree</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-[var(--accent)] mb-2">
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
                <label className="block text-xs md:text-sm font-medium text-[var(--accent)] mb-2">
                  Limit
                </label>
                <input
                  type="number"
                  min={1}
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                  placeholder="e.g., 5"
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
