import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import GoogleLogin from 'react-google-login';
import SignIn from './authComponents/signin';
import './App.css';


class App extends Component {

  render() {
    const appProps = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-logo">TW</h1>
          <h2 className="App-title">Welcome to React for Auth!</h2>
        </header>
        <p className="App-intro">
          Log in options below
          <SignIn />
        </p>
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.App,
  // isLoggedIn: state.Auth.idToken !== null // TODO: createAuth in redux
}))(App);
