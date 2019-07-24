// @flow
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";

const Nearby = React.lazy(() => import("./Nearby/Nearby"));
const Recent = React.lazy(() => import("./Recent/Recent"));
const Stations = React.lazy(() => import("./Stations/Stations"));

const App = () => (
  <Router>
    <Header />

    <main>
      <React.Suspense fallback={<p>loading</p>}>
        <Route path="/" exact component={Home} />
        <Route path="/stations" component={Stations} />
        <Route path="/nearby" component={Nearby} />
        <Route path="/recent" component={Recent} />
      </React.Suspense>
    </main>
  </Router>
);

export default App;
