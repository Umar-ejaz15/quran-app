import Link from 'next/link';
import { BookText } from 'lucide-react';
import { Surah } from '@/types/quran';

interface SurahCardProps {
  surah: Surah;
  showAyahCount?: boolean;
}

export default function SurahCard({ surah, showAyahCount = true }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.number}`}>
      <div className="group h-full p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          {/* Surah Number Badge */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
            {surah.number}
          </div>

          {/* Surah Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
              {surah.englishName}
            </h3>
            <p className="text-sm text-[var(--accent)] mt-1 truncate">
              {surah.englishNameTranslation}
            </p>
            {showAyahCount && (
              <div className="flex items-center gap-3 mt-2 text-xs text-[var(--accent)]">
                <span className="flex items-center gap-1">
                  <BookText size={16} />
                  {surah.numberOfAyahs} Verses
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--hover)] capitalize">
                  {surah.revelationType}
                </span>
              </div>
            )}
          </div>

          {/* Arabic Name */}
          <div className="flex-shrink-0 text-2xl font-bold text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors arabic-text">
            {surah.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
