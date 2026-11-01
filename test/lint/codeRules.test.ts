/**
 * @jest-environment node
 */
import { countRule, lintCases, type LintCase } from './helpers';

const CASES: Record<string, LintCase> = {
  consoleInSource: { filePath: 'src/data/log.ts', code: `console.log('x');\n` },
  consoleInScripts: { filePath: 'scripts/report.mjs', code: `console.log('x');\n` },
  msPerDay: {
    filePath: 'src/domain/days.ts',
    code: `export const d = (ms: number) => ms / 86400000;\n`,
  },
  hoursProduct: {
    filePath: 'src/domain/days.ts',
    code: `export const d = (ms: number) => ms / (24 * 60 * 60 * 1000);\n`,
  },
  daysProduct: {
    filePath: 'src/domain/days.ts',
    code: `export const d = (days: number) => days * 24;\n`,
  },
  msPerDayInTest: {
    filePath: 'src/domain/days.test.ts',
    code: `export const d = (ms: number) => ms / 86400000;\n`,
  },
  otherDurations: {
    filePath: 'src/notifications/delay.ts',
    code: `export const twoHours = 2 * 60 * 60 * 1000;\n`,
  },
  invalidRole: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { Pressable } from 'react-native';\nexport const A = () => <Pressable accessibilityRole="banana" />;\n`,
  },
  touchableWithoutRole: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { Pressable } from 'react-native';\nexport const A = () => <Pressable onPress={() => {}} />;\n`,
  },
  accessibleTouchable: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { Pressable } from 'react-native';\nexport const A = () => <Pressable accessibilityRole="button" onPress={() => {}} />;\n`,
  },
  functionComponent: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { View } from 'react-native';\nexport default function Sample() { return <View />; }\n`,
  },
  arrowComponent: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { View } from 'react-native';\nconst Sample = () => <View />;\nexport default Sample;\n`,
  },
  typeProps: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { View } from 'react-native';\ntype Props = { a: string };\nconst Sample = (props: Props) => <View accessibilityLabel={props.a} />;\nexport default Sample;\n`,
  },
  interfaceProps: {
    filePath: 'src/ui/Sample.tsx',
    code: `import { View } from 'react-native';\ninterface Props { a: string }\nconst Sample = (props: Props) => <View accessibilityLabel={props.a} />;\nexport default Sample;\n`,
  },
  clickableInsideAccessible: {
    filePath: 'src/ui/Sample.tsx',
    code:
      `import { Pressable, View } from 'react-native';
` +
      `export const A = () => (<View accessible><Pressable accessibilityRole="button" /></View>);
`,
  },
};

describe('code rules', () => {
  const names = Object.keys(CASES);
  const results = lintCases(names.map((name) => CASES[name] as LintCase));
  const messagesOf = (name: string) => results[names.indexOf(name)] ?? [];

  it('forbids console in application code, not in CI scripts', () => {
    expect(countRule(messagesOf('consoleInSource'), 'no-console')).toBe(1);
    expect(countRule(messagesOf('consoleInScripts'), 'no-console')).toBe(0);
  });

  it('forbids counting days as multiples of 24 hours', () => {
    const rule = 'no-restricted-syntax';
    expect(countRule(messagesOf('msPerDay'), rule)).toBe(1);
    expect(countRule(messagesOf('hoursProduct'), rule)).toBe(1);
    expect(countRule(messagesOf('daysProduct'), rule)).toBe(1);
  });

  it('lets tests and unrelated durations through', () => {
    const rule = 'no-restricted-syntax';
    expect(countRule(messagesOf('msPerDayInTest'), rule)).toBe(0);
    expect(countRule(messagesOf('otherDurations'), rule)).toBe(0);
  });

  it('requires components to be arrow functions assigned to a const', () => {
    const rule = 'react/function-component-definition';
    expect(countRule(messagesOf('functionComponent'), rule)).toBe(1);
    expect(countRule(messagesOf('arrowComponent'), rule)).toBe(0);
  });

  it('requires props to be declared with an interface', () => {
    const rule = '@typescript-eslint/consistent-type-definitions';
    expect(countRule(messagesOf('typeProps'), rule)).toBe(1);
    expect(countRule(messagesOf('interfaceProps'), rule)).toBe(0);
  });

  it('enforces accessibility props on touchables', () => {
    expect(
      countRule(messagesOf('invalidRole'), 'react-native-a11y/has-valid-accessibility-role'),
    ).toBe(1);
    expect(
      countRule(
        messagesOf('touchableWithoutRole'),
        'react-native-a11y/has-valid-accessibility-descriptors',
      ),
    ).toBe(1);
    expect(
      countRule(
        messagesOf('accessibleTouchable'),
        'react-native-a11y/has-valid-accessibility-descriptors',
      ),
    ).toBe(0);
    expect(
      countRule(messagesOf('clickableInsideAccessible'), 'react-native-a11y/no-nested-touchables'),
    ).toBe(1);
  });
});
