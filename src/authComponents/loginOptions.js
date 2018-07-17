import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import SignInBasic from './signInBasic';
import SignInWithGoogle from './signInWithGoogle';

class LoginOptions extends Component {
  render () {
    return (
      <div style={{ margin: '0 auto', width: '20vw' }}>
        <ul style={ { listStyleType: 'none', paddingLeft: 0 } }>
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