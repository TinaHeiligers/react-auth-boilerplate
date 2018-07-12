/* global describe, it, expect */
import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { axiosLoginAPI } from './authServices';
import { emailPasswordAuthMock } from './mockedAuthServices';
import authActions from './authActions';

import { 
  authorizeEmailPasswordWatcher,
  authorizeEmailPasswordRunner,
  verifyTempGoogleTokenWatcher,
  verifyTempGoogleTokenRunner,
  logOutWatcher,
  logOutRunner,
 } from './authSaga';
const SEP = '\n       ';
const done = { done: true, value: undefined };

describe('auth saga -> authorizeEmailPasswordWatcher', () => {
  const steps = ['1) watches for the most recent AUTH_REQUEST action', '2) triggers the authorizeBasicRunner method'];
  let sagaGen;
  it(steps.join(SEP), () => {
    sagaGen = authorizeEmailPasswordWatcher();
    expect(sagaGen.next().value).toEqual(takeLatest(authActions.AUTH_REQUEST, authorizeEmailPasswordRunner));
    expect(sagaGen.next()).toEqual(done);
  });
});
describe('auth saga -> authorizeEmailPasswordRunner', () => {
  let sagaGen;
  it('1) should call the API endpoint given a login and password payload', () => {
    const testPayload = { login: 'test@example.com', password: 'password' }
    const testAction = { type: authActions.AUTH_REQUEST, payload: testPayload}
    const testOptions = {
      data: JSON.stringify({ login: testPayload.login, password: testPayload.password }),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
    sagaGen = authorizeEmailPasswordRunner(testAction);
    expect(sagaGen.next().value).toEqual(call(axiosLoginAPI, testOptions));
  });
  it('2) should put the AUTH_SUCCESS action with the token as the payload on successful return of a token from the api call', () => {
    let mockedResponse = { token: 'secret-token' };
    expect(sagaGen.next(mockedResponse).value).toEqual(put({ type: authActions.AUTH_SUCCESS, token: 'secret-token' }))
  });
  it('3) should push to the root url', () => {
    let token = 'secret-token';
    expect(sagaGen.next().value).toEqual(put(push('/')));
  })
  it('Should catch errors', () => {
    let testError = { status: 401 };
    expect(sagaGen.throw(testError).value).toEqual(put({type: authActions.AUTH_FAILURE, error: 'Invalid credentials' }))
  })
});
describe('auth saga -> logOutWatcher', () => {
  const steps = ['1) watches for the most recent LOG_OUT action', '2) triggers the logOutRunner method'];
  let sagaGen;
  it(steps.join(SEP), () => {
    sagaGen = logOutWatcher();
    expect(sagaGen.next().value).toEqual(takeLatest(authActions.LOG_OUT, logOutRunner));
    expect(sagaGen.next()).toEqual(done);
  });
});
describe('auth saga -> logOutRunner', () => {
  let sagaGen;
  it('3) should push to the root url', () => {
    sagaGen = logOutRunner();
    expect(sagaGen.next().value).toEqual(put(push('/')));
  })
});