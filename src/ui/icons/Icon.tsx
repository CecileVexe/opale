import { SvgXml } from 'react-native-svg';

import { size as sizeTokens, useTheme, type ColorToken } from '../theme';
import { iconAccessibility } from './iconA11y';
import { uiIconXml, type UiIconName } from './xml';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  name: UiIconName;
  size?: IconSize;
  color?: ColorToken;
  accessibilityLabel?: string;
}

const ICON_SIZE: Record<IconSize, number> = {
  sm: sizeTokens.iconSm,
  md: sizeTokens.iconMd,
  lg: sizeTokens.iconLg,
  xl: sizeTokens.iconXl,
};

const Icon = (props: IconProps) => {
  const { name, size = 'md', color = 'text', accessibilityLabel } = props;

  const { colors } = useTheme();
  const px = ICON_SIZE[size];

  return (
    <SvgXml
      xml={uiIconXml(name)}
      width={px}
      height={px}
      color={colors[color]}
      {...iconAccessibility(accessibilityLabel)}
    />
  );
};

export default Icon;
