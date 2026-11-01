/**
 * @jest-environment node
 */
const requested = process.env.OPALE_TZ;

describe('time zone harness', () => {
  it('runs the tests in the requested time zone', () => {
    if (!requested) return;
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(requested);
  });

  it('is sensitive to daylight saving (a day is not always 24 hours)', () => {
    if (requested !== 'Europe/Paris') return;
    const before = new Date(2026, 2, 28, 12);
    const after = new Date(2026, 2, 29, 12);
    expect(after.getTime() - before.getTime()).toBe(23 * 60 * 60 * 1000);
  });
});
