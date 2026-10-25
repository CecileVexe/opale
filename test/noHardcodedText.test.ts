/**
 * @jest-environment node
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';

// Guards principle 5 (no hard-coded UI text): the ESLint config must reject literal UI strings.
// ESLint runs in a child process, exactly as `npm run lint` does.
const ROOT = path.resolve(__dirname, '..');
const ESLINT_BIN = path.join(ROOT, 'node_modules', 'eslint', 'bin', 'eslint.js');
const HEADER =
  `import { Text } from 'react-native';\n` +
  `declare const Button: (p: Record<string, unknown>) => null;\n` +
  `declare const t: (key: string) => string;\n`;

type LintMessage = { ruleId: string | null };

function textViolations(jsx: string): number {
  const run = spawnSync(
    process.execPath,
    [ESLINT_BIN, '--stdin', '--stdin-filename', 'src/ui/Sample.tsx', '--format', 'json'],
    { cwd: ROOT, input: `${HEADER}export const A = () => ${jsx};\n`, encoding: 'utf8' },
  );
  const [result] = JSON.parse(run.stdout) as { messages: LintMessage[] }[];
  const messages = result?.messages ?? [];
  if (messages.some((m) => m.ruleId === null)) {
    throw new Error(`ESLint could not parse the snippet: ${run.stdout}`);
  }
  return messages.filter((m) => m.ruleId === 'no-restricted-syntax').length;
}

describe('no hard-coded UI text', () => {
  it('rejects plain JSX text', () => {
    expect(textViolations(`<Text>Bonjour</Text>`)).toBe(1);
  });

  it('rejects string literals and template literals as JSX children', () => {
    expect(textViolations(`<Text>{'Règles prévues'}</Text>`)).toBe(1);
    expect(textViolations('<Text>{`Jour ${3}`}</Text>')).toBe(1);
  });

  it('rejects literal strings in user-facing props', () => {
    expect(textViolations(`<Button label="Enregistrer" accessibilityLabel={'Retour'} />`)).toBe(2);
  });

  it('accepts translated text, numbers, punctuation and non-text props', () => {
    expect(
      textViolations(
        `<Text>{t('home.title')} · {3} – {'%'}<Button variant="primary" label={t('common.save')} /></Text>`,
      ),
    ).toBe(0);
  });
});
