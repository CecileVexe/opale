import { SvgXml } from 'react-native-svg';

import { size as sizeTokens, useTheme, type ColorToken } from '../theme';
import { symptomIconXml, uiIconXml, type SymptomIconName, type UiIconName } from './xml';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

const ICON_SIZE: Record<IconSize, number> = {
  sm: sizeTokens.iconSm,
  md: sizeTokens.iconMd,
  lg: sizeTokens.iconLg,
  xl: sizeTokens.iconXl,
};

type A11yProps = {
  /**
   * Name read by the screen reader. Leave it out when the icon sits next to its text:
   * the icon is then decorative and hidden from assistive technologies.
   */
  accessibilityLabel?: string;
};

function a11y(accessibilityLabel: string | undefined) {
  return accessibilityLabel
    ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel }
    : { accessible: false, importantForAccessibility: 'no-hide-descendants' as const };
}

type IconProps = A11yProps & {
  name: UiIconName;
  size?: IconSize;
  /** Colour token; by default the text colour, as the icon takes the colour of its text. */
  color?: ColorToken;
};

/** Interface icon (outline). */
export function Icon({ name, size = 'md', color = 'text', accessibilityLabel }: IconProps) {
  const { colors } = useTheme();
  const px = ICON_SIZE[size];
  return (
    <SvgXml
      xml={uiIconXml(name)}
      width={px}
      height={px}
      color={colors[color]}
      {...a11y(accessibilityLabel)}
    />
  );
}

type SymptomIconProps = A11yProps & {
  name: SymptomIconName;
  /** Symptom glyphs use `accent` (SymptomIcons sheet); discharge icons keep their own tones. */
  color?: ColorToken;
};

/** Filled symptom icon, 24 px (the 40 px `accent-tint` disc belongs to the symptom chip). */
export function SymptomIcon({ name, color = 'accent', accessibilityLabel }: SymptomIconProps) {
  const { colors } = useTheme();
  return (
    <SvgXml
      xml={symptomIconXml(name)}
      width={sizeTokens.iconLg}
      height={sizeTokens.iconLg}
      color={colors[color]}
      {...a11y(accessibilityLabel)}
    />
  );
}
