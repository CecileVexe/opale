import { resolveRow } from './rowKind';

describe('resolveRow', () => {
  it('opens a deeper level, with a chevron, when the row has an action', () => {
    expect(resolveRow(undefined, true)).toEqual({
      kind: 'navigate',
      role: 'button',
      interactive: true,
      chevron: true,
    });
  });

  it('only shows a value when the row has no action', () => {
    expect(resolveRow(undefined, false)).toEqual({
      kind: 'value',
      role: 'text',
      interactive: false,
      chevron: false,
    });
  });

  it('makes a value row pressable, without chevron, when it has an action', () => {
    expect(resolveRow('value', true)).toEqual({
      kind: 'value',
      role: 'button',
      interactive: true,
      chevron: false,
    });
  });

  it('always makes a switch row interactive, whatever the action', () => {
    expect(resolveRow('switch', false)).toEqual({
      kind: 'switch',
      role: 'switch',
      interactive: true,
      chevron: false,
    });
  });

  it('does not make a navigation row without action pressable', () => {
    expect(resolveRow('navigate', false).interactive).toBe(false);
  });
});
