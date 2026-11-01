/**
 * @jest-environment node
 */
import { countRule, lintCases } from './helpers';

const HEADER =
  `import { Text } from 'react-native';\n` +
  `declare const Button: (p: Record<string, unknown>) => null;\n` +
  `declare const t: (key: string) => string;\n`;

const JSX_SNIPPETS = {
  plainText: `<Text>Bonjour</Text>`,
  stringChild: `<Text>{'Règles prévues'}</Text>`,
  templateChild: '<Text>{`Jour ${3}`}</Text>',
  literalProps: `<Button label="Enregistrer" accessibilityLabel={'Retour'} />`,
  translated: `<Text>{t('home.title')} · {3} – {'%'}<Button variant="primary" label={t('common.save')} /></Text>`,
};

describe('no hard-coded UI text', () => {
  const keys = Object.keys(JSX_SNIPPETS) as (keyof typeof JSX_SNIPPETS)[];
  const results = lintCases(
    keys.map((key) => ({
      filePath: 'src/ui/Sample.tsx',
      code: `${HEADER}export const A = () => ${JSX_SNIPPETS[key]};\n`,
    })),
  );
  const violations = (key: keyof typeof JSX_SNIPPETS) => {
    const messages = results[keys.indexOf(key)] ?? [];
    return countRule(messages, 'no-restricted-syntax');
  };

  it('rejects plain JSX text', () => {
    expect(violations('plainText')).toBe(1);
  });

  it('rejects string literals and template literals as JSX children', () => {
    expect(violations('stringChild')).toBe(1);
    expect(violations('templateChild')).toBe(1);
  });

  it('rejects literal strings in user-facing props', () => {
    expect(violations('literalProps')).toBe(2);
  });

  it('accepts translated text, numbers, punctuation and non-text props', () => {
    expect(violations('translated')).toBe(0);
  });
});
