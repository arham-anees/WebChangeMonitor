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
import DeveloperDashboard from "../Component/Developer/DeveloperDashboard/DeveloperDashboard";

class Routes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
		};
	}
	ChangeAuthStatus = (newStatus, user) => {
		if (newStatus) {
			this.props.login(user);
			this.setState({ user: user });
		} else {
			this.setState({ user: null });
			this.props.logout();
		}
		this.setState({ refresh: true });
	};

	render() {
		return (
			<div>
				<Router>
					<Route path="/" component={(props) => <Header ChangeAuthStatus={this.ChangeAuthStatus} {...props} user={this.state.user} />} />
					<Route exact path="/" component={Home} />
					<Route path="/Login" component={(props) => <Login {...props} ChangeAuthStatus={this.ChangeAuthStatus} user={this.props.user} />} />
					<Route path="/Register" component={Register} user={this.props.user} />
					<Route path="/PageNotFound" component={PageNotFound} />
					<Route path="/About" component={About} />
					<PrivateRoute exact path="/versions" component={VersionsList} roles={[1, 2, 3, 4]} user={this.props.user} />
					<PrivateRoute path="/files/upload" component={UploadFiles} roles={[3, 4]} user={this.props.user} />
					<PrivateRoute path="/files/content" component={FileContent} roles={[1, 2, 3, 4]} user={this.props.user} />
					<PrivateRoute path="/files/compare" component={Compare} roles={[1, 2, 3, 4]} user={this.props.user} />
					<PrivateRoute path="/user/profile" component={Profile} roles={[1, 2, 3, 4]} user={this.props.user} />
					<PrivateRoute path="/versions/:versionId" component={FilesList} roles={[1, 2, 3, 4]} user={this.props.user} />
					<PrivateRoute path="/RegisterResource" component={RegisterResource} roles={[1, 2]} user={this.props.user} />
					<PrivateRoute path="/domain/users" component={DomainUsers} roles={[1, 2]} user={this.props.user} />
					<PrivateRoute path="/developer/:username" component={DeveloperDashboard} roles={[4]} user={this.props.user} />
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
