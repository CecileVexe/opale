import { Children, Fragment, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { borderWidth, radius, spacing, useTheme } from '../../theme';
import Text from '../Text';

export interface SettingGroupProps {
  title?: string;
  role?: 'list' | 'radiogroup';
  children: ReactNode;
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: borderWidth.hairline,
    borderRadius: radius.xl,
  },
  band: {
    paddingHorizontal: spacing.s4,
    paddingVertical: spacing.s2,
  },
  separator: { height: borderWidth.hairline },
});

const SettingGroup = (props: SettingGroupProps) => {
  const { title, role, children } = props;

  const { colors } = useTheme();
  const rows = Children.toArray(children);

  return (
    <View
      accessibilityRole={role}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}
    >
      {title ? (
        <View style={[styles.band, { backgroundColor: colors.surfaceSunken }]}>
          <Text variant="overline" color="textSecondary" accessibilityRole="header">
            {title}
          </Text>
        </View>
      ) : null}
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 ? <View style={[styles.separator, { backgroundColor: colors.line }]} /> : null}
          {row}
        </Fragment>
      ))}
    </View>
  );
};

export default SettingGroup;
