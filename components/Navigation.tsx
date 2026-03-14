'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, Layers, Search, Hand, Info,
  FileText, Sun, Moon
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import LogoIcon from '@/components/LogoIcon';

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
  const { theme, toggle } = useTheme();

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
        className="hidden md:flex sticky top-0 z-50 items-center"
        style={{
          height: '68px',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="w-full px-8 flex items-center h-full">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <LogoIcon size={38} />
            <div className="leading-tight">
              <div className="text-base font-bold" style={{ color: 'var(--primary)' }}>Al-Quran</div>
              <div className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Al-Kareem</div>
            </div>
          </Link>

          {/* CENTER — Nav links */}
          <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto no-scrollbar">
            {allLinks.map(({ href, icon: Icon, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm whitespace-nowrap transition-all hover:bg-[var(--hover)]"
                  style={{ color: active ? 'var(--primary)' : 'var(--muted)', fontWeight: active ? 700 : 500 }}
                >
                  <Icon size={14} />
                  {label}
                  {active && (
                    <span
                      className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full"
                      style={{ background: 'var(--secondary)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT — Theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-[var(--hover)]"
            style={{ color: 'var(--muted)' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          Mobile — top identity bar
      ════════════════════════════════════════ */}
      <header
        className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 border-b"
        style={{
          height: '50px',
          background: 'var(--card-bg)',
          borderColor: 'var(--border)',
          boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon size={28} />
          <div className="leading-tight">
            <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>Al-Quran Al-Kareem</span>
            <span className="mx-2 text-xs" style={{ color: 'var(--border-strong)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'Amiri, serif' }}>القرآن الكريم</span>
          </div>
        </Link>
        <button
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[var(--hover)]"
          style={{ color: 'var(--muted)' }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
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
