import { all } from 'redux-saga/effects';
import authSagas from './auth/authSagas';
import appSagas from './app/appSaga';
import counterSagas from './counter/counterSaga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    appSagas(),
    counterSagas(),
  ]);
}
