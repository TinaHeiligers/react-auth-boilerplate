/* global describe, it, expect */
import authActions from './authActions';

describe.only('>>Auth Action Creator', () => {
  it('++actionCreator authorize', () => {
    const testLogin = 'test@example.com';
    const testPassword = 'password';
    const testAuthorize = authActions.authorize(testLogin, testPassword);
    expect(testAuthorize).toEqual({
      type: authActions.AUTH_REQUEST,
      payload: { login: testLogin, password: testPassword },
    });
  });
  it('++actionCreator authorizeSuccess', () => {
    const testToken = '12345abc';
    const testAuthorizeSuccess = authActions.authorizeSuccess(testToken);
    expect(testAuthorizeSuccess).toEqual({
      type: authActions.AUTH_SUCCESS,
      token: testToken,
    });
  });
  it('++actionCreator authError', () => {
    const testError = new Error('');
    const testAuthError = authActions.authError(testError);
    expect(testAuthError).toEqual({
      type: authActions.AUTH_FAILURE,
      error: testError,
    });
  });
  it('++actionCreator logOut', () => {
    const testlogOut = authActions.logOut();
    expect(testlogOut).toEqual({
      type: authActions.LOG_OUT,
    });
  });
  it('++actionCreator authFailureEmailNotValid with an error message', () => {
    const testMessage = '';
    const testAuthFailureEmailNotValid = authActions.authFailureEmailNotValid(testMessage);
    expect(testAuthFailureEmailNotValid).toEqual({
      type: authActions.AUTH_FAILURE_EMAIL_NOT_VALID,
      error: testMessage,
    });
  });
  it('++actionCreator authFailureEmailNotValid without an error message', () => {
    const testAuthFailureEmailNotValid = authActions.authFailureEmailNotValid();
    expect(testAuthFailureEmailNotValid).toEqual({
      type: authActions.AUTH_FAILURE_EMAIL_NOT_VALID,
      error: 'Email Not Valid',
    });
  });
  it('++actionCreator verifyTempGoogleToken', () => {
    const testTempToken = 'tempToken';
    const testVerifyTempGoogleToken = authActions.verifyTempGoogleToken(testTempToken);
    expect(testVerifyTempGoogleToken).toEqual({
      type: authActions.VERIFY_TEMP_TOKEN_REQUEST,
      tempToken: testTempToken,
    });
  });
  it('++actionCreator verifyTempGoogleTokenSuccess', () => {
    const testTempToken = 'tempToken';
    const testVerifyTempGoogleTokenSuccess = authActions.verifyTempGoogleTokenSuccess(testTempToken);
    expect(testVerifyTempGoogleTokenSuccess).toEqual({
      type: authActions.VERIFY_TEMP_TOKEN_SUCCESS,
      token: testTempToken,
    });
  });
  it('++actionCreator authGoogleFailure with an error message', () => {
    const testMessage = 'An Error Message';
    const testauthGoogleFailure = authActions.authGoogleFailure(testMessage);
    expect(testauthGoogleFailure).toEqual({
      type: authActions.AUTH_FAILURE_GOOGLE,
      error: testMessage,
    });
  });
  it('++actionCreator authGoogleFailure without an error message', () => {
    const testauthGoogleFailure = authActions.authGoogleFailure();
    expect(testauthGoogleFailure).toEqual({
      type: authActions.AUTH_FAILURE_GOOGLE,
      error: 'google auth error',
    });
  });
});
// TODO: add tests for:
/* 
authGoogleFailure
*/