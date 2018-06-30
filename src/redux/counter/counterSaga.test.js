/* global describe, it, expect */
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import counterActions from './counterActions';

import { incrementAsync } from './counterSaga';
const SEP = '\n       ';
const done = { done: true, value: undefined };

describe('counter saga -> incrementAsync', () => {
  const steps = ['1) calls delay(100)', '2) puts increment()'];
  it(steps.join(SEP), () => {
    const sagaGen = incrementAsync();
    expect(sagaGen.next().value).toEqual(call(delay, 100));
    expect(sagaGen.next().value).toEqual(put(counterActions.increment()));
    expect(sagaGen.next()).toEqual(done);
  });
});