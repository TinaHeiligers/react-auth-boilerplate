const authActions = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOG_OUT: 'LOG_OUT',
  AUTH_FAILURE_EMAIL_NOT_VALID: 'AUTH_FAILURE_EMAIL_NOT_VALID',
  authorize: (login, password) => ({
    type: authActions.AUTH_REQUEST,
    payload: { login, password }
  }),
  logOut: () => ({
    type: authActions.LOG_OUT,
  }),
  authFailureEmailNotValid: (message) => ({
    type: authActions.AUTH_FAILURE_EMAIL_NOT_VALID,
    error: message,
  })
};
export default authActions;