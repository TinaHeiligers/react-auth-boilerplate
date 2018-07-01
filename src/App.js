import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from  './redux/store';
import { ConnectedRouter } from 'react-router-redux';
import LoginOptions from './authComponents/loginOptions';

class MainApp extends Component {
  render() {
    if (this.props.token) {
      return (<Restricted />)
    } else {
      return (<Public />)
    }
  }
}
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
  }),{})(MainApp);

class Restricted extends Component {
  render() {
    return(
      <ConnectedRouter history={history}>
        <div>
          <p>Nav bar goes here</p>
          <h1>Restricted</h1>
          <button onClick={() => console.log('trigger logout action')}>Log Out</button>
        </div>
      </ConnectedRouter>
    )
  }
}

class Public extends Component {
  render() {
    return(
      <ConnectedRouter history={history}>
        <div>
          <h1>Public</h1>
          <LoginOptions />
        </div>
      </ConnectedRouter>
    )
  }
}
