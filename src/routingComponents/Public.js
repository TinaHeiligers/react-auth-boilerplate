import React, { Component } from 'react';
import { history } from  '../redux/store';
import { ConnectedRouter } from 'react-router-redux';
import LoginOptions from '../authComponents/loginOptions';

class Public extends Component {
  componentDidMount() {
    const allCookies = document.cookie;
    console.log('allCookies', allCookies)
    // if (allCookies) {
    
    //   const redirectCookieIndex = allCookies.match("redirect=").index
    //   const sessionCookieIndex = allCookies.match("session=").index
    //   console.log('Redirect:', allCookies.substring(redirectCookieIndex, sessionCookieIndex))
    //   console.log('Session:', allCookies.substring(sessionCookieIndex))
    //   }
  }
  
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