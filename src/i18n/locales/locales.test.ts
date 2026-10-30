import { createInstance } from 'i18next';

import en from './en.json';
import fr from './fr.json';

function keyPaths(node: object, prefix = ''): string[] {
  return Object.entries(node).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null
      ? keyPaths(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

describe('translation catalogues', () => {
  it('have exactly the same keys in French and English', () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(fr).sort());
  });

  it('have no empty text', () => {
    for (const catalogue of [fr, en]) {
      const empty = keyPaths(catalogue).filter((path) => {
        const value = path
          .split('.')
          .reduce<unknown>((n, k) => (n as Record<string, unknown>)[k], catalogue);
        return typeof value !== 'string' || value.trim() === '';
      });
      expect(empty).toEqual([]);
    }
  });

  it('pluralise correctly in both languages', async () => {
    const i18n = createInstance();
    await i18n.init({ resources: { fr: { translation: fr }, en: { translation: en } }, lng: 'fr' });
    expect(i18n.t('units.day', { count: 0 })).toBe('0 jour');
    expect(i18n.t('units.day', { count: 1 })).toBe('1 jour');
    expect(i18n.t('units.day', { count: 5 })).toBe('5 jours');
    await i18n.changeLanguage('en');
    expect(i18n.t('units.day', { count: 0 })).toBe('0 days');
    expect(i18n.t('units.day', { count: 1 })).toBe('1 day');
  });
});
