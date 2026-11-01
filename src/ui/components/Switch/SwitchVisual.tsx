import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Icon } from '../../icons';
import { borderWidth, motion, radius, useTheme } from '../../theme';
import { SWITCH_THUMB, SWITCH_TRACK, THUMB_INSET, THUMB_TRAVEL } from './switchGeometry';

export interface SwitchVisualProps {
  checked: boolean;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  track: {
    width: SWITCH_TRACK.width,
    height: SWITCH_TRACK.height,
    borderWidth: borderWidth.field,
    borderRadius: radius.pill,
  },
  thumb: {
    position: 'absolute',
    top: THUMB_INSET,
    left: THUMB_INSET,
    width: SWITCH_THUMB,
    height: SWITCH_THUMB,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
});

// Look of the switch only: the control that wraps it carries the role and the state.
const SwitchVisual = (props: SwitchVisualProps) => {
  const { checked, disabled = false } = props;

  const { colors } = useTheme();
  const reduceMotion = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(checked ? 1 : 0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: checked ? 1 : 0,
      duration: reduceMotion ? 0 : motion.duration.fast,
      easing: Easing.bezier(...motion.easing.standard),
      useNativeDriver: true,
    }).start();
  }, [checked, reduceMotion, progress]);

  const trackColor = disabled ? colors.disabledBg : checked ? colors.accent : colors.surfaceSunken;
  const borderColor = disabled ? colors.disabledBg : checked ? colors.accent : colors.borderStrong;
  const thumbColor = disabled
    ? colors.textDisabled
    : checked
      ? colors.onAccent
      : colors.textSecondary;
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, THUMB_TRAVEL] });

  return (
    <View
      importantForAccessibility="no-hide-descendants"
      style={[styles.track, { backgroundColor: trackColor, borderColor }]}
    >
      <Animated.View
        style={[styles.thumb, { backgroundColor: thumbColor, transform: [{ translateX }] }]}
      >
        {checked ? (
          <Icon name="check" size="sm" color={disabled ? 'disabledBg' : 'accent'} />
        ) : null}
      </Animated.View>
    </View>
  );
};

export default SwitchVisual;
