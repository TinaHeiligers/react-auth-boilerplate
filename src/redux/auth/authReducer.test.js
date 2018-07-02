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
    console.log('testAction', testAction)
    const newState = authReducer(defaultState, testAction);
    console.log(newState)
    expect(newState.get('token')).toEqual(testToken);
  });
  // it('updates state on SWITCH_PLAYER', () => {
  //   const testPlayer1 = Immutable.Map({ 'name': 'testPlayer1', 'playerScore': 0 });
  //   const testPlayer2 = Immutable.Map({ 'name': 'testPlayer2', 'playerScore': 0 });
  //   const testState = defaultState.update('all', all => all.push(testPlayer1))
  //   const testState2 = testState.update('all', all => all.push(testPlayer2))
  //   const testState3 = testState2.set('current', 0);
  //   const testAction = authActions.switchPlayer();
  //   const newState = reducer(testState3, testAction);
  //   expect(newState.get('current')).toEqual(1);
  // });
});
/* TODO:
AUTH_SUCCESS
AUTH_FAILURE
LOG_OUT
AUTH_FAILURE_EMAIL_NOT_VALID
VERIFY_TEMP_TOKEN_REQUEST
VERIFY_TEMP_TOKEN_SUCCESS
AUTH_FAILURE_GOOGLE
*/