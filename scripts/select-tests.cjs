const path = require('node:path');

// Jest follows imports only. These files change how tests behave without being imported by any
// of them (the lint-rule tests spawn ESLint, a version bump changes every test), so they force a
// full run.
const GLOBAL_FILES = new Set([
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'jest.config.js',
  'eslint.config.js',
  '.prettierrc',
  'test/lint/lint-runner.mjs',
]);

const TESTABLE_FILE = /\.(ts|tsx|js|cjs|mjs|json)$/;

/**
 * Jest command to run for the staged files: everything when a global file changed, otherwise
 * the tests related to the changed files, and nothing when no code changed.
 * @param {string[]} files absolute paths
 * @param {string} cwd project root
 * @returns {string[]}
 */
function testCommandFor(files, cwd) {
  const relative = files.map((file) => path.relative(cwd, file).split(path.sep).join('/'));

  if (relative.some((file) => GLOBAL_FILES.has(file))) return ['jest'];

  const code = relative.filter((file) => TESTABLE_FILE.test(file) && !file.startsWith('docs/'));
  if (code.length === 0) return [];

  const quoted = code.map((file) => `"${file}"`).join(' ');
  return [`jest --bail --passWithNoTests --findRelatedTests ${quoted}`];
}

module.exports = { GLOBAL_FILES, testCommandFor };
