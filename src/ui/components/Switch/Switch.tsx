import { Pressable, StyleSheet } from 'react-native';

import { useFocusRing } from '../../hooks/useFocusRing';
import { radius, size } from '../../theme';
import SwitchVisual from './SwitchVisual';

export interface SwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  hit: {
    minWidth: size.touch,
    minHeight: size.touch,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
});

// `label` is read by the screen reader only: the visible label belongs to the row around.
const Switch = (props: SwitchProps) => {
  const { label, value, onValueChange, disabled = false } = props;

  const { focusProps, focusStyle } = useFocusRing();

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      {...focusProps}
      style={[styles.hit, focusStyle]}
    >
      <SwitchVisual checked={value} disabled={disabled} />
    </Pressable>
  );
};

export default Switch;
