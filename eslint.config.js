const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactNativeA11y = require('eslint-plugin-react-native-a11y');

const USER_FACING_PROPS = [
  'label',
  'title',
  'message',
  'description',
  'placeholder',
  'helper',
  'accessibilityLabel',
  'accessibilityHint',
];
const userFacingProp = `JSXAttribute[name.name=/^(${USER_FACING_PROPS.join('|')})$/]`;
const hasLetter = '/[A-Za-zÀ-ÖØ-öø-ÿ]/';
const I18N_MESSAGE = 'User-facing text must come from i18n (t()), not a hard-coded string.';

const textSelectors = [
  { selector: `JSXText[value=${hasLetter}]`, message: I18N_MESSAGE },
  {
    selector: `JSXElement > JSXExpressionContainer > Literal[value=${hasLetter}]`,
    message: I18N_MESSAGE,
  },
  { selector: `JSXElement > JSXExpressionContainer > TemplateLiteral`, message: I18N_MESSAGE },
  { selector: `${userFacingProp} > Literal[value=${hasLetter}]`, message: I18N_MESSAGE },
  {
    selector: `${userFacingProp} > JSXExpressionContainer > Literal[value=${hasLetter}]`,
    message: I18N_MESSAGE,
  },
  {
    selector: `${userFacingProp} > JSXExpressionContainer > TemplateLiteral`,
    message: I18N_MESSAGE,
  },
];

const DAY_MESSAGE =
  'Count days as local calendar days (src/domain/dates), never as a multiple of 24 hours.';
const daySelectors = [
  'Literal[value=86400000]',
  'Literal[value=86400]',
  'BinaryExpression[operator="*"][left.value=24]',
  'BinaryExpression[operator="*"][right.value=24]',
  'BinaryExpression[operator="/"][right.value=24]',
].map((selector) => ({ selector, message: DAY_MESSAGE }));

module.exports = defineConfig([
  globalIgnores(['dist/*', 'android/*', 'ios/*', 'coverage/*', '.expo/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    rules: { 'no-console': 'error' },
  },
  {
    files: ['scripts/**', 'test/lint/lint-runner.mjs'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}'],
    rules: { 'no-restricted-syntax': ['error', ...daySelectors] },
  },
  {
    files: ['**/*.tsx'],
    ignores: ['**/*.test.tsx'],
    plugins: { 'react-native-a11y': reactNativeA11y },
    rules: {
      'no-restricted-syntax': ['error', ...daySelectors, ...textSelectors],
      'react-native-a11y/has-accessibility-props': 'error',
      'react-native-a11y/has-valid-accessibility-actions': 'error',
      'react-native-a11y/has-valid-accessibility-descriptors': 'error',
      'react-native-a11y/has-valid-accessibility-role': 'error',
      'react-native-a11y/has-valid-accessibility-state': 'error',
      'react-native-a11y/has-valid-accessibility-value': 'error',
      'react-native-a11y/has-valid-accessibility-live-region': 'error',
      'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'error',
      'react-native-a11y/has-valid-important-for-accessibility': 'error',
      'react-native-a11y/no-nested-touchables': 'error',
    },
  },
]);
