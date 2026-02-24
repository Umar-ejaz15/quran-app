import { Ayah } from '@/types/quran';

interface AyahCardProps {
  ayah: Ayah;
  showSurahInfo?: boolean;
  translationText?: string;
}

export default function AyahCard({ ayah, translationText }: AyahCardProps) {
  return (
    <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-300 animate-fade-in">
      {/* Ayah Number Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-sm font-bold shadow-md">
            {ayah.numberInSurah}
          </div>
          <div className="text-xs text-[var(--accent)]">
            <div>Juz {ayah.juz} • Page {ayah.page}</div>
          </div>
        </div>
        
        {ayah.sajda && (
          <div className="px-3 py-1 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-medium border border-[var(--secondary)]/20">
            ⊕ Sajda
          </div>
        )}
      </div>

      {/* Arabic Text */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--hover)]">
        <p className="arabic-text text-2xl leading-loose text-[var(--foreground)]">
          {ayah.text}
        </p>
      </div>

      {/* Translation */}
      {translationText && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-base leading-relaxed text-[var(--foreground)] opacity-90">
            {translationText}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-wrap gap-3 text-xs text-[var(--accent)]">
        <span>Manzil {ayah.manzil}</span>
        <span>•</span>
        <span>Ruku {ayah.ruku}</span>
        <span>•</span>
        <span>Hizb {Math.ceil(ayah.hizbQuarter / 4)}</span>
      </div>
    </div>
  );
}
