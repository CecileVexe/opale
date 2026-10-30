import { resolveLanguage } from './language';

describe('resolveLanguage', () => {
  it('uses the language chosen in the app first', () => {
    expect(resolveLanguage('en', ['fr'])).toBe('en');
  });

  it('otherwise uses the first supported phone language', () => {
    expect(resolveLanguage(null, ['de', 'en', 'fr'])).toBe('en');
    expect(resolveLanguage(undefined, ['fr'])).toBe('fr');
  });

  it('falls back to French when no phone language is supported', () => {
    expect(resolveLanguage(null, ['de', null])).toBe('fr');
    expect(resolveLanguage(null, [])).toBe('fr');
  });
});
