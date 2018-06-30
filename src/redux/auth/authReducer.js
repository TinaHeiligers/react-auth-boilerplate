import { Map } from 'immutable';
import authActions from './authActions';

const initialState = new Map({
  token: localStorage.getItem('token'),
  error: null,
});

const authReducer = (state = initialState, action => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS: {
      return state.set('token', action.payload);
    }
    case authActions.AUTH_FAILURE: {
      return state.set('error', action.payload);
    }
    default:
      return state;
  }
});
export default authReducer;