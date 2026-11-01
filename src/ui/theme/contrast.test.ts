import { contrastRatio } from './contrast';
import { colors, type ColorToken } from './tokens';

describe('contrastRatio', () => {
  it('is 21 between black and white, whatever the order', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 5);
  });

  it('is 1 between identical colours', () => {
    expect(contrastRatio('#7A34B3', '#7A34B3')).toBeCloseTo(1, 5);
  });

  it('rejects anything that is not a #RRGGBB colour', () => {
    expect(() => contrastRatio('red', '#FFFFFF')).toThrow(RangeError);
    expect(() => contrastRatio('#FFF', '#FFFFFF')).toThrow(RangeError);
  });

  it('reproduces the ratios measured in the design system', () => {
    const measured: [ColorToken, ColorToken, number, number][] = [
      ['text', 'bg', 14.6, 15.5],
      ['accent', 'bg', 6.5, 8.4],
      ['onAccent', 'accent', 7.1, 7.8],
      ['onError', 'error', 6.5, 8.4],
      ['textDisabled', 'disabledBg', 3.7, 4.4],
    ];
    for (const [foreground, background, light, dark] of measured) {
      expect(
        Math.abs(contrastRatio(colors.light[foreground], colors.light[background]) - light),
      ).toBeLessThan(0.1);
      expect(
        Math.abs(contrastRatio(colors.dark[foreground], colors.dark[background]) - dark),
      ).toBeLessThan(0.1);
    }
  });
});
