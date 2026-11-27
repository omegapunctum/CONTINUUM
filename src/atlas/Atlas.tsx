import { useState, type CSSProperties } from 'react';
import { formatYear, yearToX } from '../domain/time';
import { examples, type Example } from './example';

const firstYear = -4;
const lastYear = 6;
const ticks = [-4, -2, 0, 2, 4, 6];
const percent = (year: number) => yearToX(year, firstYear, lastYear, 100);
const dateLabel = (item: Example) => item.kind === 'point'
  ? formatYear(item.year)
  : formatYear(item.start) + ' — ' + formatYear(item.end);

function position(item: Example): CSSProperties {
  const start = item.kind === 'point' ? item.year : item.start;
  const end = item.kind === 'point' ? item.year : item.end;
  return { left: percent(start) + '%', width: percent(end) - percent(start) + '%' };
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
            <button className={'mark ' + item.kind} style={position(item)}
              type="button" aria-pressed={active.id === item.id} aria-controls="selection"
              aria-label={item.label + ', ' + dateLabel(item)} onClick={() => setActive(item)}>
              <span className="ink" /><span className="mark-label">{item.label}</span>
            </button>
          </div>)}
          <div className="ruler" aria-label="Годы">
            {ticks.map(year => <span key={year} style={{left: percent(year) + '%'}}>{formatYear(year)}</span>)}
          </div>
        </div>
      </section>
      <div id="selection" aria-live="polite" aria-atomic="true">
        <span>{active.kind === 'point' ? 'Событие' : 'Период'}</span>
        <h2>{active.label}</h2><p>{dateLabel(active)}</p>
      </div>
    </main>
  </>;
}
