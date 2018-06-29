import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

class HomeRouter extends Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/help`}
          component={ Help }
        />
        <Route
          exact
          path={`${url}/counter`}
          component={ Counter }
        />
      </Switch>
    );
  }
}

export default HomeRouter;

class Help extends Component {
  render() {
    <div>Help!</div>
  };
};