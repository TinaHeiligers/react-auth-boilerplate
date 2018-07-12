import { Map } from 'immutable';
import authActions from './authActions';

const initialState = new Map({
  token: null,
  googleTempToken: null,
  error: null,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS: {
      return state.set('token', action.token);
    }
    case authActions.AUTH_FAILURE: {
      return state.set('error', action.error);
    }
    case authActions.LOG_OUT: {
      const removedTokenState = state.set('token', null);
      const removedGoogleTempTokenState = removedTokenState.set('googleTempToken', null);
      return removedGoogleTempTokenState;
    }
    case authActions.AUTH_FAILURE_EMAIL_NOT_VALID: {
      return state.set('error', action.error);
    }
    case authActions.AXIOS_LOGIN_GOOGLE_SUCCESS: {
      return state.set('token', action.token)
    }
    default:
      return state;
  }
};
export default authReducer;