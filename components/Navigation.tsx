'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Layers, Search, Hand, Info, FileText, Globe2, BookMarked, ScrollText } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/80 border-b border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white text-xl font-bold">ق</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent">
                Al-Quran
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-1">
              <DesktopNavLink href="/" icon={<Home size={18} />}>
                Home
              </DesktopNavLink>
              <DesktopNavLink href="/surahs" icon={<BookOpen size={18} />}>
                Surahs
              </DesktopNavLink>
              <DesktopNavLink href="/juz" icon={<Layers size={18} />}>
                Juz
              </DesktopNavLink>
              <DesktopNavLink href="/pages" icon={<FileText size={18} />}>
                Pages
              </DesktopNavLink>
              <DesktopNavLink href="/manzil" icon={<BookMarked size={18} />}>
                Manzil
              </DesktopNavLink>
              <DesktopNavLink href="/ruku" icon={<ScrollText size={18} />}>
                Ruku
              </DesktopNavLink>
              <DesktopNavLink href="/hizb" icon={<Layers size={18} />}>
                Hizb
              </DesktopNavLink>
              <DesktopNavLink href="/search" icon={<Search size={18} />}>
                Search
              </DesktopNavLink>
              <DesktopNavLink href="/sajda" icon={<Hand size={18} />}>
                Sajda
              </DesktopNavLink>
              <DesktopNavLink href="/editions" icon={<Globe2 size={18} />}>
                Editions
              </DesktopNavLink>
              <DesktopNavLink href="/about" icon={<Info size={18} />}>
                About
              </DesktopNavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/80 border-b border-[var(--border)] shadow-sm">
        <div className="px-4 h-16 flex items-center justify-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white text-xl font-bold">ق</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent">
              Al-Quran
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/95 border-t border-[var(--border)] shadow-lg">
        <div className="grid grid-cols-5 h-16">
          <MobileNavLink href="/" icon={<Home size={20} />} label="Home" isActive={pathname === '/'} />
          <MobileNavLink href="/surahs" icon={<BookOpen size={20} />} label="Surahs" isActive={pathname?.startsWith('/surah') || false} />
          <MobileNavLink href="/juz" icon={<Layers size={20} />} label="Juz" isActive={pathname?.startsWith('/juz') || false} />
          <MobileNavLink href="/pages" icon={<FileText size={20} />} label="Pages" isActive={pathname?.startsWith('/page') || pathname === '/pages'} />
          <MobileNavLink href="/search" icon={<Search size={20} />} label="Search" isActive={pathname === '/search'} />
        </div>
      </nav>

      {/* Mobile Content Padding */}
      <div className="md:hidden h-16" />
    </>
  );
}

function DesktopNavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--hover)] hover:text-[var(--primary)] transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        isActive
          ? 'text-[var(--primary)]'
          : 'text-[var(--accent)] hover:text-[var(--primary)]'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
