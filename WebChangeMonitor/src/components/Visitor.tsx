import * as React from "react";
import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./VisitorModule/Home/Home";
import AboutUs from "./VisitorModule/AboutUs/AboutUs";
import NavMenu from "../Views/NavBar/NavMenu";

export default () => {
  return (
    <React.Fragment>
      <NavMenu IsLoggedIn={true} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutus" component={AboutUs} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};
