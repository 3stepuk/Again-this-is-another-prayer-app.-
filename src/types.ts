export type HourType =
  | 'invitatory'
  | 'readings'
  | 'lauds'
  | 'terce'
  | 'sext'
  | 'none'
  | 'vespers'
  | 'compline';

export type LiturgicalSeason = 'Ordinary Time' | 'Advent' | 'Christmas' | 'Lent' | 'Easter';

export type LiturgicalColor = 'green' | 'purple' | 'white' | 'red' | 'rose';

export type DisplayTheme = 'autumn_dark' | 'candlelight' | 'monastery' | 'parchment';

export type FontStyle = 'serif' | 'sans' | 'cinzel';

export type LanguageMode = 'english' | 'latin' | 'bilingual';

export interface BilingualText {
  en: string;
  la: string;
}

export interface PsalmItem {
  id: string;
  title: string;
  subtitle?: string;
  antiphon: BilingualText;
  verses: BilingualText[];
  gloriaPatri: BilingualText;
}

export interface CanticleItem extends PsalmItem {
  type: 'OT' | 'NT' | 'Gospel';
  source?: string;
}

export interface ScriptureReading {
  citation: string;
  title?: string;
  text: BilingualText;
  responsory?: {
    versicle: BilingualText;
    response: BilingualText;
  };
}

export interface PatristicReading {
  author: string;
  work: string;
  title: string;
  text: BilingualText;
  responsory?: {
    versicle: BilingualText;
    response: BilingualText;
  };
}

export interface IntercessionItem {
  refrain: BilingualText;
  petitions: BilingualText[];
}

export interface MarianAntiphon {
  name: string;
  season: string;
  antiphon: BilingualText;
  versicle?: BilingualText;
  response?: BilingualText;
  prayer: BilingualText;
}

export interface OfficeData {
  hour: HourType;
  title: string;
  latinTitle: string;
  recommendedTime: string;
  invitatoryAntiphon?: BilingualText;
  invitatoryPsalm?: PsalmItem;
  hymn: {
    title: string;
    text: BilingualText;
  };
  psalms: PsalmItem[];
  scripture: ScriptureReading;
  patristicReading?: PatristicReading;
  gospelCanticle?: CanticleItem;
  intercessions?: IntercessionItem;
  lordsPrayer: BilingualText;
  concludingPrayer: BilingualText;
  marianAntiphon?: MarianAntiphon;
}

export interface LiturgicalDay {
  dateString: string; // YYYY-MM-DD
  dayOfWeek: string;
  liturgicalTitle: string;
  season: LiturgicalSeason;
  weekOfPsalter: 1 | 2 | 3 | 4;
  color: LiturgicalColor;
  rank: 'Weekday' | 'Memorial' | 'Feast' | 'Solemnity';
  saintName?: string;
}

export interface UserPreferences {
  theme: DisplayTheme;
  fontStyle: FontStyle;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  languageMode: LanguageMode;
  showRubrics: boolean;
  autoScrollSpeed: number; // 0 = off, 1-5
  ambientSound: 'none' | 'organ_drone' | 'gregorian_bell';
  ttsVoiceRate: number;
}

export interface Bookmark {
  id: string;
  date: string;
  hour: HourType;
  title: string;
  snippet: string;
  createdAt: string;
}

export interface Intention {
  id: string;
  text: string;
  category: 'family' | 'church' | 'world' | 'personal' | 'sick';
  createdAt: string;
}
