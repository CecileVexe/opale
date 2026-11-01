import { FONT_SCALE_CAP, NAV_FONT_SCALE_CAP, textStyles, type TextVariant } from './textStyles';

const VARIANTS = Object.keys(textStyles) as TextVariant[];
const LOADED_FAMILIES = [
  'Lexend_400Regular',
  'Lexend_500Medium',
  'Lexend_600SemiBold',
  'Lexend_700Bold',
];

describe('text styles', () => {
  it('never go under 12 px', () => {
    for (const variant of VARIANTS) {
      expect(textStyles[variant].fontSize).toBeGreaterThanOrEqual(12);
    }
  });

  it('only use the Lexend weights that are loaded at startup', () => {
    for (const variant of VARIANTS) {
      expect(LOADED_FAMILIES).toContain(textStyles[variant].fontFamily);
    }
  });

  it('keep at least 1.3 times the size as line height for reading text', () => {
    const reading: TextVariant[] = ['body', 'bodyMedium', 'bodyStrong', 'label', 'secondary'];
    for (const variant of reading) {
      const { fontSize = 0, lineHeight = 0 } = textStyles[variant];
      expect(lineHeight / fontSize).toBeGreaterThanOrEqual(1.3);
    }
  });

  it('adds a medium weight of the body style, for row labels', () => {
    expect(textStyles.bodyMedium.fontSize).toBe(textStyles.body.fontSize);
    expect(textStyles.bodyMedium.fontFamily).toBe('Lexend_500Medium');
  });

  it('caps only the two big numbers, and the navigation bar is capped lower', () => {
    expect(Object.keys(FONT_SCALE_CAP).sort()).toEqual(['display', 'displayM']);
    expect(FONT_SCALE_CAP.display).toBe(1.5);
    expect(NAV_FONT_SCALE_CAP).toBe(1.3);
  });
});
