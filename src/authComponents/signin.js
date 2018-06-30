import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import authActions from '../redux/auth/authActions';
const { authorize } = authActions;

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const login = this.login.value;
    const password = this.password.value;
    this.props.dispatch(authorize(login, password));
  }

  render() {
    const { error, token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <input
            ref={_ref => this.login = _ref}
            type="text"
            placeholder="login"
          />
        </div>
        <div>
          <input
            ref={_ref => this.password = _ref}
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  token: PropTypes.string,
  error: PropTypes.string,
  authorize: PropTypes.func.isRequired,
}
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
    error: state.getIn(['auth', 'error'])
  }, { authorize })
)(SignIn);

/*import React, { Component } from 'react';
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
*/