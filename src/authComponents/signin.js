import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Sign In</h1>
          <button type="button"><Link to="#">Sign in with Google</Link></button>
        </div>
      </div>
    );
  }
}

export default SignIn;
