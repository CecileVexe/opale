import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  type TextStyle,
} from 'react-native';

import { useTheme, type ColorToken } from '../../theme';
import { FONT_SCALE_CAP, textStyles, type TextVariant } from './textStyles';

export interface TextProps extends Omit<NativeTextProps, 'allowFontScaling'> {
  variant?: TextVariant;
  color?: ColorToken;
  align?: TextStyle['textAlign'];
  tabular?: boolean;
}

const TABULAR: TextStyle = { fontVariant: ['tabular-nums'] };

const Text = (props: TextProps) => {
  const {
    variant = 'body',
    color = 'text',
    align,
    tabular = false,
    style,
    maxFontSizeMultiplier,
    ...rest
  } = props;

  const { colors } = useTheme();

  return (
    <NativeText
      {...rest}
      allowFontScaling
      maxFontSizeMultiplier={maxFontSizeMultiplier ?? FONT_SCALE_CAP[variant]}
      style={[
        textStyles[variant],
        { color: colors[color] },
        align ? { textAlign: align } : null,
        tabular ? TABULAR : null,
        style,
      ]}
    />
  );
};

export default Text;
