import React from "react";
import TextField from "@material-ui/core/TextField";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Login } from "../../RequestToServer/Auth";
import PasswordField from "./PasswordField/PasswordField";
import { sha256 } from "js-sha256";
import "./style.css";
import CustomSnackBar from "../SnackBar";

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			showPassword: false,
			Submit: false,
			redirectToHome: false,
			redirectToList: false,
			failed: false,
			openDialog: false,
			errorMessage: "",
		};
	}
	componentDidMount() {
		const token = this.props.user ? this.props.user.token : undefined;
		if (token !== undefined && token !== null) {
			this.setState({ redirectToHome: true });
		}
	}

	handleSnackClose = () => {
		this.setState({ openDialog: false });
	};

	OnSubmit = (event) => {
		this.setState({ Submit: true });
		if (this.state.username.length !== 0 && this.state.password.length !== 0) {
			const props = {
				Username: this.state.username,
				HashedPassword: sha256(this.state.password),
			};
			try {
				Login(props)
					.then((response) => {
						if (response !== undefined) {
							if (response.status === 200) {
								try {
									this.props.ChangeAuthStatus(true, response.data);
									this.props.history.push("/");
								} catch (error) {
									console.error();
									this.setState({ openDialog: true, errorMessage: "authentication successful but error in maintaining state" });
								}
							} else {
								this.setState({ openDialog: true, errorMessage: "error in logging in" });
							}
						}
					})
					.catch((error) => {
						this.setState({ failed: true,submit:false, openDialog: true, errorMessage: "Error: " + error.data === undefined ? "internal server error" : error.data  });
					});
			} catch (error) {
				console.log(error);
				this.setState({ openDialog: true, errorMessage: "Error: " + error.message,submit:false });
			}
		}

		event.preventDefault();
	};
	setUser = (event) => {
		this.setState({ username: event.target.value,openDialog: false });
	};
	setPassword = (event) => {
		this.setState({ password: event.target.value ,openDialog: false});
	};
	style = {
		width: "100%",
	};

	renderDialog = () => <CustomSnackBar message={this.state.errorMessage} isError={true} handleClose={this.handleSnackClose} open={this.state.openDialog} />;

	renderUsernameField = () => {
		let jsx = <TextField id="username" label="Username" value={this.state.username} onChange={this.setUser} style={this.style} />;

		if (this.state.username.length === 0 && this.state.Submit === true) {
			jsx = (
				<React.Fragment>
					{jsx} <div style={styles.error}>Enter Valid Username</div>
				</React.Fragment>
			);
		}
		return jsx;
	};

	renderPasswordField = () => {
		let jsx = <PasswordField label="Password" name="Password" value={this.state.password} onChange={this.setPassword} />;

		if (this.state.password.length === 0 && this.state.Submit === true) {
			jsx = (
				<React.Fragment>
					{jsx} <div style={styles.error}>Enter Valid Password</div>
				</React.Fragment>
			);
		}

		return jsx;
	};
	renderForm = () => {
		return (
			<form className={classes.form} onSubmit={this.OnSubmit}>
				{this.renderUsernameField()}
				{this.renderPasswordField()}

				<Button type="submit" variant="contained" color="primary" className={classes.LoginBtn} onClick={this.OnSubmit}>
					Login
					<ExitToAppSharpIcon />
				</Button>
				<br />
				<div style={styles.textCenter}>
					<Link to="/Register" className={classes.SignUp}>
						New here? Sign up first
					</Link>
					<br />
					<Link to="/ForgotPassword" className={classes.SignUp}>
						Forgot Password?
					</Link>
				</div>
			</form>
		);
	};

	renderError = () => {
		//console.log("status", this.state.failed);
		// if (this.state.failed) {
		// 	return <div className="w-100 text-center alert alert-danger">Invalid username or password</div>;
		// }
	};

	render() {
		if (this.state.redirectToHome) {
			this.props.history.push("/");
		}
		return (
			<div className={classes.Outline}>
				<div className={classes.container}>
					<div style={(styles.loginContainer, styles.textCenter)}>Login Form</div>
					{this.renderError()}
					{this.renderForm()}
					{this.renderDialog()}
				</div>
			</div>
		);
	}
}

const classes = {
	Outline: "container",
	container: "login-container",
	Links: "mt-2 text-decoration-none",
	LoginBtn: "mt-4",
	form: "w-100",
};
const styles = {
	loginContainer: { marginBottom: 20, fontSize: 18 },
	textCenter: { textAlign: "center" },
	error: { color: "red", fontSize: 11 },
};
