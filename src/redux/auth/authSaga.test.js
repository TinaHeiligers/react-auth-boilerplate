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
describe('auth saga -> authorizeBasicRunner', () => {
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
describe('auth saga -> verifyTempGoogleTokenWatcher', () => {
  const steps = ['1) watches for the most recent VERIFY_TEMP_TOKEN_REQUEST action', '2) triggers the verifyTempGoogleTokenRunner method'];
  let sagaGen;
  it(steps.join(SEP), () => {
    sagaGen = verifyTempGoogleTokenWatcher();
    expect(sagaGen.next().value).toEqual(takeLatest(authActions.VERIFY_TEMP_TOKEN_REQUEST, verifyTempGoogleTokenRunner));
    expect(sagaGen.next()).toEqual(done);
  });
});
describe('auth saga -> verifyTempGoogleTokenRunner', () => {
  let sagaGen;
  let testAction = { tempToken: 'JWTTempToken'}
  let testOptions = {
    body: JSON.stringify({ idToken: testAction.tempToken }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' } 
  }
  it('1) should call the API endpoint with the token', () => {
    sagaGen = verifyTempGoogleTokenRunner(testAction);
    expect(sagaGen.next().value).toEqual(call(tokenVerifyMock, testOptions));
  });
  it('2) should put the AUTH_SUCCESS action with the token as the payload on successful return of a token from the api call', () => {
    let mockedResponse = { token: 'verified-google-token' }
    expect(sagaGen.next(mockedResponse).value).toEqual(put({ type: authActions.VERIFY_TEMP_TOKEN_SUCCESS, token: mockedResponse.token }))
  });
  it('3) should push to the root url', () => {
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
describe.only('auth saga -> logOutRunner', () => {
  let sagaGen;
  it('3) should push to the root url', () => {
    sagaGen = logOutRunner();
    expect(sagaGen.next().value).toEqual(put(push('/')));
  })
});