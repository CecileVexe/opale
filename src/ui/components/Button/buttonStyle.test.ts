import { contrastRatio } from '../../theme/contrast';
import { colors, type ColorToken, type ThemeName } from '../../theme/tokens';
import { buttonPalette, type ButtonVariant } from './buttonStyle';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'text', 'danger'];
const THEMES: ThemeName[] = ['light', 'dark'];

function contrastOf(theme: ThemeName, foreground: ColorToken, background: ColorToken): number {
  return contrastRatio(colors[theme][foreground], colors[theme][background]);
}

describe('button palette', () => {
  it('fills primary and danger, outlines secondary, leaves text bare', () => {
    expect(buttonPalette('primary', { pressed: false, disabled: false })).toEqual({
      background: 'accent',
      border: null,
      content: 'onAccent',
    });
    expect(buttonPalette('danger', { pressed: false, disabled: false }).background).toBe('error');
    expect(buttonPalette('secondary', { pressed: false, disabled: false })).toEqual({
      background: null,
      border: 'accent',
      content: 'accent',
    });
    expect(buttonPalette('text', { pressed: false, disabled: false })).toEqual({
      background: null,
      border: null,
      content: 'accent',
    });
  });

  it('tints secondary and text buttons while pressed', () => {
    expect(buttonPalette('secondary', { pressed: true, disabled: false }).background).toBe(
      'accentTint',
    );
    expect(buttonPalette('text', { pressed: true, disabled: false }).background).toBe('accentTint');
    expect(buttonPalette('primary', { pressed: true, disabled: false }).background).toBe('accent');
  });

  it('greys out every variant when disabled, even when pressed', () => {
    for (const variant of VARIANTS) {
      const palette = buttonPalette(variant, { pressed: true, disabled: true });
      expect(palette.content).toBe('textDisabled');
      expect(palette.border).toBeNull();
      expect(palette.background).toBe(variant === 'text' ? null : 'disabledBg');
    }
  });

  it('keeps 4.5:1 for the label of every enabled button, in both themes', () => {
    for (const theme of THEMES) {
      expect(contrastOf(theme, 'onAccent', 'accent')).toBeGreaterThanOrEqual(4.5);
      expect(contrastOf(theme, 'onError', 'error')).toBeGreaterThanOrEqual(4.5);
      for (const surface of ['bg', 'surface', 'accentTint'] as const) {
        expect(contrastOf(theme, 'accent', surface)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it('keeps 3:1 for a disabled label, which the design system exempts from 4.5:1', () => {
    for (const theme of THEMES) {
      expect(contrastOf(theme, 'textDisabled', 'disabledBg')).toBeGreaterThanOrEqual(3);
    }
  });
});
