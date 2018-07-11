import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import authActions from './authActions';
import { 
//   fetchLoginAPI,
  axiosLoginAPI, 
//   fetchVerifyToken,
//   axiosVerifyToken,
} from './authServices';

import { authMock, tokenVerifyMock } from './mockedAuthServices';

export function* authorizeBasicWatcher() {
  yield takeLatest(authActions.AUTH_REQUEST, authorizeBasicRunner)
};

export function* authorizeBasicRunner(action) {
  const payload = action.payload;
  // for real api calls
  const fetchOptions = {
    body: JSON.stringify({ login: payload.login, password: payload.password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }
  const axiosOptions = {
    data: JSON.stringify({ login: payload.login, password: payload.password }),
    headers: { 'Content-Type': 'application/json' },
    transformResponse: [(response) => response.json()],
    withCredentials: true,
  }
  try {
    // const { token } = yield call(fetchJSON, fetchOptions); // Real call to the server using fetch.
    const result = yield call(axiosLoginAPI, axiosOptions) // Real call to the server using axios.
    // const result = yield call(authMock, payload.login, payload.password); // Mock call.
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
export function* verifyTempGoogleTokenWatcher() {
  yield takeLatest(authActions.VERIFY_TEMP_TOKEN_REQUEST, verifyTempGoogleTokenRunner)
};

export function* verifyTempGoogleTokenRunner(action) {
  const tempToken = action.tempToken;
  /* the tempToken is a JWT 
    Send this token to your server (preferably as an Authorization header)
    Have your server decode the id_token by using a common JWT library
     such as jwt-simple or 
     by sending a GET request to https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=YOUR_TOKEN_HERE
    The returned decoded token should have an hd key equal to the hosted domain you'd like to restrict to.*/
  const fetchOptions = {
    method: 'POST',
    headers: { 'Authorization': tempToken },
    credentials: 'include'
  }
  const axiosOptions = {
    headers: { 'Authorization': tempToken },
    transformResponse: [(response) => response.json()],
    withCredentials: true,
  }
  try {
    // const { serverToken } = yield call(fetchVerifyToken, fetchOptions); // Real call to the server.
    // const result = yield call(axiosVerifyToken, axiosOptions) // Real call to the server using axios.
    const mockedResponse = yield call(tokenVerifyMock, fetchOptions); // Mock call.
    console.log('verifyTempGoogleTokenRunner mockedResponse', mockedResponse)
    yield put({ type: authActions.VERIFY_TEMP_TOKEN_SUCCESS, token: mockedResponse.token });
    // do I need to do something with the cookie here?
    localStorage.setItem('token', mockedResponse.token);
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
    fork(authorizeBasicWatcher),
    fork(verifyTempGoogleTokenWatcher),
    fork(logOutWatcher),
  ]);
};
