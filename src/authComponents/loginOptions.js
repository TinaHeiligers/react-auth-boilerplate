import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginOptions extends React.Component {
  render () {
    return (
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
    );
  }
}

export default LoginOptions;