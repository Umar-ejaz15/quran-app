'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--card-bg)]/80 border-b border-[var(--border)] shadow-sm">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/surahs">Surahs</NavLink>
            <NavLink href="/juz">Juz</NavLink>
            <NavLink href="/search">Search</NavLink>
            <NavLink href="/sajda">Sajda</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--hover)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)] animate-fade-in">
            <div className="flex flex-col space-y-2">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/surahs" onClick={() => setIsOpen(false)}>
                Surahs
              </MobileNavLink>
              <MobileNavLink href="/juz" onClick={() => setIsOpen(false)}>
                Juz
              </MobileNavLink>
              <MobileNavLink href="/search" onClick={() => setIsOpen(false)}>
                Search
              </MobileNavLink>
              <MobileNavLink href="/sajda" onClick={() => setIsOpen(false)}>
                Sajda
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-[var(--hover)] hover:text-[var(--primary)] transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-base font-medium text-[var(--foreground)] hover:bg-[var(--hover)] hover:text-[var(--primary)] transition-colors"
    >
      {children}
    </Link>
  );
}
