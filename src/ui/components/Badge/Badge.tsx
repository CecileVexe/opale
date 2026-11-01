import { StyleSheet, View } from 'react-native';

import { radius, size, spacing, useTheme } from '../../theme';
import Text from '../Text';

export interface BadgeProps {
  value: string | number;
}

const styles = StyleSheet.create({
  badge: {
    minWidth: size.iconLg,
    minHeight: size.iconLg,
    paddingHorizontal: spacing.s1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
});

const Badge = (props: BadgeProps) => {
  const { value } = props;

  const { colors } = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: colors.accent }]}>
      <Text variant="label" color="onAccent" align="center" tabular>
        {value}
      </Text>
    </View>
  );
};

export default Badge;
