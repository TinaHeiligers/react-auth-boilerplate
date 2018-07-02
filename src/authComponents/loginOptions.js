import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import SignInBasic from './signInBasic';
import SignInWithGoogle from './signInWithGoogle';

class LoginOptions extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li>
            <Link to="/login/basic">
              Log In With Email
            </Link>
          </li>
          <li>
            <Link to="/login/google">
              Log In With Google
            </Link>
          </li>
        </ul>
        <Route path="/login/basic" component={SignInBasic} />
        <Route path="/login/google" component={SignInWithGoogle} />
      </div>
    );
  }
}

export default LoginOptions;