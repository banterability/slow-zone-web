import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

import Stations from "./Stations/Stations";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className="top-bar">
            <nav>
              <Link to="/">Home</Link>
              <Link to="/stations">Stations</Link>
            </nav>
          </header>
          
          <Route path="/stations" component={Stations} />
        </div>
      </Router>
    );
  }
}

export default App;
