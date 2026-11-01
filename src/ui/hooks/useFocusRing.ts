import { useState } from 'react';
import type { ViewStyle } from 'react-native';

import { borderWidth, useTheme } from '../theme';

const FOCUS_OFFSET = 2;

// 2 px `accent` ring, offset by 2 px; `inset` draws it inside, for rows clipped by their card.
export function useFocusRing(inset = false) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const focusProps = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
  const focusStyle: ViewStyle | null = focused
    ? {
        outlineStyle: 'solid',
        outlineWidth: borderWidth.focus,
        outlineColor: colors.accent,
        outlineOffset: inset ? -borderWidth.focus : FOCUS_OFFSET,
      }
    : null;

  return { focusProps, focusStyle };
}
