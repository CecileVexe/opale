import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { resolveScheme, type ThemePreference } from './scheme';
import { colors, shadows, type ThemeName } from './tokens';

export type Theme = {
  scheme: ThemeName;
  colors: (typeof colors)[ThemeName];
  shadows: (typeof shadows)[ThemeName];
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<Theme | null>(null);

type Props = {
  /** Stored preference; persisted with the profile from phase 2 on. */
  initialPreference?: ThemePreference;
  children: ReactNode;
};

export function ThemeProvider({ initialPreference = 'system', children }: Props) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);
  const scheme = resolveScheme(preference, systemScheme);

  const theme = useMemo<Theme>(
    () => ({
      scheme,
      colors: colors[scheme],
      shadows: shadows[scheme],
      preference,
      setPreference,
    }),
    [scheme, preference],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used inside <ThemeProvider>');
  return theme;
}
