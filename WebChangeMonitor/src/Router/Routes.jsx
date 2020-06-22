import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "../Component/Auth/Login";
import Register from "../Component/Auth/Register";
import About from "../Component/Public/Aboutus/About";
import Header from "../Component/Header/Header";
import UploadFiles from "../Component/Developer/Files/UploadFiles";
import FilesList from "../Component/Developer/Files/FilesList/FilesList";
import Home from "../Component/Public/FrontPage";
import FileContent from "../Component/Developer/Files/FileContent";
import PageNotFound from "../Component/ErrorPages/PageNotFound";
import NewDomain from "../Component/Domain/NewDomain";
import Profile from "../Component/User/Profile";
import Compare from "../Component/Developer/Files/Compare";

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          {/* <Route path="/ForgotPassword" component={ForgotPassword} /> */}
          <Route path="/PageNotFound" component={PageNotFound} />
          <Route path="/About" component={About} />
          <Route path="/files/upload" component={UploadFiles} />
          <Route path="/files/list" component={FilesList} />
          <Route path="/files/content" component={FileContent} />
          <Route path="/files/compare" component={Compare} />
          <Route path="/domain/new" component={NewDomain} />
          <Route path="/user/profile" component={Profile} />
        </Router>
      </div>
    );
  }
}
