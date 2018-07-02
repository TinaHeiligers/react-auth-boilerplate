import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import authActions from '../redux/auth/authActions';
const { authorize } = authActions;

class SignInBasic extends PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const login = this.login.value;
    const password = this.password.value;
    this.props.authorize(login, password);
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
SignInBasic.propTypes = {
  token: PropTypes.string,
  error: PropTypes.string,
  authorize: PropTypes.func.isRequired,
}
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
    error: state.getIn(['auth', 'error'])
  }), { authorize }
)(SignInBasic);
