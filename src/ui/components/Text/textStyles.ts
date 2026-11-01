import type { TextStyle } from 'react-native';

import { typography } from '../../theme/tokens';

export type TextVariant = keyof typeof typography | 'bodyMedium';

export const textStyles: Record<TextVariant, TextStyle> = {
  ...typography,
  bodyMedium: { ...typography.body, fontFamily: 'Lexend_500Medium' },
};

export const FONT_SCALE_CAP: Partial<Record<TextVariant, number>> = {
  display: 1.5,
  displayM: 1.5,
};

export const NAV_FONT_SCALE_CAP = 1.3;
