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

  const handleEnded = () => { setIsPlaying(false); setProgress(0); };
  const handleTimeUpdate = () => {
    if (audioRef.current?.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <article
      className="rounded-2xl overflow-hidden animate-fade-in"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* ── Header strip ── */}
      <div
        className="flex items-center justify-between px-5 py-2.5"
        style={{
          background: 'var(--hover)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Verse number badge */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
          >
            {ayah.numberInSurah}
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <span
              className="font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              Juz {ayah.juz}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Page {ayah.page}</span>
          </div>
        </div>

        {ayah.sajda && (
          <span
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: 'var(--secondary-faint)',
              color: 'var(--secondary)',
              border: '1px solid var(--secondary)',
            }}
          >
            <Hand size={11} />
            Sajda
          </span>
        )}
      </div>

      {/* ── Arabic text ── */}
      <div
        className="px-5 py-6"
        style={{
          borderLeft: '3px solid var(--secondary)',
          background: 'linear-gradient(to right, var(--secondary-faint), transparent 40%)',
        }}
      >
        <p
          className="arabic-text select-text"
          style={{ color: 'var(--foreground)', fontSize: '1.7rem', lineHeight: '3' }}
        >
          {ayah.text}
        </p>
      </div>

      {/* ── Translation ── */}
      {translationText && (
        <div className="px-5 pb-4">
          <div
            className="flex items-center gap-3 my-3"
          >
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Translation
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <p
            className="text-sm md:text-base leading-relaxed italic"
            style={{ color: 'var(--accent)' }}
          >
            {translationText}
          </p>
        </div>
      )}

      {/* ── Footer: audio + chips ── */}
      <div
        className="px-5 py-3 flex flex-wrap items-center justify-between gap-3"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {audioUrl ? (
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={
                isPlaying
                  ? {
                      background: 'var(--primary)',
                      color: 'white',
                      boxShadow: '0 2px 12px var(--green-glow)',
                    }
                  : {
                      background: 'var(--hover)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }
              }
              aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Listen'}
            </button>

            {isPlaying && (
              <div className="flex items-center gap-2">
                <Volume2 size={13} style={{ color: 'var(--primary)' }} />
                <div
                  className="w-20 h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'var(--border)' }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                    }}
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
        <div className="flex flex-wrap items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
          <span
            className="px-2 py-0.5 rounded-md"
            style={{ background: 'var(--hover)', border: '1px solid var(--border)' }}
          >
            Manzil {ayah.manzil}
          </span>
          <span
            className="px-2 py-0.5 rounded-md"
            style={{ background: 'var(--hover)', border: '1px solid var(--border)' }}
          >
            Ruku {ayah.ruku}
          </span>
          <span
            className="px-2 py-0.5 rounded-md"
            style={{ background: 'var(--hover)', border: '1px solid var(--border)' }}
          >
            Hizb {Math.ceil(ayah.hizbQuarter / 4)}
          </span>
        </div>
      </div>
    </article>
  );
}
