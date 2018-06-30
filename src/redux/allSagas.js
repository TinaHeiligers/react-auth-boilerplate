import { all } from 'redux-saga/effects';
import appSagas from './app/appSaga';
import counterSagas from './counter/counterSaga';

export default function* rootSaga(getState) {
  yield all([
    appSagas(),
    counterSagas(),
  ]);
}
