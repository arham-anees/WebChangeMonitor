import * as React from "react";
import { Switch, Route } from "react-router-dom";
import NavMenu from "../../Views/NavBar/NavMenu";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { Redirect } from "react-router";

export interface AuthProps {
  match: string;
}

export interface AuthState {}

class Auth extends React.Component<AuthProps, AuthState> {
  render() {
    return (
      <React.Fragment>
        <NavMenu IsLoggedIn={true} />
        <Switch>
          <Route path="/auth/(|login)" component={Login} />
          <Route path="/auth/signup" component={SignUp} />
          <Redirect to="/auth/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Auth;
