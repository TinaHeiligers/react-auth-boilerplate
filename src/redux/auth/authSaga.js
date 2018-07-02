import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import authActions from './authActions';
import { fetchJSON, authMock } from './authServices';

const baseURL = 'http://localhost:4000';

export function* authorizeWatcher() {
  yield takeLatest(authActions.AUTH_REQUEST, authorizeRunner)
};

export function* authorizeRunner(action) {
  const payload = action.payload;
  const options = {
    body: JSON.stringify({login: payload.login, password: payload.password}),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' } 
  }
  try {
    // const { token } = yield call(fetchJSON, `${baseURL}/login`, options); // Real call to the server.
    const { token } = yield call(authMock, payload.login, payload.password); // Mock call.
    yield put({ type: authActions.AUTH_SUCCESS, payload: token });
    localStorage.setItem('token', token);
    yield put(push('/'))
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
export function* logOutWatcher() {
  yield takeLatest(authActions.LOG_OUT, logOutRunner)
}
export function* logOutRunner() {
  yield put(push('/'));
}

export default function* authSagas() {
  yield all([
    fork(authorizeWatcher),
    fork(logOutWatcher),
  ]);
};
