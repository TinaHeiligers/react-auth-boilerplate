import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateEmail } from '../utils/validations';
import authActions from '../redux/auth/authActions';
import config from '../config.js';
const { authorize, authFailureEmailNotValid } = authActions;


class SignInBasic extends PureComponent {
  setLocationCookie() {
    document.cookie = `redirect=${config.baseUrl}/restricted`;
  }
  loginSubmit(e) {
    e.preventDefault();
    this.setLocationCookie();
    const login = this.login.value;
    const password = this.password.value;
    if (validateEmail(login)) {
      this.props.authorize(login, password);
    } else {
      this.props.authFailureEmailNotValid('not a valid email address');
    }
  }

  render() {
    const { error, token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
          <form onSubmit={(e) => this.loginSubmit(e)}>
            <div>
              <input
                ref={_ref => this.login = _ref}
                type="email"
                placeholder="email"
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
              <button type='submit'>Submit</button>
            </div>
          </form>
      </div>
    );
  }
}
SignInBasic.propTypes = {
  token: PropTypes.string,
  error: PropTypes.string,
  authorize: PropTypes.func.isRequired,
  authFailureEmailNotValid: PropTypes.func,
}
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
    error: state.getIn(['auth', 'error'])
  }), { 
    authorize, 
    authFailureEmailNotValid,
  })(SignInBasic);
// store a cookie on where we want to go back to,
// TODO: api server picks up the cookie and looks for a redirect url
// TODO: that we pass to the redirect