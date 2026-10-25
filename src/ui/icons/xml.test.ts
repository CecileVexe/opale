import { symptomIcons, uiIcons } from './icons';
import { symptomIconXml, uiIconXml, type SymptomIconName, type UiIconName } from './xml';

const uiNames = Object.keys(uiIcons) as UiIconName[];
const symptomNames = Object.keys(symptomIcons) as SymptomIconName[];

describe('icon XML', () => {
  it('wraps interface icons in a 24 px outline SVG', () => {
    expect(uiIconXml('home')).toMatch(
      /^<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"/,
    );
    expect(uiIconXml('home')).toContain('stroke-width="1.8"');
  });

  it('provides the interface icons the design system lists', () => {
    const required = [
      'home',
      'calendar',
      'stats',
      'settings',
      'drop',
      'diamond',
      'heart',
      'fertile',
    ];
    for (const name of required) expect(uiNames).toContain(name);
  });

  it('wraps symptom icons in a 24 px SVG', () => {
    expect(symptomIconXml('crampes')).toMatch(/^<svg viewBox="0 0 24 24">.*<\/svg>$/s);
  });

  it('never references external resources', () => {
    const all = [...uiNames.map(uiIconXml), ...symptomNames.map(symptomIconXml)];
    for (const xml of all) {
      expect(xml).not.toMatch(/href|url\(|<image|<script/i);
    }
  });
});
