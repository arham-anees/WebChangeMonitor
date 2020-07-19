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
import { PrivateRoute } from "./PrivateRoute";
import { uploadFile } from "../RequestToServer/Files";
import { uploadFiles } from "../Component/Developer/Files/UploadFilesUtils";

class Routes extends React.Component {
  ChangeAuthStatus = (newStatus, user) => {
    if (newStatus) this.props.login(user);
    else this.props.logout();
    this.setState({ refresh: true });
  };

  // {this.props.user != null && this.props.user !== undefined ? (
  //   this.props.user.role === 4 ? (

  render() {
    // let routes = [];
    // paths.map((x, i) => {
    //   if (x.role !== undefined) {
    //     if (x.role.includes(this.props.user.role))
    //       routes.push(<Route path={x.path} component={x.component} />);
    //   } else {
    //     routes.push(<Route path={x.path} component={x.component} />);
    //   }
    // });
    return (
      <div>
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
          <Route exact path="/versions" component={VersionsList} />
          <Route exact path="/" component={Home} />
          <Route path="/Register" component={Register} />
          <Route path="/PageNotFound" component={PageNotFound} />
          <PrivateRoute
            path="/files/upload"
            component={UploadFiles}
            roles={[3, 4]}
          />
          <Route path="/About" component={About} />
          <PrivateRoute
            path="/files/upload"
            component={UploadFiles}
            roles={[3, 4]}
          />
          <PrivateRoute
            path="/files/content"
            component={FileContent}
            roles={[1, 2, 3, 4]}
          />
          <PrivateRoute
            path="/files/compare"
            component={Compare}
            roles={[1, 2, 3, 4]}
          />
          <PrivateRoute
            path="/user/profile"
            component={Profile}
            roles={[1, 2, 3, 4]}
          />
          <PrivateRoute
            path="/versions/:versionId"
            component={FilesList}
            roles={[1, 2, 3, 4]}
          />
          <PrivateRoute
            path="/RegisterResource"
            component={RegisterResource}
            roles={[1, 2]}
          />
          <PrivateRoute
            path="/domain/users"
            component={DomainUsers}
            roles={[1, 2]}
          />
        </Router>
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
