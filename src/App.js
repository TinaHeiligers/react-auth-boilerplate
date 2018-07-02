import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from  './redux/store';
import { ConnectedRouter } from 'react-router-redux';
import Restricted from './routingComponents/Restricted';
import Public from './routingComponents/Public';

class MainApp extends Component {
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
