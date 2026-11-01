export type SettingRowKind = 'navigate' | 'value' | 'switch';

export type RowBehaviour = {
  kind: SettingRowKind;
  role: 'button' | 'switch' | 'text';
  interactive: boolean;
  chevron: boolean;
};

// A row with an action opens a deeper level; a row without one only shows a value.
export function resolveRow(kind: SettingRowKind | undefined, hasAction: boolean): RowBehaviour {
  const resolved = kind ?? (hasAction ? 'navigate' : 'value');

  if (resolved === 'switch') {
    return { kind: resolved, role: 'switch', interactive: true, chevron: false };
  }
  if (resolved === 'navigate') {
    return { kind: resolved, role: 'button', interactive: hasAction, chevron: true };
  }
  return {
    kind: resolved,
    role: hasAction ? 'button' : 'text',
    interactive: hasAction,
    chevron: false,
  };
}
