import { createContext } from 'react';

import type { ThemePreference } from './scheme';
import type { colors, shadows, ThemeName } from './tokens';

export interface Theme {
  scheme: ThemeName;
  colors: (typeof colors)[ThemeName];
  shadows: (typeof shadows)[ThemeName];
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<Theme | null>(null);

export default ThemeContext;
