import About from "./About";
import Home from "./Home";
import Song from "./Song";
import Tabs from "../components/Tabs";
// import React, { useState, useEffect } from "react";
import Navbar from './Navbar'
import Contact from './Contact'
import Login from '../components/Login'
import Logout from '../components/Logout'


import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function LoginPage() {

return (
    <div className="container">

        <h1>Tunemash</h1>


        <p color='white'>Login using your Google account to continue:</p>
        <Login />
        

    </div>
);
}

export default LoginPage;