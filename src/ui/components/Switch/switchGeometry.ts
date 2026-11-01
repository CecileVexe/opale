import { borderWidth } from '../../theme/tokens';

// Track 52 x 32 and thumb 24, measured on the settings mockups (F2, F7).
export const SWITCH_TRACK = { width: 52, height: 32 } as const;
export const SWITCH_THUMB = 24;

const innerWidth = SWITCH_TRACK.width - 2 * borderWidth.field;
const innerHeight = SWITCH_TRACK.height - 2 * borderWidth.field;

export const THUMB_INSET = (innerHeight - SWITCH_THUMB) / 2;
export const THUMB_TRAVEL = innerWidth - SWITCH_THUMB - 2 * THUMB_INSET;
