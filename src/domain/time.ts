/** Astronomical year coordinate; display calendars never use year zero. */
export function formatYear(year: number): string {
  if (!Number.isSafeInteger(year)) throw new RangeError('Expected a safe integer year');
  return year <= 0 ? `${1 - year} до н. э.` : `${year} н. э.`;
}

/** Linear projection, deliberately unclamped for off-screen coordinates. */
export function yearToX(year: number, start: number, end: number, width: number): number {
  if (![year, start, end, width].every(Number.isFinite) || end <= start || width <= 0) {
    throw new RangeError('Expected finite coordinates, increasing window and positive width');
  }
  return ((year - start) / (end - start)) * width;
}
