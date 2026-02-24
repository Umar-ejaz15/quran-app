import {
  QuranResponse,
  SurahResponse,
  AyahResponse,
  AyahMultiEditionResponse,
  EditionsResponse,
  JuzResponse,
  SearchResponse,
  MetaResponse,
  SajdaResponse,
  SurahsListResponse,
  SurahMultiEditionResponse,
} from '@/types/quran';

const BASE_URL = 'https://api.alquran.cloud';
type ListResponse = { code: number; status: string; data: string[] };

// Helper function for API calls
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Accept-Encoding': 'gzip',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// GET Edition - All available editions
export async function getEditions() {
  return fetchAPI<EditionsResponse>('/v1/edition');
}

// GET Edition with filters (format, language, type)
export async function getEditionsFiltered({ format, language, type }: { format?: string; language?: string; type?: string }) {
  const params = [];
  if (format) params.push(`format=${format}`);
  if (language) params.push(`language=${language}`);
  if (type) params.push(`type=${type}`);
  const query = params.length ? `?${params.join('&')}` : '';
  return fetchAPI<EditionsResponse>(`/v1/edition${query}`);
}

// GET Edition by language
export async function getEditionsByLanguage(language: string) {
  return fetchAPI<EditionsResponse>(`/v1/edition/language/${language}`);
}

// GET Edition by type
export async function getEditionsByType(type: string) {
  return fetchAPI<EditionsResponse>(`/v1/edition/type/${type}`);
}

// GET Edition by format
export async function getEditionsByFormat(format: string) {
  return fetchAPI<EditionsResponse>(`/v1/edition/format/${format}`);
}

// GET all languages that have editions
export async function getLanguages() {
  return fetchAPI<ListResponse>('/v1/edition/language');
}

// GET all edition types (translation, tafsir, etc.)
export async function getTypes() {
  return fetchAPI<ListResponse>('/v1/edition/type');
}

// GET all formats (text, audio)
export async function getFormats() {
  return fetchAPI<ListResponse>('/v1/edition/format');
}

// GET Quran - Get a complete Quran edition
export async function getQuran(edition: string = 'en.asad') {
  return fetchAPI<QuranResponse>(`/v1/quran/${edition}`);
}

// GET Surah list (114 entries)
export async function getSurahList() {
  return fetchAPI<SurahsListResponse>('/v1/surah');
}

// GET Juz - Get a Juz of the Quran
export async function getJuz(juzNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/juz/${juzNumber}/${edition}`);
}

// GET Juz with optional offset/limit for ayahs
export async function getJuzWithOffset(
  juzNumber: number,
  edition: string = 'en.asad',
  offset?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (offset !== undefined) params.append('offset', offset.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI<JuzResponse>(`/v1/juz/${juzNumber}/${edition}${query}`);
}

// GET Surah - Get a Surah of the Quran
export async function getSurah(surahNumber: number, edition: string = 'en.asad') {
  return fetchAPI<SurahResponse>(`/v1/surah/${surahNumber}/${edition}`);
}

// GET Surah in multiple editions
export async function getSurahMultipleEditions(surahNumber: number, editions: string[]) {
  const editionsParam = editions.join(',');
  return fetchAPI<SurahMultiEditionResponse>(
    `/v1/surah/${surahNumber}/editions/${editionsParam}`
  );
}

// GET Surah with specific edition and offset/limit
export async function getSurahWithOffset(
  surahNumber: number,
  edition: string = 'en.asad',
  offset?: number,
  limit?: number
) {
  let url = `/v1/surah/${surahNumber}/${edition}`;
  const params = new URLSearchParams();
  
  if (offset !== undefined) params.append('offset', offset.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  return fetchAPI<SurahResponse>(url);
}

// GET Ayah - Get an Ayah of the Quran (accepts ayah number or surah:ayah reference)
export async function getAyah(reference: number | string, edition: string = 'en.asad') {
  return fetchAPI<AyahResponse>(`/v1/ayah/${reference}/${edition}`);
}

// GET Ayah by Surah:Ayah reference
export async function getAyahBySurah(
  surahNumber: number,
  ayahNumber: number,
  edition: string = 'en.asad'
) {
  return fetchAPI<AyahResponse>(`/v1/ayah/${surahNumber}:${ayahNumber}/${edition}`);
}

// GET Multiple editions of an Ayah
export async function getAyahMultipleEditions(ayahNumber: number, editions: string[]) {
  const editionsParam = editions.join(',');
  return fetchAPI<AyahMultiEditionResponse>(
    `/v1/ayah/${ayahNumber}/editions/${editionsParam}`
  );
}

// GET Search - Search the text of the Quran
// keyword: term to search
// surah: number 1-114 or 'all' (default: 'all')
// editionOrLanguage: edition id (e.g., en.asad) or 2-letter language code (default: 'en' for all English texts)
export async function searchQuran(
  keyword: string,
  surah: number | 'all' = 'all',
  editionOrLanguage: string = 'en'
) {
  const surahPart = surah === undefined ? 'all' : surah;
  const url = `/v1/search/${encodeURIComponent(keyword)}/${surahPart}/${editionOrLanguage}`;
  return fetchAPI<SearchResponse>(url);
}

// GET Manzil - Get a Manzil of the Quran
export async function getManzil(manzilNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/manzil/${manzilNumber}/${edition}`);
}

// GET Manzil with optional offset/limit
export async function getManzilWithOffset(
  manzilNumber: number,
  edition: string = 'en.asad',
  offset?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (offset !== undefined) params.append('offset', offset.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI<JuzResponse>(`/v1/manzil/${manzilNumber}/${edition}${query}`);
}

// GET Ruku - Get a Ruku of the Quran
export async function getRuku(rukuNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/ruku/${rukuNumber}/${edition}`);
}

// GET Ruku with optional offset/limit
export async function getRukuWithOffset(
  rukuNumber: number,
  edition: string = 'en.asad',
  offset?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (offset !== undefined) params.append('offset', offset.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI<JuzResponse>(`/v1/ruku/${rukuNumber}/${edition}${query}`);
}

// GET Page - Get a Page of the Quran
export async function getPage(pageNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/page/${pageNumber}/${edition}`);
}

// GET Page with optional offset/limit
export async function getPageWithOffset(
  pageNumber: number,
  edition: string = 'en.asad',
  offset?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (offset !== undefined) params.append('offset', offset.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI<JuzResponse>(`/v1/page/${pageNumber}/${edition}${query}`);
}

// GET Hizb Quarter - Get a Hizb Quarter of the Quran
export async function getHizbQuarter(hizbNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/hizbQuarter/${hizbNumber}/${edition}`);
}

// GET Hizb Quarter with optional offset/limit
export async function getHizbQuarterWithOffset(
  hizbNumber: number,
  edition: string = 'en.asad',
  offset?: number,
  limit?: number
) {
  const params = new URLSearchParams();
  if (offset !== undefined) params.append('offset', offset.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  const query = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI<JuzResponse>(`/v1/hizbQuarter/${hizbNumber}/${edition}${query}`);
}

// GET Sajda - Get all verses requiring Sajda/Prostration
export async function getSajdas(edition: string = 'en.asad') {
  return fetchAPI<SajdaResponse>(`/v1/sajda/${edition}`);
}

// GET Meta - Get meta data about Surahs, Pages, Hizbs and Juzs
export async function getMeta() {
  return fetchAPI<MetaResponse>('/v1/meta');
}
