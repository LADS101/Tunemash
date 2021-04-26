import './App.css';
import Tabs from "./components/Tabs";
// import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './js/Home'
import Song from './js/Song'
import About from './js/About'
import Navbar from './js/Navbar'
import Contact from './js/Contact'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/Song">
              <Song />
            </Route>

            <Route path="/About">
              <About />
            </Route>

            <Route path="/Contact">
              <Contact />
            </Route>
          </Switch>
      </div>
    </Router>

  );
}

export default App;