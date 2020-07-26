import React, { Component } from "react";
import { GetUser, UpdateUser } from "../../RequestToServer/Users";
import { IsEmailAvailableForUpdate } from "../../RequestToServer/Auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import "../Auth/style.css";
import { Button } from "@material-ui/core";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			roleName: "",
			firstName: "",
			middleName: "",
			address: "",
			city: "",
			lastName: "",
			phone: "",
			email: "",
			IsEmailAvailable: true,
			openDialog: false,
		};
		GetUser()
			.then((response) => {
				if (response !== undefined && response.status === 200) {
					this.setState(response.data);
				}
			})
			.catch((err) => this.setState({ error: err }));
	}

	componentDidMount() {
		let user = GetUser();
		this.setState({ user: user });
	}

	handleChange = (event) => {
		let change = {};
		const name = event.target.name;
		const value = event.target.value;
		change[name] = value;
		this.setState(change);
		if (name === "email") {
			console.log("email");
		}
	};

	handleBlur = (event) => {
		const response = IsEmailAvailableForUpdate(this.state.email, this.state.username);
		response.then((res) => {
			console.log(res);
			const Availability = res.data;
			this.setState({ IsEmailAvailable: Availability });
			console.log("email updated");
		});
	};

	handleSubmit = (event) => {
		console.log(this.state);
		let user = {
			userName: this.state.username,
			firstName: this.state.firstName,
			middleName: this.state.middleName,
			lastName: this.state.lastName,
			address: this.state.address,
			city: this.state.city,
			phone: this.state.phone,
		};

		UpdateUser(user)
			.then((res) => this.setState({ isUpdated: true, openDialog: true }))
			.catch((err) => this.setState({ isUpdated: false, error: err, openDialog: true }));

		event.preventDefault();
	};

	Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	render() {
		return (
			<div className="bg-light login-container">
				<div className="mt-2">
					<h4>Profile</h4>
					<span className="font-xl align-left">{this.state.username}</span>
					<br />
					<span>{this.state.roleName}</span>
				</div>
				<form>
					<input type="text" placeholder="first name" className="form-control mt-1" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
					<input type="text" placeholder="middle name" className="form-control mt-1" name="middleName" value={this.state.middleName} onChange={this.handleChange} />
					<input type="text" placeholder="last name" className="form-control mt-1" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
					<input type="text" placeholder="phone" className="form-control mt-1" name="phone" value={this.state.phone} onChange={this.handleChange} />
					<input type="text" placeholder="Email" className="form-control mt-1" name="email" disabled={true} value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur} />
					<input type="text" placeholder="Address" className="form-control mt-1" name="address" value={this.state.address} onChange={this.handleChange} />
					<input type="text" placeholder="City" className="form-control mt-1" name="city" value={this.state.city} onChange={this.handleChange} />
					<input type="button" value="Update" className="btn btn-success btn-block mt-1" onClick={this.handleSubmit} />
				</form>
				<Dialog open={this.state.openDialog} TransitionComponent={this.Transition} keepMounted onClose={this.handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
					<DialogTitle id="alert-dialog-slide-title">{this.state.isUpdated ? "Operation Successful" : "Operation Failed"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">{this.state.isUpdated ? "Profile updated succesfully" : "Profile failed to update. Please try again later. \nError: " + this.state.error}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.setState({ openDialog: false })} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default Profile;
