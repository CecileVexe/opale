import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  useFonts,
} from '@expo-google-fonts/lexend';

// The keys are the fontFamily names used by the typography tokens.
const LEXEND = { Lexend_400Regular, Lexend_500Medium, Lexend_600SemiBold, Lexend_700Bold };

/** Loads the four Lexend weights. Returns true once they are ready (or failed: system font fallback). */
export function useOpaleFonts(): boolean {
  const [loaded, error] = useFonts(LEXEND);
  return loaded || error !== null;
}
