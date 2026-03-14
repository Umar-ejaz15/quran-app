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

  const handleEnded = () => { setIsPlaying(false); setProgress(0); };
  const handleTimeUpdate = () => {
    if (audioRef.current?.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <article
      className="rounded-2xl animate-fade-in ayah-card"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
      }}
    >
      {/* ── Verse number + meta row ── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          {/* Verse number — clean circle */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              background: 'var(--primary-faint)',
              color: 'var(--primary)',
              border: '1px solid var(--border)',
            }}
          >
            {ayah.numberInSurah}
          </div>

          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            Juz {ayah.juz} · Page {ayah.page}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {ayah.sajda && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background: 'var(--secondary-faint)',
                color: 'var(--secondary-dark)',
              }}
            >
              <Hand size={10} />
              Sajda
            </span>
          )}

          {/* Audio button */}
          {audioUrl && (
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={
                isPlaying
                  ? { background: 'var(--primary)', color: 'white', boxShadow: '0 2px 8px var(--primary-glow)' }
                  : { background: 'var(--primary-faint)', color: 'var(--primary)', border: '1px solid var(--primary)' }
              }
              aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
            >
              {isPlaying ? <Pause size={11} /> : <Play size={11} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          )}
        </div>
      </div>

      {/* Audio progress bar — only when playing, sits below header row */}
      {isPlaying && (
        <div className="px-5 pb-2">
          <div
            className="h-0.5 rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'var(--primary)',
              }}
            />
          </div>
        </div>
      )}

      {/* ── Arabic text ── */}
      <div className="px-6 py-5">
        <p
          className="arabic-text select-text"
          style={{
            color: 'var(--foreground)',
            fontSize: '1.75rem',
            lineHeight: '3.2',
          }}
        >
          {ayah.text}
        </p>
      </div>

      {/* ── Translation ── */}
      {translationText && (
        <div
          className="px-6 py-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              color: 'var(--muted)',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            {translationText}
          </p>
        </div>
      )}

      {/* ── Footer metadata ── */}
      <div
        className="px-6 py-3 flex items-center gap-2 flex-wrap"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {[
          `Manzil ${ayah.manzil}`,
          `Ruku ${ayah.ruku}`,
          `Hizb ${Math.ceil(ayah.hizbQuarter / 4)}`,
        ].map(label => (
          <span
            key={label}
            className="text-xs px-2 py-0.5 rounded"
            style={{
              color: 'var(--subtle)',
              background: 'var(--hover)',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="none"
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          className="hidden"
        />
      )}
    </article>
  );
}
