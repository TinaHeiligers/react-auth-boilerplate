import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 

class SignInWithGoogle extends Component {

  render() {
    return (
      <div>
        <div>
          <h3>Sign In</h3>
          <a href={`http://localhost:4000/auth/google}`}>Login with Google</a>
        </div>
      </div>
    );
  }
}

export default SignInWithGoogle;
