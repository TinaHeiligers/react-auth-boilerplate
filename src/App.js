import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import SignInBasic from './authComponents/signInBasic';
import SignInWithGoogle from './authComponents/signInWithGoogle';
import Home from './homeComponents/Home';
import LoginOptions from './authComponents/loginOptions';

const App = props => {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <div>
      <AuthButton history={history}/>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
          {/*<li>
            <Link to="/login/basic">Login In With Email</Link>
          </li>
          <li>
            <Link to="/login/google">Login In With Google</Link>
          </li>*/}
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/protected" component={Protected} />
          <Route path="/login/options" component={LoginOptions} /> 
          <Route path="/login/basic" component={SignInBasic} />
          <Route path="/login/google" component={SignInWithGoogle} />
        </Switch>
        </div>
    </ConnectedRouter>
  );
};

export default App;
//*******************************fake
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = ({ history }) =>
  fakeAuth.isAuthenticated ? 
  (
    <p>Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      > Sign out </button></p>
    ) : (<p>You are not logged in.</p>);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => fakeAuth.isAuthenticated ? 
      (<Component {...props} />) : (
        <Redirect
          to={{
            pathname: "/login/options",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const Protected = () => <h3>Protected</h3>;