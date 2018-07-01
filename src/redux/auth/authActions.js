const authActions = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  authorize: (login, password) => ({
    type: authActions.AUTH_REQUEST,
    payload: { login, password }
  })
};
export default authActions;