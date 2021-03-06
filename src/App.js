// @flow
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Favorites from "./Favorites/Favorites";
import Header from "./Header/Header";
import LoadingBar from "./Components/LoadingBar";

const Nearby = React.lazy(() =>
  import(/* webpackChunkName: "nearby" */ "./Nearby/Nearby")
);
const Recent = React.lazy(() =>
  import(/* webpackChunkName: "recent" */ "./Recent/Recent")
);
const Stations = React.lazy(() =>
  import(/* webpackChunkName: "stations" */ "./Stations/Stations")
);

const App = () => (
  <Router>
    <Header />

    <main>
      <React.Suspense fallback={<LoadingBar />}>
        <Route path="/" exact component={Favorites} />
        <Route path="/stations" component={Stations} />
        <Route path="/nearby" component={Nearby} />
        <Route path="/recent" component={Recent} />
      </React.Suspense>
    </main>
  </Router>
);

export default App;
