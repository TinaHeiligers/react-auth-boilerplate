  import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, push } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';

import logger from 'redux-logger';

import allReducers from './allReducers'; // these are already combined
import rootSaga from './allSagas';

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