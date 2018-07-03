/* global describe, it, expect */
import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux'
import { authMock, tokenVerifyMock } from './mockedAuthServices';
import authActions from './authActions';

import { 
  authorizeBasicWatcher,
  authorizeBasicRunner,
  verifyTempGoogleTokenWatcher,
  verifyTempGoogleTokenRunner,
  logOutWatcher,
  logOutRunner,
 } from './authSaga';
const SEP = '\n       ';
const done = { done: true, value: undefined };

describe('auth saga -> authorizeBasicWatcher', () => {
  const steps = ['1) watches for the most recent AUTH_REQUEST action', '2) triggers the authorizeBasicRunner method'];
  let sagaGen;
  it(steps.join(SEP), () => {
    sagaGen = authorizeBasicWatcher();
    expect(sagaGen.next().value).toEqual(takeLatest(authActions.AUTH_REQUEST, authorizeBasicRunner));
    expect(sagaGen.next()).toEqual(done);
  });
});
describe.only('auth saga -> authorizeBasicRunner', () => {
  let sagaGen;
  let testToken = 'JWT123456';
  it('1) should call the API endpoint given a login and password payload', () => {
    const testPayload = { login: 'test@example.com', password: 'password' }
    sagaGen = authorizeBasicRunner({ payload: testPayload });
    expect(sagaGen.next().value).toEqual(call(authMock, testPayload.login, testPayload.password));
  });
  it('2) should put the AUTH_SUCCESS action with the token as the payload on successful return of a token from the api call', () => {
    let token = 'secret-token';
    expect(sagaGen.next(token).value).toEqual(put({ type: authActions.AUTH_SUCCESS, payload: token }))
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