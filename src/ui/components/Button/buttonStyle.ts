import type { ColorToken } from '../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger';

export type ButtonState = { pressed: boolean; disabled: boolean };

export type ButtonPalette = {
  background: ColorToken | null;
  border: ColorToken | null;
  content: ColorToken;
};

export function buttonPalette(variant: ButtonVariant, { pressed, disabled }: ButtonState) {
  if (disabled) {
    const palette: ButtonPalette =
      variant === 'text'
        ? { background: null, border: null, content: 'textDisabled' }
        : { background: 'disabledBg', border: null, content: 'textDisabled' };
    return palette;
  }

  const palettes: Record<ButtonVariant, ButtonPalette> = {
    primary: { background: 'accent', border: null, content: 'onAccent' },
    danger: { background: 'error', border: null, content: 'onError' },
    secondary: { background: pressed ? 'accentTint' : null, border: 'accent', content: 'accent' },
    text: { background: pressed ? 'accentTint' : null, border: null, content: 'accent' },
  };
  return palettes[variant];
}
