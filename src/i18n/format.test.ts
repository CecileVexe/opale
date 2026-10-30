import { formatDate, formatNumber } from './format';

describe('formatDate', () => {
  it('matches the date formats of the mockups', () => {
    expect(formatDate('2026-11-02', 'fr', 'weekdayDayMonth')).toBe('lun. 2 nov.');
    expect(formatDate('2026-10-07', 'fr', 'longWeekdayDayMonth')).toBe('mercredi 7 octobre');
    expect(formatDate('2026-10-15', 'fr', 'monthYear')).toBe('octobre 2026');
    expect(formatDate('2025-10-15', 'fr', 'dayMonthYear')).toBe('15 oct. 2025');
    expect(formatDate('2026-09-07', 'fr', 'dayMonth')).toBe('7 sept.');
  });

  it('formats in English', () => {
    expect(formatDate('2026-11-02', 'en', 'weekdayDayMonth')).toBe('Mon, Nov 2');
    expect(formatDate('2026-10-15', 'en', 'monthYear')).toBe('October 2026');
  });

  it('keeps the calendar day across daylight saving changes', () => {
    expect(formatDate('2026-03-29', 'fr', 'dayMonth')).toBe('29 mars');
    expect(formatDate('2026-10-25', 'fr', 'dayMonth')).toBe('25 oct.');
  });

  it('rejects anything that is not a calendar date', () => {
    expect(() => formatDate('2026-10-25T10:00:00Z', 'fr', 'dayMonth')).toThrow(RangeError);
  });
});

describe('formatNumber', () => {
  it('uses the decimal separator of the language', () => {
    expect(formatNumber(36.4, 'fr', 1)).toBe('36,4');
    expect(formatNumber(36.4, 'en', 1)).toBe('36.4');
    expect(formatNumber(36.25, 'fr', 2)).toBe('36,25');
  });
});
