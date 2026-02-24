"use client";
import Link from 'next/link';
import { BookOpen, Search, BookText, Layers, Hand, Globe, FileText, BookMarked, ScrollText, Layers3 } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <BookOpen size={28} />, title: 'Surahs', description: 'Browse all 114 chapters of the Quran', href: '/surahs',
  },
  {
    icon: <Layers size={28} />, title: 'Juz', description: 'Navigate by 30 divisions for daily reading', href: '/juz',
  },
  {
    icon: <BookText size={28} />, title: 'Pages', description: 'Jump to any page of the Mushaf', href: '/pages',
  },
  {
    icon: <Search size={28} />, title: 'Search', description: 'Find any verse or phrase instantly', href: '/search',
  },
  {
    icon: <Hand size={28} />, title: 'Sajda', description: 'Verses of prostration (Sajda)', href: '/sajda',
  },
  {
    icon: <Globe size={28} />, title: 'Editions', description: 'Read in different languages & recitations', href: '/editions',
  },
  {
    icon: <FileText size={28} />, title: 'About', description: 'Learn about this project', href: '/about',
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
      {features.map((feature, index) => (
        <Link
          key={index}
          href={feature.href}
          className="group p-6 md:p-8 rounded-2xl bg-(--card-bg) border border-(--border) hover:border-primary hover:shadow-xl transition-all duration-300 animate-fade-in border-t-4 border-t-transparent hover:border-t-secondary"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 mb-4 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            {feature.icon}
          </div>
          <h3 className="text-base md:text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-(--accent) leading-relaxed">
            {feature.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
