import { Map } from 'immutable';
import authActions from './authActions';
// add in a state for cookies (redirect and session)
const initialState = new Map({
  token: null,
  googleTempToken: null, // if we user the temp token clinet-direct Google login method.
  error: null,
  redirect: null, // the login redirect url
  session: null, // the JWT session cookie
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_SUCCESS: {
      return state.set('token', action.token);
    }
    case authActions.AUTH_FAILURE: {
      return state.set('error', action.error);
    }
    case authActions.LOGOUT_SUCCESS: {
      document.cookie = `redirect=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      return state.merge({
        token: null,
        googleTempToken: null,
        session: null,
        redirect: null,
      });
    }
    case authActions.AUTH_FAILURE_EMAIL_NOT_VALID: {
      return state.set('error', action.error);
    }
    case authActions.AXIOS_LOGIN_GOOGLE_SUCCESS: {
      return state.set('token', action.token)
    }
    case authActions.EXTRACT_COOKIES:
      const cookiesArray = action.allCookies.split('; ')
      const cookiesObjects = cookiesArray.map((cookieString) => {
        return {
          name: cookieString.split('=')[0],
          value: cookieString.split('=')[1],
        };
      });
      return state.merge({
        redirect: cookiesObjects.find((item) => item.name === 'redirect'),
        session: cookiesObjects.find((item) => item.name === 'session'),
      })
    default:
      return state;
  }
};
export default authReducer;