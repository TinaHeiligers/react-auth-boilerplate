import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';
import * as reducers from './allReducers';
import rootSaga from './allSagas';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware, logger];
const combinedReducers = combineReducers({ 
  ...reducers, router: routerReducer,
});
const rootReducer = (state, action) => {
  // clearing state on logout, uncomment to use
  // if (action.type === 'LOGOUT') {
  //   state = undefined
  // }
  return combinedReducers(state, action)
};

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga);

export { store, history };