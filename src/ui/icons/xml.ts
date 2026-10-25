import { symptomIcons, uiIcons } from './icons';

export type UiIconName = keyof typeof uiIcons;
export type SymptomIconName = keyof typeof symptomIcons;

// Interface icons: 1.8 px outline on a 24 px grid, colour from `currentColor` (Iconography).
export function uiIconXml(name: UiIconName): string {
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    `stroke-linecap="round" stroke-linejoin="round">${uiIcons[name]}</svg>`
  );
}

// Symptom icons: filled glyphs that carry their own fill (`currentColor`, or pastel tones for discharge).
export function symptomIconXml(name: SymptomIconName): string {
  return `<svg viewBox="0 0 24 24">${symptomIcons[name].svg}</svg>`;
}
