import React, { useState, useEffect } from 'react';
import Builder from './features/Builder'
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import './App.scss';
import Header from 'features/Header';
import PrivateRoute from 'app/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {


  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path="/builder" component={Builder} />
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