import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 
import authActions from '../redux/auth/authActions';
const { verifyTempGoogleToken, authGoogleFailure } = authActions;

class SignInWithGoogle extends Component {
  onSignInFailure = (errorResponse) => {
    this.props.authGoogleFailure(errorResponse)
  }
  onSignIn = (googleAuth) => {
    const authResponse = googleAuth.getAuthResponse();
    const idToken = authResponse.id_token; // this is the item we need to send to the server
    this.props.verifyTempGoogleToken(idToken);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Sign In</h1>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.onSignIn}
            onFailure={this.onSignInFailure}
            isSignedIn={true}
        />
        </div>
      </div>
    );
  }
}
SignInWithGoogle.propTypes = {
  loading: PropTypes.string,
  token: PropTypes.string,
  googleTempToken: PropTypes.string,
  error: PropTypes.string,
  verifyTempGoogleToken: PropTypes.func.isRequired,
  authGoogleFailure: PropTypes.func
}
export default connect(
  state => ({
    loading: state.getIn(['App', 'loading']),
    token: state.getIn(['auth', 'token']),
    googleTempToken: state.getIn(['auth', 'googleTempToken']),
    error: state.getIn(['auth', 'error'])
  }), { 
    verifyTempGoogleToken, 
    authGoogleFailure,
})(SignInWithGoogle);
