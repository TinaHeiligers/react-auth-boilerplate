import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 

class SignInWithGoogle extends Component {
  onSignInFailure = (errorResponse) => {
    console.log('Google Response:', errorResponse)
  }
  onSignIn = (googleAuth) => {
    const authResponse = googleAuth.getAuthResponse();
    console.log('authResponse:', authResponse)
    const idToken = authResponse.id_token;
    console.log('id_token:', idToken)
    const tokenObject = authResponse.tokenObject
    console.log('tokenObject:', tokenObject)
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

export default connect(
  state => ({
    loading: state.getIn(['App', 'loading']),
    googleToken: state.getIn(['auth', 'googleToken']),
    error: state.getIn(['auth', 'error'])
  }), {})(SignInWithGoogle);

// export default connect(
//   state => ({
//     token: state.getIn(['auth', 'token']),
//     error: state.getIn(['auth', 'error'])
//   }, { authorize })
// )(SignInBasic);
