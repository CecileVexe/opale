import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { initI18n } from './src/i18n';
import AppRoot from './src/ui/AppRoot';
import { ThemeProvider, useOpaleFonts } from './src/ui/theme';

SplashScreen.preventAutoHideAsync();
const i18nInit = initI18n();

const App = () => {
  const fontsReady = useOpaleFonts();
  const [i18nReady, setI18nReady] = useState(false);
  const ready = fontsReady && i18nReady;

  useEffect(() => {
    i18nInit.finally(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (ready) SplashScreen.hide();
  }, [ready]);

  return ready ? (
    <ThemeProvider>
      <AppRoot />
    </ThemeProvider>
  ) : null;
};

export default App;
