import { Pressable, StyleSheet, View } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { Icon } from '../../icons';
import { borderWidth, radius, size, spacing, useTheme } from '../../theme';
import Text from '../Text';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

const BOX_SIZE = size.iconLg;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.s3,
    minHeight: size.touch,
    paddingVertical: (size.touch - BOX_SIZE) / 2,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  label: { flex: 1 },
  error: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.s2,
    paddingLeft: BOX_SIZE + spacing.s3,
  },
});

const Checkbox = (props: CheckboxProps) => {
  const { label, checked, onValueChange, error, disabled = false } = props;

  const { colors } = useTheme();
  const { focusProps, focusStyle } = useFocusRing();
  const hasError = Boolean(error);
  const boxBorder = disabled
    ? colors.disabledBg
    : hasError
      ? colors.error
      : checked
        ? colors.accent
        : colors.borderStrong;
  const boxFill = disabled ? colors.disabledBg : checked ? colors.accent : colors.surface;

  return (
    <View>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityHint={error}
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={() => onValueChange(!checked)}
        {...focusProps}
        style={[styles.row, focusStyle]}
      >
        <View
          importantForAccessibility="no-hide-descendants"
          style={[
            styles.box,
            {
              backgroundColor: boxFill,
              borderColor: boxBorder,
              borderWidth: hasError ? borderWidth.focus : borderWidth.field,
            },
          ]}
        >
          {checked ? (
            <Icon name="check" size="sm" color={disabled ? 'textDisabled' : 'onAccent'} />
          ) : null}
        </View>
        <Text variant="body" color={disabled ? 'textDisabled' : 'text'} style={styles.label}>
          {label}
        </Text>
      </Pressable>
      {error ? (
        <View style={styles.error}>
          <Icon name="alert" size="sm" color="errorText" />
          <Text variant="secondary" color="errorText" style={styles.label}>
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Checkbox;
