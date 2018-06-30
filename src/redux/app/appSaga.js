import appActions from './appActions';
import { takeLatest, put, all, fork } from 'redux-saga/effects';

export function* toggleGlobalLoaderWatcher () {
  yield takeLatest([appActions.APP_LOADING], executeToggleGlobalLoader);
}
export function* executeToggleGlobalLoader (action) {
  yield put(appActions.toggleGlobalLoader(action.loading));
}
// We only need to fork the saga watchers, they themselves execute the work flows
export default function* appSagas() {
  yield all([
    fork(toggleGlobalLoaderWatcher),
  ]);
}