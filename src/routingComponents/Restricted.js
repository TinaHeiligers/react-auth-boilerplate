import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from  '../redux/store';
import { ConnectedRouter } from 'react-router-redux';
import authActions from '../redux/auth/authActions';
const { logOut } = authActions;

class Restricted extends Component {
  constructor(props) {
    super(props);
    this.onLogOut = this.onLogOut.bind(this);
  }
  onLogOut() {
    this.deleteAllCookies();
    this.props.logOut();
  }
  deleteAllCookies() {
    let cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  render() {
    const allCookies = document.cookie;
    console.log('allCookies:', allCookies);
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
export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
  }), { 
    logOut,
})(Restricted);
