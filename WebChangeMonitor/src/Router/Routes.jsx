import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Front from "../OutSidehome/Frontpage/FrontPage";
import Login from "../Component/Auth/Login/Login";
import PageNotFound from "../Component/PageNotFound/PageNotFound";
import Register from "../Component/Auth/Register/Register";
import About from "../OutSidehome/Aboutus/About";
import Header from "../Component/Header/Header";
import UploadFiles from "../Component/Developer/Files/UploadFiles";
import FilesList from "../Component/Developer/Files/FilesList";

export default class Routes extends React.Component {
  render() {
    ////// yahan sab routes create krne hain
    return (
      <div>
        <Router>
          <Header />
          <Route exact path="/[/home]" component={Front} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/PageNotFound" component={PageNotFound} />
          <Route path="/About" component={About} />
          <Route path="/files/upload" component={UploadFiles} />
          <Route path="/files[|/list]" component={FilesList} />
        </Router>
      </div>
    );
  }
}
