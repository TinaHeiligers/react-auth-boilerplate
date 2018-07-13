import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restricted from './routingComponents/Restricted';
import Public from './routingComponents/Public';

class MainApp extends Component {
  componentDidMount() {
    const allCookies = document.cookie;
    // const sessionCookieIndex = allCookies.
    const redirectCookieIndex = allCookies.match("redirect=").index
    const sessionCookieIndex = allCookies.match("session=").index
    const redirect = allCookies.substring(redirectCookieIndex, sessionCookieIndex)
    const session = allCookies.substring(sessionCookie)
    
    console.log(redirect)
    console.log(session)
    // find the index of the 'redirect' cookie
    // find the index of the session cookie
  
    
  }
  render() {
    if (this.props.token) {
      return (<Restricted />)
    } else {
      return (<Public />)
    }
  }
}
MainApp.propTypes = {
  token: PropTypes.string,
}
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
  }),{})(MainApp);
