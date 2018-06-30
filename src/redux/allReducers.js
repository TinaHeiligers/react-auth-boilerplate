import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import appReducer from './app/appReducer';
import authReducer from './auth/authReducer';
// import Counter from './counter/counterReducer';
// TODO: add counterReducer.
const allReducers = combineReducers({
  auth: authReducer,
  router: routerReducer,
})

export default allReducers;
