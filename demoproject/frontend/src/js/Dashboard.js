import About from "./About";
import Home from "./Home";
import Song from "./Song";
import Tabs from "../components/Tabs";
// import React, { useState, useEffect } from "react";
import Navbar from './Navbar'
import Contact from './Contact'


import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function Dashboard() {

return (
    <div className="container">
        <Router>
            {/* <Navbar /> */}
            <Switch>

            <Route exact path="/Home">
              <Home />
            </Route>

            <Route path="Song">
              <Song />
            </Route>

            <Route path="About">
              <About />
            </Route>

            <Route path="Contact">
              <Contact />
            </Route>
          </Switch>
        </Router>
    </div>
);
}

export default Dashboard;