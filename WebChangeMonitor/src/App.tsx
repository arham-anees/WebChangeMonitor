import * as React from "react";

import "./custom.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/VisitorModule/Home/Home";
import AboutUs from "./components/VisitorModule/AboutUs/AboutUs";
import NavMenu from "./Views/NavBar/NavMenu";
import Auth from "./components/Auth/Auth";
import Developer from "./components/Developer/Developer";
import Page404 from "./Views/Page404/Page404";
export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/(|home)">
        <NavMenu IsLoggedIn={true} />
        <Home />
      </Route>
      <Route path="/aboutus">
        <NavMenu IsLoggedIn={true} />
        <AboutUs />
      </Route>
      <Route path="/404">
        <NavMenu IsLoggedIn={true} />
        {/* <Page404 /> */}
      </Route>

      <Route path="/Auth" component={Auth} />
      <Route path="/Developer" component={Developer} />

      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);
