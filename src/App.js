import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restricted from './routingComponents/Restricted';
import Public from './routingComponents/Public';

class MainApp extends Component {
  componentDidMount() {
    const allCookies = document.cookie;
    console.log('allCookies', allCookies)
    if (allCookies) {
      const cookiesArray = allCookies.split(';')
      const cookiesObjects = cookiesArray.map((cookieString) => {
        return {
          name: cookieString.split('=')[0],
          value: cookieString.split('=')[1],
        };
      });
      console.log('cookiesObjects', cookiesObjects)
      // send these to the redux store.
    }
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
