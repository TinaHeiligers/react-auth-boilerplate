import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import authActions from './authActions';
import { 
  loginGoogle,
  axiosLoginAPI 
} from './authServices';

import { authMock, emailPasswordAuthMock } from './mockedAuthServices';

export function* authorizeEmailPasswordWatcher() {
  yield takeLatest(authActions.AUTH_REQUEST, authorizeEmailPasswordRunner)
};

export function* authorizeEmailPasswordRunner(action) {
  const payload = action.payload;
  // for real api calls

  const axiosOptions = {
    data: JSON.stringify({ login: payload.login, password: payload.password }),
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }
  try {
    const result = yield call(axiosLoginAPI, axiosOptions) // Real call to the server using axios.
    // const result = yield call(emailPasswordAuthMock, payload.login, payload.password); // Mock call.
    yield put({ type: authActions.AUTH_SUCCESS, token: result.token });
    localStorage.setItem('token', result.token);
    // add the cookie
    yield put(push('/'))
  } catch (error) {
    let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 401: message = 'Invalid credentials'; break;
      default: message = 'Something went wrong :-(';
    }
    yield put({ type: authActions.AUTH_FAILURE, error: message });
    localStorage.removeItem('token');
  }
}
export function* axiosLoginGoogleWatcher() {
  yield takeLatest(authActions.AXIOS_LOGIN_GOOGLE_REQUEST, axiosLoginGoogleRunner)
};

export function* axiosLoginGoogleRunner() {
  const axiosOptions = {
    transformResponse: [(response) => response.json()],
    withCredentials: true,
  }
  try {
    const result = yield call(loginGoogle, axiosOptions) // Real call to the server using axios.
    yield put({ type: authActions.AXIOS_LOGIN_GOOGLE_SUCCESS, token: result.token });
    // I need to do something with the cookie here or with the auth header
    localStorage.setItem('token', result.token);
    yield put(push('/'))
  } catch (error) {
    let message;
    switch (error.status) {
      case 500: message = 'Internal Server Error'; break;
      case 401: message = 'Invalid credentials'; break;
      default: message = 'Something went wrong :-(';
    }
    yield put({ type: authActions.AUTH_FAILURE, error: message });
    // set any cookies to an expiry date in the past.
    localStorage.removeItem('token');
  }
}
export function* logOutWatcher() {
  yield takeLatest(authActions.LOG_OUT, logOutRunner)
}
export function* logOutRunner() {
  localStorage.removeItem('token');
  yield put(push('/'));
}

export default function* authSagas() {
  yield all([
    fork(authorizeEmailPasswordRunnerWatcher),
    fork(axiosLoginGoogleWatcher),
    fork(logOutWatcher),
  ]);
};
