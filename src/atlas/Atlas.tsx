import { useState } from 'react';
import { formatYear, yearToX } from '../domain/time';
import { describeDating } from '../domain/dating';
import { ObjectCard } from './ObjectCard';
import { TimelineMark, kindLabels } from './TimelineMark';
import { examples, gallery, type Example } from './example';

const firstYear = -4;
const lastYear = 6;
const ticks = [-4, -2, 0, 2, 4, 6];
const percent = (year: number) => yearToX(year, firstYear, lastYear, 100);
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
            <TimelineMark range={[firstYear, lastYear]} detailsId="selection" item={item} selected={active.id === item.id} onSelect={() => setActive(item)} />
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
      {gallery.entries.some(entry => entry.id === active.id) &&
        <ObjectCard building={gallery} initialEntry={active} />}
    </main>
  </>;
}
