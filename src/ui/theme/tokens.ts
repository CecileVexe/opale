// Copied verbatim from the Opaline design system export (docs/design-system/tokens.ts).
// Do not edit by hand: update the design system, then copy the file again.
// Opale — design tokens (généré depuis tokens.json). Valeurs prêtes pour React Native (Expo).

export const lightColors = {
  bg: '#F8F3FC',
  surface: '#FFFFFF',
  surfaceSunken: '#EFE6F6',
  text: '#2B1B3A',
  textSecondary: '#66587A',
  textDisabled: '#7A6C8E',
  disabledBg: '#E6DDEE',
  line: '#E4D8EF',
  borderStrong: '#8C7BA0',
  accent: '#7A34B3',
  onAccent: '#FFFFFF',
  accentTint: '#EBDDF7',
  orchid: '#CE6BFF',
  success: '#2A7448',
  onSuccess: '#FFFFFF',
  successTint: '#E3F4EA',
  warning: '#B8620A',
  warningFill: '#FFC48C',
  onWarningFill: '#4A2400',
  warningTint: '#FFEBD6',
  warningText: '#8A4100',
  error: '#B3261E',
  onError: '#FFFFFF',
  errorTint: '#FBE3E1',
  errorText: '#9C1F18',
  info: '#3F55B5',
  infoTint: '#DEE4F8',
  period: '#C42B36',
  onPeriod: '#FFFFFF',
  periodTint: '#FBE0E0',
  periodText: '#A8222D',
  intimacy: '#D6479F',
  intimacyTint: '#FBE3F1',
  fertile: '#3F55B5',
  fertileTint: '#DEE4F8',
  ovulation: '#1B7A6B',
  onOvulation: '#FFFFFF',
  ovulationTint: '#E3F5F1',
  chart1: '#7A34B3',
  chart2: '#1B7A6B',
  chart3: '#3F55B5',
  chart4: '#CC6A12',
  chart5: '#D6479F',
  chart6: '#2A8AB5',
  chart7: '#8C7BA0',
} as const;

export const darkColors = {
  bg: '#1A1224',
  surface: '#261A34',
  surfaceSunken: '#31223F',
  text: '#F3EAFB',
  textSecondary: '#C0B0D2',
  textDisabled: '#9A8AB0',
  disabledBg: '#34264A',
  line: '#3A2A4D',
  borderStrong: '#8D7AA6',
  accent: '#CE9BFF',
  onAccent: '#2A0F42',
  accentTint: '#3A2358',
  orchid: '#CE6BFF',
  success: '#7FD6A0',
  onSuccess: '#0E2A1A',
  successTint: '#1E3A2B',
  warning: '#FFB87A',
  warningFill: '#FFB87A',
  onWarningFill: '#3A1D00',
  warningTint: '#3D2A1C',
  warningText: '#FFC48C',
  error: '#FF9A94',
  onError: '#3A0A0A',
  errorTint: '#3F1D22',
  errorText: '#FFB3AE',
  info: '#9FB4F5',
  infoTint: '#26305A',
  period: '#F26B75',
  onPeriod: '#2A0A10',
  periodTint: '#4A222B',
  periodText: '#F7A0A7',
  intimacy: '#F59AD0',
  intimacyTint: '#4A2240',
  fertile: '#9FB4F5',
  fertileTint: '#26305A',
  ovulation: '#7FE0CC',
  onOvulation: '#0F2B26',
  ovulationTint: '#173F3A',
  chart1: '#CE9BFF',
  chart2: '#7FE0CC',
  chart3: '#9FB4F5',
  chart4: '#FFB87A',
  chart5: '#F59AD0',
  chart6: '#7CCBEA',
  chart7: '#B9A9CE',
} as const;

export const colors = { light: lightColors, dark: darkColors } as const;
export type ThemeName = keyof typeof colors;
export type ColorToken = keyof typeof lightColors;

export const spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s8: 32,
  s10: 40,
  s12: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  '2xl': 20,
  sheet: 28,
  pill: 999,
} as const;

export const borderWidth = { hairline: 1, field: 1.5, focus: 2 } as const;

export const size = {
  touch: 44,
  chip: 44,
  field: 52,
  buttonLg: 56,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  nav: 84,
} as const;

// Polices : npx expo install @expo-google-fonts/lexend expo-font — chargez les 4 graisses avant d'afficher l'interface.
export const typography = {
  display: { fontFamily: 'Lexend_600SemiBold', fontSize: 96, lineHeight: 92, letterSpacing: -3.84 },
  displayM: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: -1.12,
  },
  title1: { fontFamily: 'Lexend_600SemiBold', fontSize: 28, lineHeight: 34, letterSpacing: -0.28 },
  title2: { fontFamily: 'Lexend_600SemiBold', fontSize: 20, lineHeight: 26, letterSpacing: 0 },
  title3: { fontFamily: 'Lexend_600SemiBold', fontSize: 18, lineHeight: 24, letterSpacing: 0 },
  body: { fontFamily: 'Lexend_400Regular', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  bodyStrong: { fontFamily: 'Lexend_600SemiBold', fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  label: { fontFamily: 'Lexend_600SemiBold', fontSize: 15, lineHeight: 22, letterSpacing: 0 },
  secondary: { fontFamily: 'Lexend_400Regular', fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  caption: { fontFamily: 'Lexend_500Medium', fontSize: 12, lineHeight: 16, letterSpacing: 0 },
  overline: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.72,
    textTransform: 'uppercase',
  },
} as const;

// Ombres : iOS lit shadow*, Android lit elevation.
export const shadows = {
  light: {
    none: {},
    sheet: {
      shadowColor: '#2B1B3A',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    modal: {
      shadowColor: '#2B1B3A',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.18,
      shadowRadius: 32,
      elevation: 12,
    },
  },
  dark: {
    none: {},
    sheet: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 4,
    },
    modal: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.5,
      shadowRadius: 32,
      elevation: 12,
    },
  },
} as const;

// Mouvement : à passer à Animated / Reanimated. Si useReducedMotion() est vrai, durée 0 et aucun déplacement.
export const motion = {
  duration: { fast: 120, base: 200, slow: 320 },
  easing: { standard: [0.2, 0, 0, 1], enter: [0, 0, 0.2, 1], exit: [0.4, 0, 1, 1] }, // Easing.bezier(...easing.standard)
  opacity: { pressed: 0.85, scrim: 0.45 },
} as const;

export const tokens = {
  colors,
  spacing,
  radius,
  borderWidth,
  size,
  typography,
  shadows,
  motion,
} as const;
export default tokens;
