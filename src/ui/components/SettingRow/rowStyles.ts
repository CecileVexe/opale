import { StyleSheet } from 'react-native';

import { size, spacing } from '../../theme/tokens';

export const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    minHeight: size.buttonLg,
    paddingHorizontal: spacing.s4,
    paddingVertical: spacing.s2,
  },
  texts: { flex: 1 },
});
