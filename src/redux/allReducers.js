import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import appReducer from './app/appReducer';
// import authReducer from './auth/authReducer'; TODO: Add me
import Counter from './counter/counterReducer';


const allReducers = combineReducers({
  auth: authReducer,
  router: routerReducer,
})

export default allReducers;

// const rootReducer = (state, action) => {
//   // clearing state on logout, uncomment to use
//   // if (action.type === 'LOGOUT') {
//   //   state = undefined
//   // }
//   return combinedReducers(state, action)
// };