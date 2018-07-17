const authActions = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOG_OUT: 'LOG_OUT',
  //Email and password log in
  AUTH_FAILURE_EMAIL_NOT_VALID: 'AUTH_FAILURE_EMAIL_NOT_VALID',
  // Google log in
  AXIOS_LOGIN_GOOGLE_REQUEST: 'AXIOS_LOGIN_GOOGLE_REQUEST',
  EXTRACT_COOKIES: 'EXTRACT_COOKIES',

  authorize: (username, password) => ({
    type: authActions.AUTH_REQUEST,
    payload: { username, password }
  }),
  authorizeSuccess: (token) => ({
    type: authActions.AUTH_SUCCESS,
    token,
  }),
  authError: (error = 'error') => ({
    type: authActions.AUTH_FAILURE,
    error: error,
  }),
  logOut: () => ({
    type: authActions.LOG_OUT,
  }),
  authFailureEmailNotValid: (message = 'Email Not Valid') => ({
    type: authActions.AUTH_FAILURE_EMAIL_NOT_VALID,
    error: message,
  }),
  axiosLoginGoogle: () => ({
    type: authActions.AXIOS_LOGIN_GOOGLE_REQUEST,
  }),
  axiosLoginGoogleSuccess: (token) => ({
    type: authActions.AXIOS_LOGIN_GOOGLE_SUCCESS,
    token, //will be a JWT token as the payload, we also get it in the header as Authorization and in the cookie
  }),
  extractCookies: (allCookiesString) => ({
    type: authActions.EXTRACT_COOKIES,
    allCookies: allCookiesString,
  }),
};
export default authActions;