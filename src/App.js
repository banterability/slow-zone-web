// @flow
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "./Header/Header";
import Stations from "./Stations/Stations";
import Home from "./Home/Home";
import Recent from "./Recent/Recent";
import Nearby from "./Nearby/Nearby";

const App = () => (
  <Router>
    <Header />

      <main>
        <Route path="/" exact component={Home} />
        <Route path="/stations" component={Stations} />
        <Route path="/nearby" component={Nearby} />
        <Route path="/recent" component={Recent} />
      </main>
  </Router>
);

export default App;
