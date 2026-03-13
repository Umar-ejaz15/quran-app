'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, Layers, Search, Hand, Info,
  FileText
} from 'lucide-react';

const allLinks = [
  { href: '/',       icon: Home,     label: 'Home'   },
  { href: '/surahs', icon: BookOpen, label: 'Surahs' },
  { href: '/juz',    icon: Layers,   label: 'Juz'    },
  { href: '/pages',  icon: FileText, label: 'Pages'  },
  { href: '/search', icon: Search,   label: 'Search' },
  { href: '/sajda',  icon: Hand,     label: 'Sajda'  },
  { href: '/about',  icon: Info,     label: 'About'  },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <>
      {/* ════════════════════════════════════════
          Desktop Navigation — sticky top bar
      ════════════════════════════════════════ */}
      <nav
        className="hidden md:flex sticky top-0 z-50 items-center border-b"
        style={{
          height: '62px',
          background: 'var(--card-bg)',
          borderColor: 'var(--border)',
          boxShadow: '0 1px 16px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="container mx-auto px-5 flex items-center gap-3 h-full">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group mr-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
            >
              <span
                className="text-white font-bold"
                style={{ fontFamily: 'Scheherazade New, Noto Naskh Arabic, Amiri Quran, Amiri, serif', fontSize: '1.1rem' }}
              >ق</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>Al-Quran</div>
              <div className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Al-Kareem</div>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 flex-shrink-0" style={{ background: 'var(--border)' }} />

          {/* Nav Links */}
          <div className="flex items-center gap-0.5 flex-1 overflow-x-auto min-w-0 no-scrollbar">
            {allLinks.map(({ href, icon: Icon, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all hover:bg-[var(--hover)]"
                  style={{ color: active ? 'var(--primary)' : 'var(--muted)' }}
                >
                  <Icon size={13} />
                  <span style={{ fontWeight: active ? 700 : 500 }}>{label}</span>
                  {active && (
                    <span
                      className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full"
                      style={{ background: 'var(--secondary)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          Mobile — top identity bar
      ════════════════════════════════════════ */}
      <header
        className="md:hidden sticky top-0 z-50 flex items-center justify-center px-4 border-b"
        style={{
          height: '50px',
          background: 'var(--card-bg)',
          borderColor: 'var(--border)',
          boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
          >
            <span
              className="text-white font-bold"
              style={{ fontFamily: 'Scheherazade New, Noto Naskh Arabic, Amiri Quran, Amiri, serif', fontSize: '0.85rem' }}
            >ق</span>
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>Al-Quran Al-Kareem</span>
            <span className="mx-2 text-xs" style={{ color: 'var(--border-strong)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'Amiri, serif' }}>القرآن الكريم</span>
          </div>
        </Link>
      </header>

      {/* ════════════════════════════════════════
          Mobile — bottom navigation (all links, scrollable)
      ════════════════════════════════════════ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t overflow-x-auto no-scrollbar"
        style={{
          height: '64px',
          background: 'var(--card-bg)',
          borderColor: 'var(--border)',
          boxShadow: '0 -2px 20px rgba(0,0,0,0.12)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-stretch h-full min-w-max px-1">
          {allLinks.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="relative flex flex-col items-center justify-center gap-0.5 px-3 flex-shrink-0"
                style={{
                  minWidth: '64px',
                  color: active ? 'var(--primary)' : 'var(--muted)',
                }}
              >
                {/* Active indicator */}
                {active && (
                  <span
                    className="absolute top-0 left-2 right-2 h-0.5 rounded-b-full"
                    style={{ background: 'var(--secondary)' }}
                  />
                )}

                {/* Icon pill */}
                <div
                  className="w-9 h-7 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: active ? 'var(--primary-faint)' : 'transparent',
                  }}
                >
                  <Icon size={17} />
                </div>

                {/* Label */}
                <span
                  className="text-[9px] tracking-wide whitespace-nowrap"
                  style={{ fontWeight: active ? 700 : 500 }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer so content isn't hidden behind bottom nav */}
      <div className="md:hidden" style={{ height: '64px' }} />
    </>
  );
}
