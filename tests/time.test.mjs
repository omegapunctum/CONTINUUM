import test from 'node:test';
import assert from 'node:assert/strict';
import { formatYear, yearToX } from '../src/domain/time.ts';

test('human labels have no year zero', () => {
  assert.equal(formatYear(-1), '2 до н. э.');
  assert.equal(formatYear(0), '1 до н. э.');
  assert.equal(formatYear(1), '1 н. э.');
  assert.throws(() => formatYear(1.5), RangeError);
});

test('one continuous linear axis across the era boundary', () => {
  assert.equal(yearToX(-1, -1, 1, 200), 0);
  assert.equal(yearToX(0, -1, 1, 200), 100);
  assert.equal(yearToX(1, -1, 1, 200), 200);
  assert.equal(yearToX(2, -1, 1, 200), 300);
});

test('invalid viewport rejected', () => {
  assert.throws(() => yearToX(0, 1, 1, 100), RangeError);
  assert.throws(() => yearToX(0, -1, 1, 0), RangeError);
  assert.throws(() => yearToX(NaN, -1, 1, 100), RangeError);
});
