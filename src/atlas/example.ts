// Entirely synthetic. These are interface fixtures, not historical assertions.
export type Example =
  | { id: string; label: string; kind: 'point'; year: number }
  | { id: string; label: string; kind: 'interval'; start: number; end: number };

export const examples: readonly Example[] = [
  { id: 'example-gallery', label: 'Строительство галереи', kind: 'interval', start: -2, end: 2 },
  { id: 'example-arch', label: 'Закладка арки', kind: 'point', year: 4 },
];
