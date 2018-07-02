const authActions = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOG_OUT: 'LOG_OUT',
  //Email and password log in
  AUTH_FAILURE_EMAIL_NOT_VALID: 'AUTH_FAILURE_EMAIL_NOT_VALID',
  // Google log in
  VERIFY_TEMP_TOKEN_REQUEST: 'VERIFY_TEMP_TOKEN_REQUEST',
  VERIFY_TEMP_TOKEN_SUCCESS: 'VERIFY_TEMP_TOKEN_SUCCESS',
  AUTH_FAILURE_GOOGLE: 'AUTH_FAILURE_GOOGLE',
  authorize: (login, password) => ({
    type: authActions.AUTH_REQUEST,
    payload: { login, password }
  }),
  authorizeSuccess: (token) => ({
    type: authActions.AUTH_SUCCESS,
    token,
  }),
  authError: (error = 'error') => ({
    type: authActions.AUTH_FAILURE,
    error,
  }),
  logOut: () => ({
    type: authActions.LOG_OUT,
  }),
  authFailureEmailNotValid: (message) => ({
    type: authActions.AUTH_FAILURE_EMAIL_NOT_VALID,
    error: message,
  }),
  // GOOGLE LOG IN TEMP TOKEN: 
  verifyTempGoogleToken: (tempIdToken) => ({
    type: authActions.VERIFY_TEMP_TOKEN_REQUEST,
    tempToken: tempIdToken,
  }),
  verifyTempGoogleTokenSuccess: (token) => ({
    type: authActions.VERIFY_TEMP_TOKEN_SUCCESS,
    token,
  }),
  googleAuthError: (error) => ({
    type: authActions.AUTH_FAILURE_GOOGLE,
    error,
  }),
};
export default authActions;