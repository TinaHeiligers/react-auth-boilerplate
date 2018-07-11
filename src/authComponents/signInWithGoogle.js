import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 
import authActions from '../redux/auth/authActions';
import {axiosLoginGoogle} from '../redux/auth/authServices';
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
  loginToGoogleThroughServer = () => {
    console.log('Issue request to the server now')
    axiosLoginGoogle();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Sign In</h3>
          {/*<GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.onSignIn}
            onFailure={this.onSignInFailure}
            isSignedIn={true}
        />*/}
        <button 
          type="button" 
          onClick={this.loginToGoogleThroughServer}
          style={{ width: '20vw', height: '5vh', color: 'blue', borderRadius: '10px' }}>Login with Google</button>
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
