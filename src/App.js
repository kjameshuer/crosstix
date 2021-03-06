import React, { useEffect } from 'react';
import Builder from './features/Builder'
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import Dashboard from 'pages/Dashboard';
import './App.scss';
import Header from 'features/Header';
import PrivateRoute from 'app/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from 'pages/Profile';


function App() {

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/builder/:id" component={Builder} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
