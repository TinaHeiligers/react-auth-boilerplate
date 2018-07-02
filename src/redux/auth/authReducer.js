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
      return state.set('error', action.token);
    }
    case authActions.LOG_OUT: {
      return state.set('token', null);
    }
    case authActions.AUTH_FAILURE_EMAIL_NOT_VALID: {
      return state.set('error', action.error);
    }
    case authActions.VERIFY_TEMP_TOKEN_REQUEST: {
      return state.set('googleTempToken', action.tempToken)
    }
    case authActions.VERIFY_TEMP_TOKEN_SUCCESS: {
      return state.set('token', action.token)
    }
    case authActions.AUTH_FAILURE_GOOGLE: {
      return state.set('error', action.error);
    }
    default:
      return state;
  }
};
export default authReducer;