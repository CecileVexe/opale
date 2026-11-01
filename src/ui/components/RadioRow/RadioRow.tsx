import { Pressable, StyleSheet, View } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { Icon, type UiIconName } from '../../icons';
import { borderWidth, radius, size, useTheme } from '../../theme';
import { rowStyles } from '../SettingRow';
import Text from '../Text';

export interface RadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  description?: string;
  icon?: UiIconName;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  mark: {
    width: size.iconLg,
    height: size.iconLg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borderWidth.field,
    borderRadius: radius.pill,
  },
});

const RadioRow = (props: RadioRowProps) => {
  const { label, selected, onPress, description, icon, disabled = false } = props;

  const { colors } = useTheme();
  const { focusProps, focusStyle } = useFocusRing(true);
  const markBorder = disabled ? colors.disabledBg : selected ? colors.accent : colors.borderStrong;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      {...focusProps}
      style={({ pressed }) => [
        rowStyles.row,
        pressed && { backgroundColor: colors.surfaceSunken },
        focusStyle,
      ]}
    >
      {icon ? <Icon name={icon} size="lg" color={disabled ? 'textDisabled' : 'accent'} /> : null}
      <View style={rowStyles.texts}>
        <Text
          variant={selected ? 'bodyStrong' : 'bodyMedium'}
          color={disabled ? 'textDisabled' : 'text'}
        >
          {label}
        </Text>
        {description ? (
          <Text variant="secondary" color="textSecondary">
            {description}
          </Text>
        ) : null}
      </View>
      <View
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.mark,
          { backgroundColor: selected ? colors.accent : 'transparent', borderColor: markBorder },
        ]}
      >
        {selected ? <Icon name="check" size="sm" color="onAccent" /> : null}
      </View>
    </Pressable>
  );
};

export default RadioRow;
