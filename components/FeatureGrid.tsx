"use client";

import Link from 'next/link';
import { BookOpen, Search, BookText, Layers, Hand, Globe, FileText, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Surahs',
    description: 'All 114 chapters with translations and audio recitation',
    href: '/surahs',
    badge: '114',
  },
  {
    icon: Layers,
    title: 'Juz',
    description: '30 equal divisions — ideal for daily Ramadan reading',
    href: '/juz',
    badge: '30',
  },
  {
    icon: BookText,
    title: 'Pages',
    description: 'Jump to any Mushaf page with faithful layout view',
    href: '/pages',
    badge: '604',
  },
  {
    icon: Search,
    title: 'Search',
    description: 'Find any verse or phrase across all translations',
    href: '/search',
    badge: null,
  },
  {
    icon: Hand,
    title: 'Sajda Verses',
    description: 'All 15 verses of prostration for your recitation',
    href: '/sajda',
    badge: '15',
  },
  {
    icon: Globe,
    title: 'Editions',
    description: 'Dozens of translations and audio reciters to choose from',
    href: '/editions',
    badge: null,
  },
  {
    icon: FileText,
    title: 'About',
    description: 'About this project, its sources, and how it was built',
    href: '/about',
    badge: null,
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const num = String(index + 1).padStart(2, '0');
        return (
          <Link
            key={feature.href}
            href={feature.href}
            className={`feature-row-item reveal reveal-delay-${Math.min(index + 3, 8)}`}
          >
            {/* Index number */}
            <span
              className="flex-shrink-0 font-bold tabular-nums"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.04em',
                color: 'var(--border-strong)',
                width: '1.6rem',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {num}
            </span>

            {/* Icon */}
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
              style={{
                background: 'var(--primary-faint)',
                color: 'var(--primary)',
              }}
            >
              <Icon size={17} strokeWidth={2} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-sm font-bold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {feature.title}
                </span>
                {feature.badge && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                    style={{
                      background: 'var(--secondary-faint)',
                      color: 'var(--secondary-dark)',
                    }}
                  >
                    {feature.badge}
                  </span>
                )}
              </div>
              <p
                className="text-xs leading-relaxed truncate"
                style={{ color: 'var(--muted)' }}
              >
                {feature.description}
              </p>
            </div>

            {/* Arrow */}
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: 'var(--border-strong)' }}
            />
          </Link>
        );
      })}
    </div>
  );
}
