import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restricted from './routingComponents/Restricted';
import Public from './routingComponents/Public';
import authActions from './redux/auth/authActions'
const { extractCookies } = authActions;

class MainApp extends Component {
  componentDidMount() {
    const allCookies = document.cookie;
    if (allCookies) {
      this.props.extractCookies(allCookies);
    }
  }
  render() {
    if (this.props.token || this.props.session) {
      return (<Restricted />)
    } else {
      return (<Public />)
    }
  }
}

MainApp.propTypes = {
  token: PropTypes.string,
  session: PropTypes.string,
  redirect: PropTypes.string,
  extractCookies: PropTypes.func,
}

export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
    session: state.getIn(['auth', 'session']),
    redirect: state.getIn(['auth', 'redirect']),
  }),{
    extractCookies,
  })(MainApp);
