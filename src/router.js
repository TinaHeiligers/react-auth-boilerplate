import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import Home from './homeComponents/Home';
// import Auth0 from './helpers/auth0';

const RestrictedRoute = ({ component: Component, path , isLoggedIn }) =>
  <Route
    path={ path }
    render={
      props => isLoggedIn ?
        <Component {...props} /> : <Redirect to={ { pathname: '/signin', state: { from: props.location } } }/>
          } />;

const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={import('./App'))}
        />
        <Route
          exact
          path={'/signin'}
          component={import('./authComponents/signin'))}
        />
        <Route
          exact
          path={'/404'}
          component={import('./otherComponents/404'))}
        />
        <Route
          exact
          path={'/500'}
          component={import('./otherComponents/500'))}
        />
        {/*<RestrictedRoute
          path="/home"
          component={Home}
          isLoggedIn={isLoggedIn}
        />*/}
        <RestrictedRoute
          path="/counter"
          component={import('./counterComponents/counter')}
          // isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  counter: state.Counter.counter;
  // isLoggedIn: state.Auth.idToken !== null // TODO: createAuth in redux
}))(PublicRoutes);
