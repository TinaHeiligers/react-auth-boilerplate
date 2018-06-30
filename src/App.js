import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import GoogleLogin from 'react-google-login';
import './App.css';
import { GOOGLE_CLIENT_ID } from './redux/auth/constants'; // TODO: extract .env and place this is there. 
class App extends Component {

  responseGoogle = (response) => {
    console.log('Google Response:', response)
  }
  render() {
    const appProps = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-logo">TW</h1>
          <h2 className="App-title">Welcome to React for Auth!</h2>
        </header>
        <p className="App-intro">
          Log in below
        </p>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.App,
  // isLoggedIn: state.Auth.idToken !== null // TODO: createAuth in redux
}))(App);
