import { APP_LOADING, toggleGlobalLoader } from './appActions';
import { takeLatest, all, fork } from 'redux-saga/effects';

export function* toggleGlobalLoaderWatcher () {
  yield takeLatest([APP_LOADING], executeToggleGlobalLoader);
}
export function* executeToggleGlobalLoader (action) {
  yield put(toggleGlobalLoader(action.loading));
}
// We only need to fork the saga watchers, they themselves execute the work flows
export default function* appSagas() {
  yield all([
    fork(toggleGlobalLoaderWatcher),
  ]);
}