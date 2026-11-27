import { useState } from 'react';
import { formatYear, yearToX } from '../domain/time';
import { describeDating } from '../domain/dating';
import { examples, type Example } from './example';

const firstYear = -4;
const lastYear = 6;
const ticks = [-4, -2, 0, 2, 4, 6];
const percent = (year: number) => yearToX(year, firstYear, lastYear, 100);
const kindLabels = {
  event: 'Событие', window: 'Возможное время события',
  alternatives: 'Варианты датировки события', period: 'Период работ',
};

function TimelineMark({ item, selected, onSelect }: {
  item: Example; selected: boolean; onSelect: () => void;
}) {
  const date = item.dating;
  const { first, last, text } = describeDating(date);
  const approximate = date.kind === 'event' && date.when.precision === 'circa';
  const className = ['mark', date.kind, first === last && 'single', approximate && 'circa',
    date.kind === 'period' && date.start.precision === 'circa' && 'soft-start',
    date.kind === 'period' && date.end.precision === 'circa' && 'soft-end'].filter(Boolean).join(' ');
  return <button className={className} style={{left: percent(first) + '%', width: percent(last) - percent(first) + '%'}}
    type="button" aria-pressed={selected} aria-controls="selection"
    aria-label={[item.label, kindLabels[date.kind], text].join(', ')} onClick={onSelect}>
    {date.kind === 'alternatives'
      ? [...new Set(date.years)].map(year => <span className="candidate" aria-hidden="true" key={year}
        style={{left: yearToX(year, first, last, 100) + '%'}} />)
      : <span className="ink" aria-hidden="true" />}
    <span className="mark-label">{item.label}</span>
  </button>;
}

export function Atlas() {
  const [active, setActive] = useState<Example>(examples[0]);
  return <>
    <header><a className="brand" href="/" aria-label="CONTINUUM — главная">CONTINUUM</a></header>
    <main className="atlas">
      <h1>Архитектура</h1>
      <p className="fixture">Демонстрационная шкала · вымышленные объекты и даты</p>
      <section className="sheet" aria-label="Хронология">
        <div className="context">Ансамбль галереи</div>
        <div className="tracks">
          {ticks.map(year => <i aria-hidden="true" key={year} className="guide" style={{left: percent(year) + '%'}} />)}
          {examples.map(item => <div className="track" key={item.id}>
            <TimelineMark item={item} selected={active.id === item.id} onSelect={() => setActive(item)} />
          </div>)}
          <div className="ruler" aria-label="Годы">
            {ticks.map(year => <span key={year} style={{left: percent(year) + '%'}}>{formatYear(year)}</span>)}
          </div>
        </div>
      </section>
      <div id="selection" aria-live="polite" aria-atomic="true">
        <span>{kindLabels[active.dating.kind]}</span>
        <h2>{active.label}</h2><p>{describeDating(active.dating).text}</p>
      </div>
    </main>
  </>;
}
