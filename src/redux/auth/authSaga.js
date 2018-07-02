import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import authActions from './authActions';
import { fetchJSON, verifyToken } from './authServices';

import { authMock, tokenVerifyMock } from './mockedAuthServices';

export function* authorizeWatcher() {
  yield takeLatest(authActions.AUTH_REQUEST, authorizeRunner)
};

export function* authorizeRunner(action) {
  const payload = action.payload;
  // for real api calls
  const options = {
    body: JSON.stringify({login: payload.login, password: payload.password}),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' } 
  }
  try {
    // const { token } = yield call(fetchJSON, options); // Real call to the server.
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
export function* verifyTempGoogleTokenWatcher() {
  yield takeLatest(authActions.VERIFY_TEMP_TOKEN_REQUEST, verifyTempGoogleTokenRunner)
};

export function* verifyTempGoogleTokenRunner(action) {
  const tempToken = action.tempToken;
  const options = {
    body: JSON.stringify({ idToken: tempToken }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' } 
  }
  try {
    // const { serverToken } = yield call(verifyToken, options); // Real call to the server.
    const mockedResponse = yield call(tokenVerifyMock, options); // Mock call.
    yield put({ type: authActions.VERIFY_TEMP_TOKEN_SUCCESS, token: mockedResponse.token });
    // do I need to do something with the cookie here?
    debugger;
    localStorage.setItem('token', mockedResponse.token);
    yield put(push('/'))
  } catch (error) {
    let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 401: message = 'Invalid credentials'; break;
      default: message = 'Something went wrong :-(';
    }
    yield put({ type: authActions.AUTH_FAILURE, payload: message });
    // set any cookies to an expiry date in the past.
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
    fork(verifyTempGoogleTokenWatcher),
    fork(logOutWatcher),
  ]);
};
