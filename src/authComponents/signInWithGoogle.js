import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 

class SignInWithGoogle extends Component {
  setCookieMakeRequest() {
    // set the cookie,
    document.cookie = `redirect=http://localhost:3000/restricted`;
    window.location=`http://localhost:4000/auth/google`;

  }
  render() {
    return (
      <div>
        <div>
          <h3>Sign In</h3>
          <button 
            onClick={this.setCookieMakeRequest}
            >Login with Google</button>
        </div>
      </div>
    );
  }
}

export default SignInWithGoogle;
// TODO: store a cookie on where we want too goo back to,
// api server picks up the cookie and looks for a redirect url
// that we pass to the redirect