import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GOOGLE_CLIENT_ID } from './redux/auth/constants'; // TODO: extract .env and place this is there. 

class SignIn extends Component {
  responseGoogle = (response) => {
    console.log('Google Response:', response)
  }
  render() {
    return (
      <div>
        <div>
          <h1>Sign In</h1>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
        />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.App.loading || false;
    // isSignedIn: state.Auth.isSignedIn TODO: get this from Google Auth Component
  }, 
  // {} dispatchers
)(SignIn);
