"use client";

import Link from 'next/link';
import { BookOpen, Search, BookText, Layers, Hand, Globe, FileText } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Surahs',
    description: 'Browse all 114 chapters of the Quran with translations and audio',
    href: '/surahs',
    badge: '114',
  },
  {
    icon: Layers,
    title: 'Juz',
    description: 'Navigate by 30 equal divisions — perfect for daily reading',
    href: '/juz',
    badge: '30',
  },
  {
    icon: BookText,
    title: 'Pages',
    description: 'Jump to any Mushaf page with authentic page layout view',
    href: '/pages',
    badge: '604',
  },
  {
    icon: Search,
    title: 'Search',
    description: 'Find any verse or phrase across all translations instantly',
    href: '/search',
  },
  {
    icon: Hand,
    title: 'Sajda',
    description: 'All 15 verses requiring prostration during recitation',
    href: '/sajda',
    badge: '15',
  },
  {
    icon: Globe,
    title: 'Editions',
    description: 'Explore dozens of translations and audio reciters',
    href: '/editions',
  },
  {
    icon: FileText,
    title: 'About',
    description: 'Learn about this project and its data sources',
    href: '/about',
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Link
            key={feature.href}
            href={feature.href}
            className="group relative flex flex-col p-5 md:p-6 rounded-2xl transition-all duration-200 animate-fade-in overflow-hidden"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              animationDelay: `${index * 55}ms`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'var(--primary)';
              el.style.boxShadow = '0 8px 32px rgba(27,107,74,0.12)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'var(--border)';
              el.style.boxShadow = 'none';
              el.style.transform = 'none';
            }}
          >
            {/* Gold accent top line on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to right, var(--secondary), transparent)' }}
            />

            {/* Icon */}
            <div
              className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              style={{
                background: 'var(--primary-faint)',
                color: 'var(--primary)',
              }}
            >
              <Icon size={22} />
            </div>

            {/* Title + badge */}
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-sm font-bold group-hover:text-[var(--primary)] transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                {feature.title}
              </h3>
              {feature.badge && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                  style={{
                    background: 'var(--secondary-faint)',
                    color: 'var(--secondary)',
                  }}
                >
                  {feature.badge}
                </span>
              )}
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              {feature.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
