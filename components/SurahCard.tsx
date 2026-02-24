import Link from 'next/link';
import { BookText } from 'lucide-react';
import { Surah } from '@/types/quran';

interface SurahCardProps {
  surah: Surah;
  showAyahCount?: boolean;
}

export default function SurahCard({ surah, showAyahCount = true }: SurahCardProps) {
  const isMakki = surah.revelationType?.toLowerCase() === 'meccan';

  return (
    <Link href={`/surah/${surah.number}`}>
      <div className="group h-full p-5 rounded-xl bg-(--card-bg) border border-(--border) hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
           style={{ borderTop: '3px solid transparent' }}
           onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderTopColor = 'var(--secondary)'; }}
           onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent'; }}>

        <div className="flex items-start justify-between gap-4">
          {/* Surah Number Badge */}
          <div className="shrink-0 w-11 h-11 rounded-lg bg-linear-to-br from-primary to-(--primary-dark) flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform text-sm">
            {surah.number}
          </div>

          {/* Surah Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {surah.englishName}
            </h3>
            <p className="text-xs text-(--accent) mt-0.5 truncate">
              {surah.englishNameTranslation}
            </p>
            {showAyahCount && (
              <div className="flex items-center gap-2 mt-2 text-xs text-(--muted)">
                <span className="flex items-center gap-1">
                  <BookText size={13} />
                  {surah.numberOfAyahs} verses
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    isMakki
                      ? 'bg-primary/10 text-primary'
                      : 'bg-(--secondary)/15 text-secondary'
                  }`}
                >
                  {isMakki ? 'Makki' : 'Madani'}
                </span>
              </div>
            )}
          </div>

          {/* Arabic Name */}
          <div className="shrink-0 text-xl font-bold text-primary group-hover:text-secondary transition-colors arabic-text leading-none mt-1">
            {surah.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
