/* global describe, it, expect */
import Immutable from 'immutable';
import authReducer, { initialState } from './authReducer';
import authActions from './authActions';

describe('auth reducer', () => {
  const defaultState = authReducer(initialState, { type: 'unexpected' });
  it('returns an object', () => {
    expect(defaultState).toBeInstanceOf(Object);
  });
  it('returns an object equal to initialState', () => {
    expect(defaultState.keySeq().toArray()).toEqual(expect.arrayContaining(['token', 'googleTempToken', 'error']));
  });
  it('updates state on AUTH_SUCCESS', () => {
    const testToken = '1234';
    const testAction = authActions.authorizeSuccess(testToken);
    const newState = authReducer(defaultState, testAction);
    expect(newState.get('token')).toEqual(testToken);
  });
  it('updates state on AUTH_FAILURE', () => {
    const testError = new Error('auth failure');
    const testAction = authActions.authError(testError);
    const newState = authReducer(defaultState, testAction);
    expect(newState.get('error')).toEqual(testError);
  });
  it('updates state on LOGOUT_SUCCESS', () => {
    const testState = defaultState.merge({
      token: 'test',
      googleTempToken: 'test',
      session: 'test',
      redirect: 'test',
    })
    const testAction = authActions.logOutSuccess();
    const newState = authReducer(testState, testAction);
    expect(newState.get('token')).toBeNull()
    expect(newState.get('googleTempToken')).toBeNull()
    expect(newState.get('session')).toBeNull()
    expect(newState.get('redirect')).toBeNull()
  });
  it('updates state on AUTH_FAILURE_EMAIL_NOT_VALID', () => {
    const testError = new Error('blah')
    const testAction = authActions.authFailureEmailNotValid(testError);
    const newState = authReducer(defaultState, testAction);
    expect(newState.get('error')).toEqual(testError)
  });
});
