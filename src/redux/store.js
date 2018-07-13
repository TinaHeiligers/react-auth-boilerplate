import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, push } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
// import reduxCookiesMiddleware from 'redux-cookies-middleware';
// import {getStateFromCookies} from 'redux-cookies-middleware';

import allReducers from './allReducers'; // these are already combined 
import rootSaga from './allSagas';
// paths is the path to the redux state that has to be synced with the cookies middleware:
// const paths = {
//   auth: {
//     location: { 
//       name: 'redirect'
//     },
//     session: { 
//       name: 'session'
//     }
//   },
// };
// read stored cookies into store, NB: Need to refactor to use Immutable
// const initialState = getStateFromCookies(initialState, persistCookies);
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware, logger];

const store = createStore(
  allReducers,
  compose(applyMiddleware(...middlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
);

sagaMiddleware.run(rootSaga);
store.dispatch(push('/'));

export { store, history };
// coookies: https://www.npmjs.com/package/redux-cookies-middleware