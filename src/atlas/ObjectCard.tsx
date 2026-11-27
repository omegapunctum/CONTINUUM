import { useId, useRef, useState } from 'react';
import { describeDating } from '../domain/dating';
import { formatYear } from '../domain/time';
import type { Building, Example } from './example';
import { TimelineMark, kindLabels } from './TimelineMark';

export function ObjectCard({ building, initialEntry }: { building: Building; initialEntry: Example }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(initialEntry);
  const titleId = useId();
  const detailsId = useId();
  const dates = building.entries.map(entry => describeDating(entry.dating));
  const first = Math.min(...dates.map(date => date.first));
  const last = Math.max(...dates.map(date => date.last));
  const singleYear = first === last;
  const range: [number, number] = singleYear ? [first - 1, last + 1] : [first, last];

  function open() {
    setActive(initialEntry);
    dialog.current?.showModal();
  }

  return <>
    <button className="card-opener" type="button" aria-haspopup="dialog" ref={opener} onClick={open}>
      О здании <span aria-hidden="true">↗</span>
    </button>
    <dialog className="object-card" ref={dialog} aria-labelledby={titleId}
      onClose={() => opener.current?.focus({ preventScroll: true })}>
      <div className="card-heading">
        <h2 id={titleId}>{building.label}</h2>
        <button type="button" className="close-card" aria-label="Закрыть карточку"
          onClick={() => dialog.current?.close()}>×</button>
      </div>
      <div className="object-axis" role="group" aria-label="Хронология здания">
        <div className="object-rail">
          {building.entries.map(entry =>
            <TimelineMark key={entry.id} item={entry} range={range} selected={active.id === entry.id}
              detailsId={detailsId} compact onSelect={() => setActive(entry)} />)}
        </div>
        <div className={'object-years' + (singleYear ? ' single-year' : '')} aria-hidden="true">
          <span>{formatYear(first)}</span>
          {!singleYear && <span>{formatYear(last)}</span>}
        </div>
      </div>
      <div className="object-detail" id={detailsId} aria-live="polite" aria-atomic="true">
        <p>{kindLabels[active.dating.kind]}</p>
        <h3>{active.label}</h3>
        <p>{describeDating(active.dating).text}</p>
      </div>
    </dialog>
  </>;
}
