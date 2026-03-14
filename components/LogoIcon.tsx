import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders the logo.svg as an inline <img> that adapts to light/dark mode.
 * In dark mode a CSS filter inverts it so it stays visible.
 */
export default function LogoIcon({ size = 36, className = '', style = {} }: LogoIconProps) {
  return (
    <img
      src="/logo.svg"
      alt="Al-Quran Al-Kareem"
      width={size}
      height={size}
      className={`logo-icon ${className}`}
      style={{ display: 'block', ...style }}
      draggable={false}
    />
  );
}
