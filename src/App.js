import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/Wallet" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </div>

    );
  }
}

export default App;
