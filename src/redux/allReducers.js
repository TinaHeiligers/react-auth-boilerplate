import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import appReducer from './app/appReducer';
import authReducer from './auth/authReducer';
// import Counter from './counter/counterReducer';
// TODO: add counterReducer.
const allReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  routing: routerReducer,
})
// clearing the store except for routing on log out.
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    const { routing } = state
    state = { routing } 
  }
  return allReducers(state, action)
}

export default allReducers;
