import React, { Component } from 'react';
import { history } from  '../redux/store';
import { ConnectedRouter } from 'react-router-redux';
import LoginOptions from '../authComponents/loginOptions';

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
export default Public;