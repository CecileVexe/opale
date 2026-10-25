import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

import { ThemeProvider, useOpaleFonts, useTheme } from './src/ui/theme';

// Keep the splash screen until Lexend is loaded, so the UI never renders with the wrong font.
SplashScreen.preventAutoHideAsync();

function Root() {
  const { colors, scheme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

// Temporary root: expo-router takes over in step 1.8.
export default function App() {
  const fontsReady = useOpaleFonts();

  useEffect(() => {
    if (fontsReady) SplashScreen.hide();
  }, [fontsReady]);

  if (!fontsReady) return null;

  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
