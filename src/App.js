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
      /* send all the cookies to the redux methods,
      extract the location and session cookie if they are there
      save these to the store state items
      */
      this.props.extractCookies(allCookies);
      // const cookiesArray = allCookies.split(';')
      // const cookiesObjects = cookiesArray.map((cookieString) => {
      //   return {
      //     name: cookieString.split('=')[0],
      //     value: cookieString.split('=')[1],
      //   };
      // });
      // send these to the redux store.
      
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
}
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
    session: state.getIn(['auth', 'session']),
    redirect: state.getIn(['auth', 'redirect']),
  }),{
    extractCookies,
  })(MainApp);
