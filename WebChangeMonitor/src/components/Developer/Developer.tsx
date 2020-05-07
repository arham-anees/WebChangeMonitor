import * as React from "react";
import DeveloperDashboard from "./DeveloperDashboard/DeveloperDashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "reactstrap";
import UploadFiles from "./UploadFiles/UploadFiles";

export interface DeveloperProps {}

export interface DeveloperState {}

class Developer extends React.Component<DeveloperProps, DeveloperState> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/developer/(|Dashboard)">
            <p>this is Dashboard</p>
            <DeveloperDashboard />
          </Route>
          <Route path="/developer/Upload">
            <Navbar />
            <UploadFiles />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Developer;
