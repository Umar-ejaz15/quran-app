'use client';

import { Hand, Play, Pause } from 'lucide-react';
import { useRef, useState } from 'react';
import { Ayah } from '@/types/quran';

interface AyahCardProps {
  ayah: Ayah;
  showSurahInfo?: boolean;
  translationText?: string;
}

export default function AyahCard({ ayah, translationText }: AyahCardProps) {
  const audioUrl = ayah.audio || ayah.audioSecondary?.[0];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <div className="p-4 md:p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all duration-300 animate-fade-in">
      {/* Ayah Number Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-md">
            {ayah.numberInSurah}
          </div>
          <div className="text-xs text-[var(--accent)]">
            <div>Juz {ayah.juz} • Page {ayah.page}</div>
          </div>
        </div>
        
        {ayah.sajda && (
          <div className="px-3 py-1 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-medium border border-[var(--secondary)]/20 flex items-center gap-1">
            <Hand size={14} />
            <span className="hidden sm:inline">Sajda</span>
          </div>
        )}
      </div>

      {/* Arabic Text */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg bg-[var(--hover)]">
        <p className="arabic-text text-xl md:text-2xl leading-loose text-[var(--foreground)]">
          {ayah.text}
        </p>
      </div>

      {/* Translation */}
      {translationText && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-sm md:text-base leading-relaxed text-[var(--foreground)] opacity-90">
            {translationText}
          </p>
        </div>
      )}

      {/* Audio Player */}
      {audioUrl && (
        <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--hover)] border border-[var(--border)] text-sm text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'} audio
          </button>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="none"
            onEnded={handleEnded}
            className="hidden"
          />
          <span className="text-xs text-[var(--accent)]">Recitation</span>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-wrap gap-2 md:gap-3 text-xs text-[var(--accent)]">
        <span>Manzil {ayah.manzil}</span>
        <span>•</span>
        <span>Ruku {ayah.ruku}</span>
        <span>•</span>
        <span>Hizb {Math.ceil(ayah.hizbQuarter / 4)}</span>
      </div>
    </div>
  );
}
