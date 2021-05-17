import React from "react";
import "./App.scss";
import routeMap from "route-map/route-map";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CustomNavbar from "components/CustomNavbar/CustomNavbar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Container style={{ paddingTop: "80px" }}>
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
      </Container>
    </BrowserRouter>
  );
}

export default App;
