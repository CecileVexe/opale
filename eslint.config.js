const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// Props that always carry text shown or read to the user: they must come from i18n.
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
// A string counts as text as soon as it contains a letter.
const hasLetter = '/[A-Za-zÀ-ÖØ-öø-ÿ]/';
const I18N_MESSAGE = 'User-facing text must come from i18n (t()), not a hard-coded string.';

module.exports = defineConfig([
  globalIgnores(['dist/*', 'android/*', 'ios/*', 'coverage/*', '.expo/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    // Principle 5: no hard-coded UI text in screens and components.
    files: ['**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: `JSXText[value=${hasLetter}]`, message: I18N_MESSAGE },
        {
          selector: `JSXElement > JSXExpressionContainer > Literal[value=${hasLetter}]`,
          message: I18N_MESSAGE,
        },
        {
          selector: `JSXElement > JSXExpressionContainer > TemplateLiteral`,
          message: I18N_MESSAGE,
        },
        { selector: `${userFacingProp} > Literal[value=${hasLetter}]`, message: I18N_MESSAGE },
        {
          selector: `${userFacingProp} > JSXExpressionContainer > Literal[value=${hasLetter}]`,
          message: I18N_MESSAGE,
        },
        {
          selector: `${userFacingProp} > JSXExpressionContainer > TemplateLiteral`,
          message: I18N_MESSAGE,
        },
      ],
    },
  },
]);
