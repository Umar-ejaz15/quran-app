import React from 'react';

interface PageHeaderProps {
  title: string;
  titleArabic?: string;
  subtitle: string;
  badge?: React.ReactNode;
}

/**
 * Shared dark immersive header — matches the surah page aesthetic.
 * Used across juz, pages, search, sajda, about.
 */
export default function PageHeader({ title, titleArabic, subtitle, badge }: PageHeaderProps) {
  return (
    <header
      className="relative overflow-hidden"
      style={{ background: 'var(--primary-dark)' }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(200,146,10,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-5 md:px-10 py-10 md:py-14 text-center">

        {titleArabic && (
          <p
            className="mb-3"
            style={{
              fontFamily: 'Amiri Quran, Amiri, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: 'rgba(245,237,232,0.5)',
              direction: 'rtl',
              lineHeight: 1.6,
            }}
          >
            {titleArabic}
          </p>
        )}

        {/* Gold separator */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ width: '32px', height: '1px', background: 'var(--secondary)', opacity: 0.4 }} />
          <span style={{ color: 'var(--secondary)', fontSize: '0.4rem', opacity: 0.6 }}>◆</span>
          <div style={{ width: '32px', height: '1px', background: 'var(--secondary)', opacity: 0.4 }} />
        </div>

        <h1
          className="font-extrabold mb-2"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#f5ede8',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'rgba(237,224,212,0.55)',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            marginTop: '0.4rem',
          }}
        >
          {subtitle}
        </p>

        {badge && (
          <div className="mt-4 flex justify-center">
            {badge}
          </div>
        )}
      </div>
    </header>
  );
}
