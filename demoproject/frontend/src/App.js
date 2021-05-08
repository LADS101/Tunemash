import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './js/Home'
import Song from './js/Song'
import About from './js/About'
import Navbar from './js/Navbar'
import Contact from './js/Contact'
import Login from './components/Login'
import Logout from './components/Logout'

function App() {
  return (
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