"use client";

import Link from 'next/link';
import { Surah } from '@/types/quran';

interface SurahCardProps {
  surah: Surah;
  showAyahCount?: boolean;
}

export default function SurahCard({ surah, showAyahCount = true }: SurahCardProps) {
  const isMakki = surah.revelationType?.toLowerCase() === 'meccan';

  return (
    <Link href={`/surah/${surah.number}`}>
      <div
        className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 animate-fade-in cursor-pointer"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'var(--primary)';
          el.style.boxShadow = '0 4px 20px rgba(27,107,74,0.10)';
          el.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'var(--border)';
          el.style.boxShadow = 'none';
          el.style.transform = 'none';
        }}
      >
        {/* Surah number */}
        <div
          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
        >
          {surah.number}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3
              className="text-sm font-bold truncate group-hover:text-[var(--primary)] transition-colors"
              style={{ color: 'var(--foreground)' }}
            >
              {surah.englishName}
            </h3>
            {showAyahCount && (
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0"
                style={{
                  background: isMakki ? 'var(--primary-faint)' : 'var(--secondary-faint)',
                  color: isMakki ? 'var(--primary)' : 'var(--secondary)',
                }}
              >
                {isMakki ? 'Makki' : 'Madani'}
              </span>
            )}
          </div>
          <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>
            {surah.englishNameTranslation}
            {showAyahCount && (
              <span className="ml-2 opacity-70">· {surah.numberOfAyahs} verses</span>
            )}
          </p>
        </div>

        {/* Arabic name */}
        <div
          className="shrink-0 text-lg font-bold group-hover:text-[var(--secondary)] transition-colors"
          style={{
            fontFamily: 'Amiri Quran, Amiri, serif',
            color: 'var(--primary)',
            direction: 'rtl',
          }}
        >
          {surah.name}
        </div>
      </div>
    </Link>
  );
}
