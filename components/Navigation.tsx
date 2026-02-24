'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Layers, Search, Hand, Info, FileText, Globe2, BookMarked, ScrollText, Layers3 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) || false;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/90 border-b border-[var(--border)]"
           style={{ boxShadow: '0 1px 16px rgba(29,111,78,0.07)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                <span className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-amiri), serif' }}>ق</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-[var(--primary)]">Al-Quran</span>
                <span className="text-[10px] text-[var(--accent)] tracking-wide uppercase">Al-Kareem</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-0.5 overflow-x-auto">
              <DesktopNavLink href="/"         icon={<Home size={15} />}       active={isActive('/')}>Home</DesktopNavLink>
              <DesktopNavLink href="/surahs"   icon={<BookOpen size={15} />}   active={isActive('/surahs') || isActive('/surah')}>Surahs</DesktopNavLink>
              <DesktopNavLink href="/juz"      icon={<Layers size={15} />}     active={isActive('/juz')}>Juz</DesktopNavLink>
              <DesktopNavLink href="/pages"    icon={<FileText size={15} />}   active={isActive('/pages') || isActive('/page')}>Pages</DesktopNavLink>
              <DesktopNavLink href="/manzil"   icon={<BookMarked size={15} />} active={isActive('/manzil')}>Manzil</DesktopNavLink>
              <DesktopNavLink href="/ruku"     icon={<ScrollText size={15} />} active={isActive('/ruku')}>Ruku</DesktopNavLink>
              <DesktopNavLink href="/hizb"     icon={<Layers3 size={15} />}    active={isActive('/hizb')}>Hizb</DesktopNavLink>
              <DesktopNavLink href="/search"   icon={<Search size={15} />}     active={isActive('/search')}>Search</DesktopNavLink>
              <DesktopNavLink href="/sajda"    icon={<Hand size={15} />}       active={isActive('/sajda')}>Sajda</DesktopNavLink>
              <DesktopNavLink href="/editions" icon={<Globe2 size={15} />}     active={isActive('/editions')}>Editions</DesktopNavLink>
              <DesktopNavLink href="/about"    icon={<Info size={15} />}       active={isActive('/about')}>About</DesktopNavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/90 border-b border-[var(--border)]"
           style={{ boxShadow: '0 1px 12px rgba(29,111,78,0.07)' }}>
        <div className="px-4 h-14 flex items-center justify-center">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-base font-bold" style={{ fontFamily: 'var(--font-amiri), serif' }}>ق</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-[var(--primary)]">Al-Quran Al-Kareem</span>
              <span className="text-[9px] text-[var(--accent)] tracking-widest uppercase">القرآن الكريم</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/95 border-t border-[var(--border)]"
           style={{ boxShadow: '0 -2px 16px rgba(29,111,78,0.08)' }}>
        <div className="grid grid-cols-5 h-16">
          <MobileNavLink href="/"       icon={<Home size={20} />}     label="Home"   isActive={pathname === '/'} />
          <MobileNavLink href="/surahs" icon={<BookOpen size={20} />} label="Surahs" isActive={pathname?.startsWith('/surah') || false} />
          <MobileNavLink href="/juz"    icon={<Layers size={20} />}   label="Juz"    isActive={pathname?.startsWith('/juz') || false} />
          <MobileNavLink href="/pages"  icon={<FileText size={20} />} label="Pages"  isActive={pathname?.startsWith('/page') || pathname === '/pages'} />
          <MobileNavLink href="/search" icon={<Search size={20} />}   label="Search" isActive={pathname === '/search'} />
        </div>
      </nav>

      {/* Mobile Content Padding */}
      <div className="md:hidden h-16" />
    </>
  );
}

function DesktopNavLink({
  href, icon, children, active,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
        ${active
          ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold'
          : 'text-[var(--accent)] hover:bg-[var(--hover)] hover:text-[var(--primary)]'
        }
      `}
    >
      {icon}
      {children}
      {active && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--secondary)]" />
      )}
    </Link>
  );
}

function MobileNavLink({
  href, icon, label, isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center justify-center gap-0.5 transition-all duration-200 relative
        ${isActive ? 'text-[var(--primary)]' : 'text-[var(--accent)] hover:text-[var(--primary)]'}
      `}
    >
      <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-[var(--primary)]/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
      {isActive && (
        <span className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[var(--secondary)]" />
      )}
    </Link>
  );
}
