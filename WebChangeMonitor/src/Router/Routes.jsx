import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "../Component/Auth/Login";
import Register from "../Component/Auth/Register";
import RegisterResource from "../Component/Auth/RegisterResource";
import About from "../Component/Public/Aboutus/About";
import Header from "../Component/Header/Header";
import UploadFiles from "../Component/Developer/Files/UploadFiles";
import FilesList from "../Component/Developer/Files/FilesList/FilesList";
import Home from "../Component/Public/FrontPage";
import FileContent from "../Component/Developer/Files/FileContent";
import PageNotFound from "../Component/ErrorPages/PageNotFound";
// import NewDomain from "../Component/Domain/NewDomain";
import Profile from "../Component/User/Profile";
import Compare from "../Component/Developer/Files/Compare";
import VersionsList from "../Component/Developer/Versions/Versions";

import { connect } from "react-redux";
import DomainUsers from "../Component/Domain/DomainUsers";

class Routes extends React.Component {
  ChangeAuthStatus = (newStatus, user) => {
    if (newStatus) this.props.login(user);
    else this.props.logout();
  };

  render() {
    return (
      <div>
        {this.props.user != null && this.props.user !== undefined ? (
          this.props.user.role === 4 ? (
            <Router>
              <Header
                ChangeAuthStatus={this.ChangeAuthStatus}
                user={this.props.user}
              />
              <Route exact path="/" component={Home} />
              <Route
                path="/Login"
                component={(props) => (
                  <Login {...props} ChangeAuthStatus={this.ChangeAuthStatus} />
                )}
              />
              <Route path="/Register" component={Register} />
              {/* <Route path="/ForgotPassword" component={ForgotPassword} /> */}
              <Route path="/PageNotFound" component={PageNotFound} />
              <Route path="/About" component={About} />
              <Route path="/files/upload" component={UploadFiles} />
              <Route path="/files/content" component={FileContent} />
              <Route path="/files/compare" component={Compare} />
              <Route path="/user/profile" component={Profile} />
              <Route exact path="/versions" component={VersionsList} />
              <Route path="/versions/:versionId" component={FilesList} />
            </Router>
          ) : this.props.user.role === 3 ? (
            <Router>
              <Header
                ChangeAuthStatus={this.ChangeAuthStatus}
                user={this.props.user}
              />
              <Route exact path="/" component={Home} />
              <Route
                path="/Login"
                component={(props) => (
                  <Login {...props} ChangeAuthStatus={this.ChangeAuthStatus} />
                )}
              />
              <Route path="/Register" component={Register} />
              {/* <Route path="/ForgotPassword" component={ForgotPassword} /> */}
              <Route path="/PageNotFound" component={PageNotFound} />
              <Route path="/About" component={About} />
              <Route path="/files/upload" component={UploadFiles} />
              {/* <Route path="/files/list" component={FilesList} /> */}
              <Route path="/files/content" component={FileContent} />
              <Route path="/files/compare" component={Compare} />
              <Route path="/user/profile" component={Profile} />
              <Route exact path="/versions" component={VersionsList} />
              <Route path="/versions/:versionId" component={FilesList} />
            </Router>
          ) : this.props.user.role === 2 ? (
            <Router>
              <Header
                ChangeAuthStatus={this.ChangeAuthStatus}
                user={this.props.user}
              />
              <Route exact path="/" component={Home} />
              <Route
                path="/Login"
                component={(props) => (
                  <Login {...props} ChangeAuthStatus={this.ChangeAuthStatus} />
                )}
              />
              <Route path="/Register" component={Register} />
              {/* <Route path="/ForgotPassword" component={ForgotPassword} /> */}
              <Route path="/PageNotFound" component={PageNotFound} />
              <Route path="/About" component={About} />
              <Route path="/RegisterResource" component={RegisterResource} />
              {/* <Route path="/files/list" component={FilesList} /> */}
              <Route path="/files/content" component={FileContent} />
              <Route path="/files/compare" component={Compare} />
              <Route path="/user/profile" component={Profile} />
              <Route exact path="/versions" component={VersionsList} />
              <Route path="/versions/:versionId" component={FilesList} />
              <Route path="/domain/users" component={DomainUsers} />
            </Router>
          ) : this.props.user.role === 1 ? (
            <Router>
              <Header
                ChangeAuthStatus={this.ChangeAuthStatus}
                user={this.props.user}
              />
              <Route exact path="/" component={Home} />
              <Route
                path="/Login"
                component={(props) => (
                  <Login {...props} ChangeAuthStatus={this.ChangeAuthStatus} />
                )}
              />
              <Route path="/Register" component={Register} />
              {/* <Route path="/ForgotPassword" component={ForgotPassword} /> */}
              <Route path="/PageNotFound" component={PageNotFound} />
              <Route path="/About" component={About} />

              <Route path="/RegisterResource" component={RegisterResource} />
              {/* <Route path="/files/list" component={FilesList} /> */}
              <Route path="/files/content" component={FileContent} />
              <Route path="/files/compare" component={Compare} />
              {/* <Route path="/domain/new" component={NewDomain} /> */}
              <Route path="/user/profile" component={Profile} />
              <Route exact path="/versions" component={VersionsList} />
              <Route path="/versions/:versionId" component={FilesList} />
              <Route path="/domain/users" component={DomainUsers} />
            </Router>
          ) : null
        ) : (
          <Router>
            <Header
              ChangeAuthStatus={this.ChangeAuthStatus}
              user={this.props.user}
            />
            <Route exact path="/" component={Home} />
            <Route
              path="/Login"
              component={(props) => (
                <Login {...props} ChangeAuthStatus={this.ChangeAuthStatus} />
              )}
            />
            <Route path="/Register" component={Register} />
            {/* <Route path="/ForgotPassword" component={ForgotPassword} /> */}
            <Route path="/PageNotFound" component={PageNotFound} />
            <Route path="/About" component={About} />
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          time: Date.now(),
        },
      });
    },
    logout: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
