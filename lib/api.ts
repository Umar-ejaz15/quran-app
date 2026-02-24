import {
  QuranResponse,
  SurahResponse,
  AyahResponse,
  EditionsResponse,
  JuzResponse,
  SearchResponse,
  MetaResponse,
  SajdaResponse,
} from '@/types/quran';

const BASE_URL = 'https://api.alquran.cloud';

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

// GET Edition - Available text and audio editions
export async function getEditions() {
  return fetchAPI<EditionsResponse>('/v1/edition');
}

export async function getEditionsByType(type: 'text' | 'audio') {
  return fetchAPI<EditionsResponse>(`/v1/edition/type/${type}`);
}

export async function getEditionsByFormat(format: 'text' | 'audio') {
  return fetchAPI<EditionsResponse>(`/v1/edition/format/${format}`);
}

export async function getEditionsByLanguage(language: string) {
  return fetchAPI<EditionsResponse>(`/v1/edition/language/${language}`);
}

// GET Quran - Get a complete Quran edition
export async function getQuran(edition: string = 'en.asad') {
  return fetchAPI<QuranResponse>(`/v1/quran/${edition}`);
}

// GET Juz - Get a Juz of the Quran
export async function getJuz(juzNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/juz/${juzNumber}/${edition}`);
}

// GET Surah - Get a Surah of the Quran
export async function getSurah(surahNumber: number, edition: string = 'en.asad') {
  return fetchAPI<SurahResponse>(`/v1/surah/${surahNumber}/${edition}`);
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

// GET Ayah - Get an Ayah of the Quran
export async function getAyah(ayahNumber: number, edition: string = 'en.asad') {
  return fetchAPI<AyahResponse>(`/v1/ayah/${ayahNumber}/${edition}`);
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
  return fetchAPI<{ code: number; status: string; data: any[] }>(
    `/v1/ayah/${ayahNumber}/editions/${editionsParam}`
  );
}

// GET Search - Search the text of the Quran
export async function searchQuran(
  keyword: string,
  surah?: number,
  edition: string = 'en.asad'
) {
  let url = `/v1/search/${encodeURIComponent(keyword)}/${edition}`;
  if (surah) {
    url += `/${surah}`;
  }
  return fetchAPI<SearchResponse>(url);
}

// GET Manzil - Get a Manzil of the Quran
export async function getManzil(manzilNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/manzil/${manzilNumber}/${edition}`);
}

// GET Ruku - Get a Ruku of the Quran
export async function getRuku(rukuNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/ruku/${rukuNumber}/${edition}`);
}

// GET Page - Get a Page of the Quran
export async function getPage(pageNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/page/${pageNumber}/${edition}`);
}

// GET Hizb Quarter - Get a Hizb Quarter of the Quran
export async function getHizbQuarter(hizbNumber: number, edition: string = 'en.asad') {
  return fetchAPI<JuzResponse>(`/v1/hizbQuarter/${hizbNumber}/${edition}`);
}

// GET Sajda - Get all verses requiring Sajda/Prostration
export async function getSajdas(edition: string = 'en.asad') {
  return fetchAPI<SajdaResponse>(`/v1/sajda/${edition}`);
}

// GET Meta - Get meta data about Surahs, Pages, Hizbs and Juzs
export async function getMeta() {
  return fetchAPI<MetaResponse>('/v1/meta');
}
