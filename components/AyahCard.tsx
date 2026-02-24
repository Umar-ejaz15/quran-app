'use client';

import { Hand, Play, Pause, Volume2 } from 'lucide-react';
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
  const [progress, setProgress] = useState(0);

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

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <div className="rounded-2xl bg-(--card-bg) border border-(--border) hover:border-(--primary)/40 hover:shadow-lg transition-all duration-300 animate-fade-in overflow-hidden">

      {/* Verse Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-(--hover) border-b border-(--border)">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-(--primary-dark) flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
            {ayah.numberInSurah}
          </div>
          <div className="text-xs text-(--accent)">
            <span className="font-medium text-foreground">Juz {ayah.juz}</span>
            <span className="mx-1.5 opacity-40">•</span>
            <span>Page {ayah.page}</span>
          </div>
        </div>

        {ayah.sajda && (
          <div className="px-3 py-1 rounded-full bg-(--secondary)/15 text-secondary text-xs font-semibold border border-(--secondary)/30 flex items-center gap-1.5">
            <Hand size={12} />
            <span className="hidden sm:inline">Sajda</span>
          </div>
        )}
      </div>

      {/* Arabic Text — gold left-border accent */}
      <div
        className="px-5 py-6"
        style={{
          borderLeft: '4px solid var(--secondary)',
          background: 'linear-gradient(to right, rgba(200,148,30,0.04), transparent 40%)',
        }}
      >
        <p
          className="arabic-text text-foreground leading-loose select-text"
          style={{ fontSize: '1.65rem', lineHeight: '2.8' }}
        >
          {ayah.text}
        </p>
      </div>

      {/* Translation */}
      {translationText && (
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-linear-to-r from-(--border) via-(--secondary)/30 to-(--border)" />
            <span className="text-secondary text-xs opacity-60">Translation</span>
            <div className="flex-1 h-px bg-linear-to-l from-(--border) via-(--secondary)/30 to-(--border)" />
          </div>
          <p className="text-sm md:text-base leading-relaxed text-(--foreground)/85 italic">
            {translationText}
          </p>
        </div>
      )}

      {/* Footer: Audio + Metadata */}
      <div className="px-5 py-3 border-t border-(--border) flex flex-wrap items-center justify-between gap-3">

        {audioUrl ? (
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                isPlaying
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-(--hover) text-foreground border-(--border) hover:border-primary hover:text-primary'
              }`}
              aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              <span>{isPlaying ? 'Pause' : 'Listen'}</span>
            </button>

            {isPlaying && (
              <div className="flex items-center gap-1">
                <Volume2 size={13} className="text-primary" />
                <div className="w-20 h-1.5 bg-(--border) rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <audio
              ref={audioRef}
              src={audioUrl}
              preload="none"
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
              className="hidden"
            />
          </div>
        ) : (
          <div />
        )}

        {/* Metadata chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-(--muted)">
          <span className="px-2 py-0.5 rounded-md bg-(--hover) border border-(--border)">Manzil {ayah.manzil}</span>
          <span className="px-2 py-0.5 rounded-md bg-(--hover) border border-(--border)">Ruku {ayah.ruku}</span>
          <span className="px-2 py-0.5 rounded-md bg-(--hover) border border-(--border)">Hizb {Math.ceil(ayah.hizbQuarter / 4)}</span>
        </div>
      </div>
    </div>
  );
}
