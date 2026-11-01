import { Pressable, StyleSheet } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { Icon, type UiIconName } from '../../icons';
import { borderWidth, motion, radius, size, spacing, useTheme } from '../../theme';
import Text from '../Text';
import { buttonPalette, type ButtonVariant } from './buttonStyle';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  icon?: UiIconName;
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    minHeight: size.field,
    paddingHorizontal: spacing.s5,
    borderWidth: borderWidth.field,
    borderRadius: radius.lg,
  },
  bare: {
    minHeight: size.touch,
    paddingHorizontal: spacing.s3,
  },
  fullWidth: { alignSelf: 'stretch' },
  hug: { alignSelf: 'flex-start' },
  label: { flexShrink: 1 },
});

const Button = (props: ButtonProps) => {
  const { label, onPress, variant = 'primary', disabled = false, icon, fullWidth = false } = props;

  const { colors } = useTheme();
  const { focusProps, focusStyle } = useFocusRing();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      {...focusProps}
      style={({ pressed }) => {
        const palette = buttonPalette(variant, { pressed, disabled });
        return [
          styles.base,
          variant === 'text' && styles.bare,
          fullWidth ? styles.fullWidth : styles.hug,
          {
            backgroundColor: palette.background ? colors[palette.background] : 'transparent',
            borderColor: palette.border ? colors[palette.border] : 'transparent',
            opacity: pressed ? motion.opacity.pressed : 1,
          },
          focusStyle,
        ];
      }}
    >
      {({ pressed }) => {
        const { content } = buttonPalette(variant, { pressed, disabled });
        return (
          <>
            {icon ? <Icon name={icon} size="md" color={content} /> : null}
            <Text variant="label" color={content} align="center" style={styles.label}>
              {label}
            </Text>
          </>
        );
      }}
    </Pressable>
  );
};

export default Button;
