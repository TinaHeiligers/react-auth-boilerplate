import React, { Component } from 'react';
import { history } from  '../redux/store';
import { ConnectedRouter } from 'react-router-redux';
import LoginOptions from '../authComponents/loginOptions';

class Public extends Component {
  render() {
    return(
      <ConnectedRouter history={history}>
        <div style={ { margin: '10vh auto', padding: '10vh', textAlign:'center', width: '20vw', border: '1px solid goldenrod' } }>
          <h1>Public</h1>
          <LoginOptions />
        </div>
      </ConnectedRouter>
    )
  }
}
export default Public;