import './App.css';
import Tabs from "./components/Tabs";
// import React, { useState, useEffect } from "react";
import Dashboard from "./js/Dashboard"

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './js/Home'
import Song from './js/Song'
import About from './js/About'
import Navbar from './js/Navbar'
import Contact from './js/Contact'
import Login from './components/Login'
import Logout from './components/Logout'

function App() {

  // const loggedIn = False;

  return (
    

      
    // <Router>
    //   <div className="App">
    //       <Switch>
    //         <Route exact path="/">
    //           <Login />
    //           <Logout />
    //         </Route>

    //         <Route exact path="/dashboard">
    //           <Dashboard />
    //         </Route>

    //         {/* <Navbar />

    //         <Switch>

    //         <Route exact path="/Home">
    //           <Home />
    //         </Route>

    //         <Route path="/Song">
    //           <Song />
    //         </Route>

    //         <Route path="/About">
    //           <About />
    //         </Route>

    //         <Route path="/Contact">
    //           <Contact />
    //         </Route>
    //       </Switch> */}
    //       </Switch>
    //     {/* </Router> */}
          
    //   </div>
    // </Router>

    <Router>
      <div className="App">
      
        <Navbar />
          <Switch>
          <Route exact path="/">
              <h4>Welcome To Tunemash!</h4>
              <p>In order to be able unleash your musical creativity, please log in:</p>
              <Login />
            </Route>

            <Route exact path="/Home">
              <Home />
              <Logout />
            </Route>

            <Route path="/Song">
              <Song />
              <Logout />
            </Route>

            <Route path="/About">
              <About />
            </Route>

            <Route path="/Contact">
              <Contact />
              <Logout />
            </Route>
          </Switch>
      </div>
    </Router>

  );
}

export default App;