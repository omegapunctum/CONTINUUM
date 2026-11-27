import assert from 'node:assert/strict';
import test from 'node:test';
import { describeDating } from '../src/domain/dating.ts';

const year = (value, precision = 'exact') => ({ year: value, precision });
test('the same BCE/CE coordinates carry three distinct meanings', () => {
  const inputs = [
    { kind: 'period', start: year(-2), end: year(2) },
    { kind: 'window', earliest: -2, latest: 2 },
    { kind: 'alternatives', years: [2, -2] },
  ];
  const labels = ['3 до н. э. — 2 н. э.', 'Между 3 до н. э. и 2 н. э.', '3 до н. э. или 2 н. э.'];
  for (const [i, input] of inputs.entries()) {
    assert.deepEqual(describeDating(input), { first: -2, last: 2, text: labels[i] });
  }
});
test('circa keeps one anchor and qualifies only the stated boundary', () => {
  assert.deepEqual(describeDating({ kind: 'event', when: year(0, 'circa') }),
    { first: 0, last: 0, text: 'около 1 до н. э.' });
  assert.equal(describeDating({ kind: 'period', start: year(0), end: year(3, 'circa') }).text,
    '1 до н. э. — около 3 н. э.');
});
test('invalid bounds and repeated-only alternatives are rejected', () => {
  for (const input of [
    { kind: 'window', earliest: 2, latest: 1 }, { kind: 'period', start: year(2), end: year(1) },
    { kind: 'alternatives', years: [1, 1] }, { kind: 'event', when: year(0.5) },
  ]) assert.throws(() => describeDating(input), RangeError);
});
