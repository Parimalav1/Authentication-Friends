import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import FriendsList from './components/FriendsList';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <Router>
    <div className="App">
      <ul>
        <li>
          <Link to='/Login'>Login</Link>
        </li>
        <li>
          <Link to='/'> Friends</Link>
        </li>
      </ul>
      <Switch>
      {/* <PrivateRoute path='/' component={FriendsList} /> */}
        <PrivateRoute exact path='/'>
          <FriendsList />
        </PrivateRoute>
        <Route path='/login' component={Login} />{''}
        {/* history, match, location */}
        <Route component={Login} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
