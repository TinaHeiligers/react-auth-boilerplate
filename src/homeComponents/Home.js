import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = ({ token }) => {
  if (!token) {
    return <Redirect to="/login" />;
  }
  return ( 
    <div>
      <h1>Home</h1>
      <p>You are logged in.</p>
    </div>);
};

const mapStateToProps = (state) => ({
  token: state.getIn(['auth', 'token'])
});

export default connect(mapStateToProps)(Home);