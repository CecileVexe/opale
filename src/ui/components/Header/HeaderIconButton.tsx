import { Pressable, StyleSheet } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { Icon, type UiIconName } from '../../icons';
import { borderWidth, motion, radius, size, useTheme } from '../../theme';

export interface HeaderIconButtonProps {
  icon: UiIconName;
  label: string;
  onPress: () => void;
  boxed?: boolean;
}

const styles = StyleSheet.create({
  iconButton: {
    width: size.touch,
    height: size.touch,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HeaderIconButton = (props: HeaderIconButtonProps) => {
  const { icon, label, onPress, boxed = false } = props;

  const { colors } = useTheme();
  const { focusProps, focusStyle } = useFocusRing();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      {...focusProps}
      style={({ pressed }) => [
        styles.iconButton,
        boxed && {
          backgroundColor: colors.surface,
          borderColor: colors.line,
          borderWidth: borderWidth.hairline,
          borderRadius: radius.md,
        },
        pressed && { opacity: motion.opacity.pressed },
        focusStyle,
      ]}
    >
      <Icon name={icon} size="lg" color="text" />
    </Pressable>
  );
};

export default HeaderIconButton;
