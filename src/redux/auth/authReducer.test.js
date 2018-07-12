/* global describe, it, expect */
import Immutable from 'immutable';
import authReducer, { initialState } from './authReducer';
import authActions from './authActions';

describe.only('auth reducer', () => {
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
  it('updates state on LOG_OUT', () => {
    const testState = defaultState.set('token', 'test_token')
    const testAction = authActions.logOut();
    const newState = authReducer(testState, testAction);
    expect(newState.get('token')).toBeNull()
  });
  it('updates state on AUTH_FAILURE_EMAIL_NOT_VALID', () => {
    const testError = new Error('blah')
    const testAction = authActions.authFailureEmailNotValid(testError);
    const newState = authReducer(defaultState, testAction);
    expect(newState.get('error')).toEqual(testError)
  });
});
