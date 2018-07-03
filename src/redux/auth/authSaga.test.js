/* global describe, it, expect */
import { takeLatest, call, put } from 'redux-saga/effects';
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

describe.only('auth saga -> authorizeBasicWatcher', () => {
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
  it('1) should call the API endpoint given a login and password payload', () => {
    const testPayload = { login: 'test@example.com', password: 'testPassword' }
    sagaGen = authorizeBasicRunner({ payload: testPayload });
    expect(sagaGen.next().value).toEqual(call(authMock, testPayload.login, testPayload.password));
  });
});