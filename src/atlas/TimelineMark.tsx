import { describeDating } from '../domain/dating';
import { yearToX } from '../domain/time';
import type { Example } from './example';

export const kindLabels = {
  event: 'Событие', window: 'Возможное время события',
  alternatives: 'Варианты датировки события', period: 'Период работ',
};

export function TimelineMark({ item, selected, onSelect, range, detailsId, compact = false }: {
  item: Example; selected: boolean; onSelect: () => void;
  range: readonly [number, number]; detailsId: string; compact?: boolean;
}) {
  const percent = (year: number) => yearToX(year, range[0], range[1], 100);
  const date = item.dating;
  const { first, last, text } = describeDating(date);
  const approximate = date.kind === 'event' && date.when.precision === 'circa';
  const className = ['mark', date.kind, first === last && 'single', approximate && 'circa',
    date.kind === 'period' && date.start.precision === 'circa' && 'soft-start',
    date.kind === 'period' && date.end.precision === 'circa' && 'soft-end'].filter(Boolean).join(' ');
  return <button className={className} style={{left: percent(first) + '%', width: percent(last) - percent(first) + '%'}}
    type="button" aria-pressed={selected} aria-controls={detailsId}
    aria-label={[item.label, kindLabels[date.kind], text].join(', ')} onClick={onSelect}>
    {date.kind === 'alternatives'
      ? [...new Set(date.years)].map(year => <span className="candidate" aria-hidden="true" key={year}
        style={{left: yearToX(year, first, last, 100) + '%'}} />)
      : <span className="ink" aria-hidden="true" />}
    {!compact && <span className="mark-label">{item.label}</span>}
  </button>;
}
