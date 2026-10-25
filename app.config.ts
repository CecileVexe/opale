import { ConfigContext, ExpoConfig } from 'expo/config';

// Must match the identifiers registered with Google Cloud and Apple.
const APP_ID = 'com.cecilevalente.opale';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Opale',
  slug: 'opale',
  scheme: 'opale',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  // Light, dark or system theme is chosen in the app.
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: APP_ID,
    supportsTablet: true,
  },
  android: {
    package: APP_ID,
    // Health data must never leave the phone through Android auto-backup.
    allowBackup: false,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    'expo-dev-client',
    'expo-font',
    [
      'expo-splash-screen',
      {
        // Opaline `bg` token (light / dark): app config cannot import src/ without tsx.
        backgroundColor: '#F8F3FC',
        image: './assets/splash-icon.png',
        imageWidth: 120,
        dark: { backgroundColor: '#1A1224', image: './assets/splash-icon.png' },
      },
    ],
  ],
});
