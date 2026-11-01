import { useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { resolveScheme, type ThemePreference } from './scheme';
import ThemeContext, { type Theme } from './ThemeContext';
import { colors, shadows } from './tokens';

interface ThemeProviderProps {
  initialPreference?: ThemePreference;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialPreference = 'system', children } = props;

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
};

export default ThemeProvider;
