import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { initI18n } from './src/i18n';
import { ThemeProvider, useOpaleFonts, useTheme } from './src/ui/theme';

SplashScreen.preventAutoHideAsync();
const i18nInit = initI18n();

function Root() {
  const { colors, scheme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  const fontsReady = useOpaleFonts();
  const [i18nReady, setI18nReady] = useState(false);
  const ready = fontsReady && i18nReady;

  useEffect(() => {
    i18nInit.finally(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (ready) SplashScreen.hide();
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
