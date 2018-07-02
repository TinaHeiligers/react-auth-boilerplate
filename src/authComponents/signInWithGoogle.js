import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 
import authActions from '../redux/auth/authActions';
const { verifyTempGoogleToken, googleAuthError } = authActions;

class SignInWithGoogle extends Component {
  onSignInFailure = (errorResponse) => {
    console.log('Google Response:', errorResponse)
    this.props.gAuthError(errorResponse)
  }
  onSignIn = (googleAuth) => {
    const authResponse = googleAuth.getAuthResponse();
    console.log('authResponse:', authResponse)
    const idToken = authResponse.id_token; // this is the item we need to send to the server
    console.log('id_token:', idToken)
    this.props.verifyTempGToken(idToken);
  }

  responseGoogle = (response) => {
    console.log(response);
  }
  render() {
    return (
      <div>
        <div>
          <h1>Sign In</h1>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.onSignIn}
            onFailure={this.onSignInFailure}
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
  googleAuthError: PropTypes.func
}
export default connect(
  state => ({
    loading: state.getIn(['App', 'loading']),
    token: state.getIn(['auth', 'token']),
    googleTempToken: state.getIn(['auth', 'googleTempToken']),
    error: state.getIn(['auth', 'error'])
  }), { 
    verifyTempGoogleToken, 
    googleAuthError,
})(SignInWithGoogle);
