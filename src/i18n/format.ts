import type { Language } from './language';

export type DateStyle =
  'dayMonth' | 'weekdayDayMonth' | 'longWeekdayDayMonth' | 'dayMonthYear' | 'monthYear';

const DATE_OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  dayMonth: { day: 'numeric', month: 'short' },
  weekdayDayMonth: { weekday: 'short', day: 'numeric', month: 'short' },
  longWeekdayDayMonth: { weekday: 'long', day: 'numeric', month: 'long' },
  dayMonthYear: { day: 'numeric', month: 'short', year: 'numeric' },
  monthYear: { month: 'long', year: 'numeric' },
};

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Formats a local calendar date ('YYYY-MM-DD'). The date is placed at noon UTC and formatted
 * in UTC, so the phone's time zone and daylight saving changes can never shift the day.
 */
export function formatDate(isoDate: string, language: Language, style: DateStyle): string {
  const match = ISO_DATE.exec(isoDate);
  if (!match) throw new RangeError(`Invalid calendar date: ${isoDate}`);
  const [, year, month, day] = match.map(Number) as [number, number, number, number];
  const instant = new Date(Date.UTC(year, month - 1, day, 12));
  return new Intl.DateTimeFormat(language, { ...DATE_OPTIONS[style], timeZone: 'UTC' }).format(
    instant,
  );
}

export function formatNumber(value: number, language: Language, fractionDigits = 0): string {
  return new Intl.NumberFormat(language, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
