import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authorize } from '../../redux/auth/authActions';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(input, value) {
    this.setState({ [input]: value });
  }

  onSubmit() {
    const { login, password } = this.state;
    this.props.dispatch(authorize(login, password));
  }

  render() {
    const { error, token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <input
          type='text'
          placeholder='login'      
          value={this.state.login}
          onChange={this.onChange.bind(this, 'login')}
        />
        <input
          type='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.onChange.bind(this, 'password')}
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.auth.token,
    error: state.auth.error
  }, { authorize }))(SignIn);

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