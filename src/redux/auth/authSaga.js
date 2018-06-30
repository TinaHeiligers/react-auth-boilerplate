import { call, put, takeLatest } from 'redux-saga/effects';
import authActions from './authActions';
import { fetchJSON } from './authServices';


export function* authorizeWatcher() {
  yield takeLatest(authActions.AUTH_REQUEST, authorizeRunner)
};

export function* authorizeRunner({ payload: { login, password } }) {
  const options = {
    body: JSON.stringify({ login, password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
  try {
    const { token } = yield call(fetchJSON, '/login', options);
    yield put({ type: authActions.AUTH_SUCCESS, payload: token });
    localStorage.setItem('token', token);
  } catch (error) {
    let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 401: message = 'Invalid credentials'; break;
      default: message = 'Something went wrong :-(';
    }
    yield put({ type: authActions.AUTH_FAILURE, payload: message });
    localStorage.removeItem('token');
  }
}

export default function* authSagas() {
  yield all([
    fork(authorixeWatcher),
  ]);
};
