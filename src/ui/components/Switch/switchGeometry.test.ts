import { borderWidth } from '../../theme/tokens';
import { SWITCH_THUMB, SWITCH_TRACK, THUMB_INSET, THUMB_TRAVEL } from './switchGeometry';

describe('switch geometry', () => {
  it('keeps the thumb inside the track at both ends', () => {
    const innerWidth = SWITCH_TRACK.width - 2 * borderWidth.field;
    expect(THUMB_INSET).toBeGreaterThan(0);
    expect(THUMB_INSET + SWITCH_THUMB + THUMB_INSET).toBeLessThanOrEqual(
      SWITCH_TRACK.height - 2 * borderWidth.field,
    );
    expect(THUMB_INSET + THUMB_TRAVEL + SWITCH_THUMB + THUMB_INSET).toBeCloseTo(innerWidth, 10);
  });

  it('leaves the same gap on both sides of the thumb', () => {
    const innerWidth = SWITCH_TRACK.width - 2 * borderWidth.field;
    const gapLeft = THUMB_INSET;
    const gapRight = innerWidth - (THUMB_INSET + THUMB_TRAVEL + SWITCH_THUMB);
    expect(gapRight).toBeCloseTo(gapLeft, 10);
  });

  it('moves the thumb to the right when the switch is on', () => {
    expect(THUMB_TRAVEL).toBeGreaterThan(0);
  });
});
