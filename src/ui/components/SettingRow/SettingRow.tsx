import { Pressable, StyleSheet, View } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { Icon, type UiIconName } from '../../icons';
import { useTheme, type ColorToken } from '../../theme';
import Badge from '../Badge';
import { SwitchVisual } from '../Switch';
import Text from '../Text';
import { resolveRow, type SettingRowKind } from './rowKind';
import { rowStyles } from './rowStyles';

export interface SettingRowProps {
  label: string;
  icon?: UiIconName;
  description?: string;
  kind?: SettingRowKind;
  value?: string;
  badge?: string | number;
  checked?: boolean;
  onPress?: () => void;
  onValueChange?: (checked: boolean) => void;
  destructive?: boolean;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  value: { flexShrink: 1, maxWidth: '50%' },
});

const SettingRow = (props: SettingRowProps) => {
  const {
    label,
    icon,
    description,
    kind,
    value,
    badge,
    checked = false,
    onPress,
    onValueChange,
    destructive = false,
    disabled = false,
  } = props;

  const { colors } = useTheme();
  const { focusProps, focusStyle } = useFocusRing(true);
  const row = resolveRow(kind, onPress !== undefined);
  const labelColor: ColorToken = destructive ? 'errorText' : 'text';
  const iconColor: ColorToken = destructive ? 'errorText' : 'accent';

  const content = (
    <>
      {icon ? <Icon name={icon} size="lg" color={iconColor} /> : null}
      <View style={rowStyles.texts}>
        <Text variant="bodyMedium" color={labelColor}>
          {label}
        </Text>
        {description ? (
          <Text variant="secondary" color="textSecondary">
            {description}
          </Text>
        ) : null}
      </View>
      {value !== undefined ? (
        <Text variant="body" color="textSecondary" align="right" style={styles.value}>
          {value}
        </Text>
      ) : null}
      {badge !== undefined ? <Badge value={badge} /> : null}
      {row.kind === 'switch' ? <SwitchVisual checked={checked} disabled={disabled} /> : null}
      {row.chevron ? <Icon name="chevron-right" size="md" color="textSecondary" /> : null}
    </>
  );

  return row.interactive ? (
    <Pressable
      accessibilityRole={row.role}
      accessibilityState={row.kind === 'switch' ? { checked, disabled } : { disabled }}
      disabled={disabled}
      onPress={row.kind === 'switch' ? () => onValueChange?.(!checked) : onPress}
      {...focusProps}
      style={({ pressed }) => [
        rowStyles.row,
        pressed && { backgroundColor: colors.surfaceSunken },
        focusStyle,
      ]}
    >
      {content}
    </Pressable>
  ) : (
    <View style={rowStyles.row}>{content}</View>
  );
};

export default SettingRow;
