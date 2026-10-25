import type { ThemeName } from './tokens';

/** Theme chosen in Settings › Appearance (F6). */
export type ThemePreference = 'light' | 'dark' | 'system';

/** Resolves the preference against the phone setting; an unknown phone setting falls back to light. */
export function resolveScheme(
  preference: ThemePreference,
  systemScheme: string | null | undefined,
): ThemeName {
  if (preference !== 'system') return preference;
  return systemScheme === 'dark' ? 'dark' : 'light';
}
