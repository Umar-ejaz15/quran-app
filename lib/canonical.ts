/**
 * Helper function to set canonical tag for client-side pages
 * Ensures each dynamic page has a proper canonical URL for SEO
 */
export function setCanonicalUrl(url: string): void {
  if (typeof document === 'undefined') return;

  // Remove existing canonical tag if present
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  if (existingCanonical) {
    existingCanonical.remove();
  }

  // Create and append new canonical tag
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Build URL for a Surah page
 * Example: https://www.noorulquraan.com/surah/1
 */
export function getSurahUrl(surahNumber: number): string {
  return `https://www.noorulquraan.com/surah/${surahNumber}`;
}

/**
 * Build URL for a Juz page
 * Example: https://www.noorulquraan.com/juz/1
 */
export function getJuzUrl(juzNumber: number): string {
  return `https://www.noorulquraan.com/juz/${juzNumber}`;
}

/**
 * Build URL for a page (Mushaf page number)
 * Example: https://www.noorulquraan.com/page/1
 */
export function getPageUrl(pageNumber: number): string {
  return `https://www.noorulquraan.com/page/${pageNumber}`;
}

/**
 * Build URL for a Ruku page
 * Example: https://www.noorulquraan.com/ruku/1
 */
export function getRukuUrl(rukuNumber: number): string {
  return `https://www.noorulquraan.com/ruku/${rukuNumber}`;
}

/**
 * Build URL for a Manzil page
 * Example: https://www.noorulquraan.com/manzil/1
 */
export function getManzilUrl(manzilNumber: number): string {
  return `https://www.noorulquraan.com/manzil/${manzilNumber}`;
}

/**
 * Build URL for a Hizb Quarter page
 * Example: https://www.noorulquraan.com/hizb/1
 */
export function getHizbUrl(hizbNumber: number): string {
  return `https://www.noorulquraan.com/hizb/${hizbNumber}`;
}
