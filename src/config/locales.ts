export enum Locale {
  BG = 'bg',
  EN = 'en',
  RU = 'ru',
  UK = 'uk',
}

export const DEFAULT_LOCALE = Locale.BG;

export const locales = [Locale.BG, Locale.EN, Locale.RU, Locale.UK] as const;

export type LocaleCode = (typeof locales)[number];
