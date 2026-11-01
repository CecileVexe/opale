import { SvgXml } from 'react-native-svg';

import { size, useTheme, type ColorToken } from '../theme';
import { iconAccessibility } from './iconA11y';
import { symptomIconXml, type SymptomIconName } from './xml';

export interface SymptomIconProps {
  name: SymptomIconName;
  color?: ColorToken;
  accessibilityLabel?: string;
}

const SymptomIcon = (props: SymptomIconProps) => {
  const { name, color = 'accent', accessibilityLabel } = props;

  const { colors } = useTheme();

  return (
    <SvgXml
      xml={symptomIconXml(name)}
      width={size.iconLg}
      height={size.iconLg}
      color={colors[color]}
      {...iconAccessibility(accessibilityLabel)}
    />
  );
};

export default SymptomIcon;
