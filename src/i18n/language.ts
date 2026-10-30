export const LANGUAGES = ['fr', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'fr';

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

export function resolveLanguage(
  preference: Language | null | undefined,
  deviceLanguageCodes: readonly (string | null)[],
): Language {
  if (preference) return preference;
  return deviceLanguageCodes.find(isLanguage) ?? DEFAULT_LANGUAGE;
}
