import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Home from './homeComponents/Home';
import SignIn from './authComponents/signin';

const App = props => {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/" component={Home} />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
