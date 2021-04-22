import './App.css';
import Tabs from "./components/Tabs";
// import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Song from './Song';
import About from './About'
import Navbar from './Navbar';


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
          <div className="content">
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
            </Switch>
          </div>
      </div>
    </Router>

  );
}

export default App;