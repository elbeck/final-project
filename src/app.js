import React from "react";
import "./app.scss";
import routeMap from "routeMap/routeMap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CustomNavbar from "components/elements/custom-nav-bar/custom-nav-bar";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Switch>
        <Route
          path={routeMap.home.path}
          exact={routeMap.home.exact}
          component={routeMap.home.component}
        />
        <Route
          path={routeMap.pokemon.path}
          exact={routeMap.pokemon.exact}
          component={routeMap.pokemon.component}
        />
        <Route
          path={routeMap.collection.path}
          exact={routeMap.collection.exact}
          component={routeMap.collection.component}
        />
        <Route
          path={routeMap.error.path}
          exact={routeMap.error.exact}
          component={routeMap.error.component}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
