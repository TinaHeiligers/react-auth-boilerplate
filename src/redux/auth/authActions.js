const authActions = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOG_OUT: 'LOG_OUT',
  authorize: (login, password) => ({
    type: authActions.AUTH_REQUEST,
    payload: { login, password }
  }),
  logOut: () => ({
    type: authActions.LOG_OUT,
  })
};
export default authActions;