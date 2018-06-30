import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import Home from '../homeComponents/Home';
import App from '../App';
import SignIn from '../authComponents/signin';
import FourZeroFour from '../otherComponents/404';
import FiveHundred from '../otherComponents/500';
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
    <Router history={ history }>
      <div>
        <Route
          exact
          path={'/'}
          component={App}
        />
        {/*<Route
          exact
          path={'/signin'}
          component={SignIn}
        />*/}
        <Route
          exact
          path={'/404'}
          component={FourZeroFour}
        />
        <Route
          exact
          path={'/500'}
          component={FiveHundred}
        />
        <RestrictedRoute
          path="/home"
          component={Home}
          isLoggedIn={isLoggedIn}
        />
        {/*<RestrictedRoute
          path="/counter"
          component={import('./counterComponents/counter')}
          // isLoggedIn={isLoggedIn}
        />*/}
      </div>
  </Router>    
  );
};

export default connect(state => ({
  counter: state.Counter
  // isLoggedIn: state.Auth.idToken !== null // TODO: createAuth in redux
}))(PublicRoutes);
