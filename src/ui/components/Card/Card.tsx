import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { borderWidth, radius, spacing, useTheme } from '../../theme';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hero';
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.s4,
    borderWidth: borderWidth.hairline,
  },
});

const Card = (props: CardProps) => {
  const {
    children,
    variant = 'default',
    onPress,
    disabled = false,
    accessibilityLabel,
    style,
  } = props;

  const { colors } = useTheme();
  const { focusProps, focusStyle } = useFocusRing();

  const surface = [
    styles.card,
    {
      backgroundColor: colors.surface,
      borderColor: colors.line,
      borderRadius: variant === 'hero' ? radius['2xl'] : radius.xl,
    },
    style,
  ];

  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      {...focusProps}
      style={({ pressed }) => [
        surface,
        pressed && { backgroundColor: colors.surfaceSunken },
        focusStyle,
      ]}
    >
      {children}
    </Pressable>
  ) : (
    <View style={surface}>{children}</View>
  );
};

export default Card;
