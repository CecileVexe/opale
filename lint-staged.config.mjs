import selectTests from './scripts/select-tests.cjs';

export default {
  '*.{ts,tsx,js,cjs,mjs}': 'eslint',
  '*.{json,md,yml,yaml}': 'prettier --check',
  '*': (files) => selectTests.testCommandFor(files, process.cwd()),
};
