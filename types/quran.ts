export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda?: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs?: Ayah[];
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction?: string;
}

export interface QuranResponse {
  code: number;
  status: string;
  data: {
    surahs: Surah[];
    edition: Edition;
  };
}

export interface SurahResponse {
  code: number;
  status: string;
  data: Surah & { edition: Edition };
}

export interface AyahResponse {
  code: number;
  status: string;
  data: Ayah & { surah: Surah; edition: Edition };
}

export interface EditionsResponse {
  code: number;
  status: string;
  data: Edition[];
}

export interface JuzResponse {
  code: number;
  status: string;
  data: {
    number: number;
    ayahs: Ayah[];
    surahs: { [key: string]: Surah };
    edition: Edition;
  };
}

export interface SearchResponse {
  code: number;
  status: string;
  data: {
    count: number;
    matches: Array<{
      number: number;
      text: string;
      edition: Edition;
      surah: Surah;
      numberInSurah: number;
    }>;
  };
}

export interface MetaData {
  surahs: {
    count: number;
    references: Surah[];
  };
  ayahs: {
    count: number;
  };
  pages: {
    count: number;
  };
  manzils: {
    count: number;
    references: Array<{ index: number; start: string; end: string }>;
  };
  rukus: {
    count: number;
    references: Array<{ index: number; start: string; end: string }>;
  };
  hizbQuarters: {
    count: number;
    references: Array<{ index: number; start: string; end: string }>;
  };
  juzs: {
    count: number;
    references: Array<{ index: number; start: string; end: string }>;
  };
  sajdas: {
    count: number;
    references: Array<{ index: number; ayah: number; surah: number; recommended: boolean }>;
  };
}

export interface MetaResponse {
  code: number;
  status: string;
  data: MetaData;
}

export interface SajdaResponse {
  code: number;
  status: string;
  data: {
    ayahs: Ayah[];
    edition: Edition;
  };
}
