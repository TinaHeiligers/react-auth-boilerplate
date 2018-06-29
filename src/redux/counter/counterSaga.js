import { delay } from 'redux-saga';
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import counterActions from './counterActions';

function* incrementAsyncWatcher () {
  yield takeLatest([counterActions.INCREMENT_REQUESTED], incrementAsync);
}
export function* incrementAsync (action) {
  yield call(delay, 100);
  yield put(counterActions.increment());
}
export default function* counterSagas() {
  yield all([
    fork(incrementAsyncWatcher),
  ]);
}