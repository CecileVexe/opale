/**
 * @jest-environment node
 */
import path from 'node:path';

import { GLOBAL_FILES, testCommandFor } from '../../scripts/select-tests.cjs';

const ROOT = path.resolve('project');
const at = (relative: string) => path.join(ROOT, relative);

describe('tests run by the pre-commit hook', () => {
  it('runs only the tests related to the changed files', () => {
    expect(testCommandFor([at('src/ui/components/Button/buttonStyle.ts')], ROOT)).toEqual([
      'jest --bail --passWithNoTests --findRelatedTests "src/ui/components/Button/buttonStyle.ts"',
    ]);
  });

  it('lists every changed code file, with slashes whatever the system', () => {
    const [command] = testCommandFor(
      [at('src/i18n/format.ts'), at('src/i18n/locales/fr.json'), at('App.tsx')],
      ROOT,
    );
    expect(command).toContain('"src/i18n/format.ts" "src/i18n/locales/fr.json" "App.tsx"');
    expect(command).not.toContain('\\');
  });

  it('runs the whole suite when a file that no test imports changes', () => {
    for (const file of GLOBAL_FILES) {
      expect(testCommandFor([at('src/ui/theme/tokens.ts'), at(file)], ROOT)).toEqual(['jest']);
    }
  });

  it('runs nothing when only documents or images change', () => {
    expect(
      testCommandFor([at('README.md'), at('docs/ROADMAP.md'), at('assets/icon.png')], ROOT),
    ).toEqual([]);
  });

  it('runs nothing when no file is staged', () => {
    expect(testCommandFor([], ROOT)).toEqual([]);
  });

  it('keeps the list of whole-suite triggers to the files that really need it', () => {
    expect([...GLOBAL_FILES].sort()).toEqual([
      '.prettierrc',
      'eslint.config.js',
      'jest.config.js',
      'package-lock.json',
      'package.json',
      'test/lint/lint-runner.mjs',
      'tsconfig.json',
    ]);
  });
});
