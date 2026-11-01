// An icon next to its text is decorative: hidden from assistive technologies.
// An icon alone is an image with a name read by the screen reader.
export function iconAccessibility(accessibilityLabel: string | undefined) {
  return accessibilityLabel
    ? { accessible: true, accessibilityRole: 'image' as const, accessibilityLabel }
    : { accessible: false, importantForAccessibility: 'no-hide-descendants' as const };
}
