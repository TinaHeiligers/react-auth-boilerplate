import { Map } from 'immutable';
import authActions from './authActions';

const initialState = new Map({
  token: null,
  googleToken: null,
  error: null,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS: {
      return state.set('token', action.payload);
    }
    case authActions.AUTH_FAILURE: {
      return state.set('error', action.payload);
    }
    case authActions.LOG_OUT: {
      return state.set('token', null);
    }
    default:
      return state;
  }
};
export default authReducer;