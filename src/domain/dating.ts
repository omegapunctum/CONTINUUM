import { formatYear } from './time.ts';

export type DatedYear = { precision: 'exact' | 'circa'; year: number };
export type Dating =
  | { kind: 'event'; when: DatedYear }
  | { kind: 'window'; earliest: number; latest: number }
  | { kind: 'alternatives'; years: readonly [number, number, ...number[]] }
  | { kind: 'period'; start: DatedYear; end: DatedYear };

function label(date: DatedYear): string {
  return (date.precision === 'circa' ? 'около ' : '') + formatYear(date.year);
}

// The extent positions the mark. For alternatives only the named years are candidates.
export function describeDating(date: Dating) {
  switch (date.kind) {
    case 'event': {
      const year = date.when.year;
      return { first: year, last: year, text: label(date.when) };
    }
    case 'window':
      if (date.latest < date.earliest) throw new RangeError('Reversed event window');
      return { first: date.earliest, last: date.latest,
        text: 'Между ' + formatYear(date.earliest) + ' и ' + formatYear(date.latest) };
    case 'alternatives': {
      const years = [...new Set(date.years)].sort((a, b) => a - b);
      if (years.length < 2) throw new RangeError('Expected at least two distinct candidate years');
      return { first: years[0], last: years[years.length - 1], text: years.map(formatYear).join(' или ') };
    }
    case 'period':
      if (date.end.year < date.start.year) throw new RangeError('Reversed construction period');
      return { first: date.start.year, last: date.end.year, text: label(date.start) + ' — ' + label(date.end) };
  }
}
