import type { Dating } from '../domain/dating';

// Synthetic interface fixtures. Three examples share coordinates so readers can
// compare a duration, a possible window and discrete candidate dates.
export type Example = { id: string; label: string; dating: Dating };
export const examples: readonly Example[] = [
  { id: 'example-gallery', label: 'Строительство галереи', dating: {
    kind: 'period', start: { precision: 'exact', year: -2 }, end: { precision: 'exact', year: 2 }
  } },
  { id: 'example-portal', label: 'Установка портала', dating: { kind: 'window', earliest: -2, latest: 2 } },
  { id: 'example-spire', label: 'Закладка шпиля', dating: { kind: 'alternatives', years: [-2, 2] } },
  { id: 'example-arch', label: 'Закладка арки', dating: { kind: 'event', when: { precision: 'exact', year: 4 } } },
  { id: 'example-roof', label: 'Замена кровли', dating: { kind: 'event', when: { precision: 'circa', year: 1 } } },
];
