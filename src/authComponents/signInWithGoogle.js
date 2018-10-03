import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../config.js';

class SignInWithGoogle extends Component {
  setCookieMakeRequest() {
    // set the cookie,
    document.cookie = `redirect=${config.baseUrl}/restricted`;
    window.location=`${config.apiUrl}/auth/google`;

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