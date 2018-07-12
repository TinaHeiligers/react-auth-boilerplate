import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { GOOGLE_CLIENT_ID } from '../redux/auth/constants'; // TODO: extract .env and place this is there. 
import authActions from '../redux/auth/authActions';
const { axiosLoginGoogle } = authActions;

class SignInWithGoogle extends Component {
  loginToGoogleThroughServer = () => {
    console.log('Issue request to the server now')
    this.props.axiosLoginGoogle();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Sign In</h3>
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
  error: PropTypes.string,
}
export default connect(
  state => ({
    loading: state.getIn(['App', 'loading']),
    error: state.getIn(['auth', 'error'])
  }), { axiosLoginGoogle })(SignInWithGoogle);
