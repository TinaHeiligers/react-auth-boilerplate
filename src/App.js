import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from  './redux/store';
import { ConnectedRouter } from 'react-router-redux';
import LoginOptions from './authComponents/loginOptions';
import authActions from './redux/auth/authActions';
const { logOut } = authActions;

class MainApp extends Component {
  render() {
    if (this.props.token) {
      return (<RestrictedComponent />)
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
  constructor(props) {
    super(props);
    this.onLogOut = this.onLogOut.bind(this);
  }
  onLogOut() {
    console.log('In Re')
    this.props.logOut();
  }
  render() {
    return(
      <ConnectedRouter history={history}>
        <div>
          <p>Nav bar goes here</p>
          <h1>Restricted</h1>
          <button onClick={this.onLogOut}>Log Out</button>
        </div>
      </ConnectedRouter>
    )
  }
}
const RestrictedComponent = connect(null, { logOut })(Restricted);

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
