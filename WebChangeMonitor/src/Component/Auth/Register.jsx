import React from "react";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import PasswordField from "./PasswordField/PasswordField";
import { Link } from "react-router-dom";
import { sha256 } from "js-sha256";
import { Login } from "../../RequestToServer/Auth";
import {
  IsUsernameAvailable,
  IsEmailAvailable,
  SignUpCeo,
} from "../../RequestToServer/Auth";

export default class Register extends React.Component {
	state = {
		Email: "",
		Username: "",
		Password: "",
		ConfirmPassword: "",
		ServerUsername: "",
		ServerPassword: "",
		Domain: "",
		ControlPanelUrl: "",
		TargetDirectory: "",
		submit: false,
		IsEmailAvailable: true,
		IsUsernameAvailable: true,
		Failed: false,
		DomainError:false,
		controlPanelUrlError:false,
		EmailError:false,
		UsernameError:false,
		PasswordError:false
	};
	checkname = new RegExp(/^[a-z A-Z]{3,40}$/);
	checkemail = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
	checkusername = new RegExp(/^[A-Za-z0-9_]{4,20}$/);
	checkpassword = new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{8,20}$/);
	checkUrl=new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
	
	OnSubmit = (event) => {
		console.log("onsubmit")
		this.setState({ submit: true
		,PasswordError:false,
		UsernameError:false,
		DomainError:false,
		EmailError:false,
		controlPanelUrlError:false
	 });
		if(!this.checkemail.test(this.state.Email) 
		|| !this.checkusername.test(this.state.Username)
		|| !this.checkpassword.test(this.state.Password) 
		|| !this.checkUrl.test(this.state.ControlPanelUrl)  
		|| !this.checkUrl.test(this.state.Domain)  
		){
			if(!this.checkemail.test(this.state.Email))this.setState({EmailError:true});
			if(!this.checkpassword.test(this.state.Password))this.setState({PasswordError:true});
			if(!this.checkusername.test(this.state.Username))this.setState({UsernameError:true});
			if(!this.checkUrl.test(this.state.Domain))this.setState({DomainError:true});
			if(!this.checkUrl.test(this.state.ControlPanelUrl))this.setState({controlPanelUrlError:true});
			this.setState({submit:false});
		}
		else if (this.state.IsEmailAvailable 
		&& this.state.IsUsernameAvailable 
		&& this.state.Password === this.state.ConfirmPassword 
		&& this.state.ServerPassword !== ""
		&& this.state.ServerUsername !== "" ) {
			const newUser = {
				userName: this.state.Username,
				email: this.state.Email,
				password: sha256(this.state.Password),
				role: 1,
				serverUsername: this.state.ServerUsername,
				serverPassword: this.state.ServerPassword,
				domain: this.state.Domain,
				controlPanelUrl: this.state.ControlPanelUrl,
				targetServerDirectory: this.state.TargetDirectory,
			};

			SignUpCeo(newUser)
				.then((response) => {
					if (response === undefined) {
						return;
					}
					if (response.status === 200) {
						this.setState({ isCreated: true,submit:false });
						try {
							this.props.ChangeAuthStatus(true, response.data);
							this.props.history.push("/");
						} catch (error) {
							console.error();
							this.setState({ openDialog: true, errorMessage: "authentication successful but error in maintaining state" });
						}
					}
				})
				.catch((err) => {
					console.log(err);
					this.setState({ failed: true,submit:false });
				});
		} else {
			this.setState({ failed: true,submit:false });
			console.log(this.checkemail.test(this.state.Email) === true, this.state.IsEmailAvailable, this.checkusername.test(this.state.Username) === true, this.state.IsUsernameAvailable, this.checkpassword.test(this.state.Password) === true, this.state.Password === this.state.ConfirmPassword);
		}
		event.preventDefault();
	};

	handleBlurUsername = () => {
		const response = IsUsernameAvailable(this.state.Username);
		response.then((res) => {
			console.log(res);
			const Availability = res.data;
			this.setState({ IsUsernameAvailable: Availability });
		});
	};
	handleBlurEmail = () => {
		const response = IsEmailAvailable(this.state.Email);
		response.then((res) => {
			console.log(res);
			const Availability = res.data;
			this.setState({ IsEmailAvailable: Availability });
		});
	};

	handleChange = (event) => {
		let change = {};
		let property = event.target.name;
		let value = event.target.value;
		change[property] = value;
		//console.log(change);
		this.setState(change);
		event.preventDefault();
	};

	renderCreateMessage = () => {
		if (this.state.isCreated) {
			return <div className="alert alert-success">account created</div>;
		} else if (this.state.submit) {
			return <div className="alert alert-danger">account creation failed</div>;
		}
	};

	renderEmail = () => {
		let error = !this.checkemail.test(this.state.Email) && this.state.submit === true ? true : false;

		let jsx = <TextField id="email" name="Email" className={classes.Fields} label="Email" error={error} aria-describedby="component-error-text" value={this.state.Email} onChange={this.handleChange} onBlur={this.handleBlurEmail} />;
		if (this.state.EmailError) {
			jsx = (
				<React.Fragment>
					{jsx}
					<div style={styles.error}>Enter Valid Email address</div>
				</React.Fragment>
			);
		}
		if (!this.state.IsEmailAvailable) {
			jsx = (
				<React.Fragment>
					{jsx}
					<div style={styles.error}>Email Address already taken</div>
				</React.Fragment>
			);
		}

		return jsx;
	};

	renderUsername = () => {
		let error = !this.checkusername.test(this.state.Username) && this.state.submit === true ? true : false;
		let jsx = <TextField id="username" name="Username" className={classes.Fields} label="Username" error={error} value={this.state.Username} onChange={this.handleChange} onBlur={this.handleBlurUsername} />;
		if (error||this.state.UsernameError) {
			jsx = (
				<React.Fragment>
					{jsx}
					<div style={{ color: "red", fontSize: 11 }}>Enter Valid User Name</div>
				</React.Fragment>
			);
		}
		if (!this.state.IsUsernameAvailable) {
			jsx = (
				<React.Fragment>
					{jsx}
					<div style={{ color: "red", fontSize: 11 }}>Username already taken</div>
				</React.Fragment>
			);
		}
		return jsx;
	};

	renderPassword = () => {
		var jsx= (
			<PasswordField
				label="Password"
				name="Password"
				//Submit={this.state.submit}
				value={this.state.Password}
				Confirm={true}
				//emsg={true}
				onChange={this.handleChange}
			/>
		);
		if (this.state.PasswordError) {
			jsx = (
				<React.Fragment>
					{jsx}
					<div style={{ color: "red", fontSize: 11 }}>Password Should match and should be atleast 8 and at most 20 characters</div>
				</React.Fragment>
			);
		}
		return jsx;
	};

	renderConfirmPassword = () => {
		let error = this.state.ConfirmPassword !== this.state.Password && this.state.submit === true;
		// let confirm =
		//   this.state.ConfirmPassword !== this.state.Password ? true : false;

		let jsx = (
			<PasswordField
				label="Confirm Password"
				className={classes.Fields}
				name="ConfirmPassword"
				//emsg={false}
				//Submit={this.state.submit}
				value={this.state.ConfirmPassword}
				//Confirm={confirm}
				onChange={this.handleChange}
			/>
		);
		if (error) {
			jsx = (
				<React.Fragment>
					{jsx}
					<div style={{ color: "red", fontSize: 11 }}>Password Should match</div>
				</React.Fragment>
			);
		}
		return jsx;
	};

	renderLinks = () => {
		return <Link to="/login">Login Here</Link>;
	};
	renderForm = () => {
		return (
			<form className="w-100">
				{this.renderEmail()}
				{this.renderUsername()}
				{this.renderPassword()}
				{this.renderConfirmPassword()}
				{this.renderRole()}
				{this.renderFormDomain()}
				<Button type="button" variant="contained" className={(classes.Fields, classes.RegisterBtn)} color="primary" onClick={this.OnSubmit}>
					Sign up
					<ExitToApp />
				</Button>
				<div>{this.renderLinks()}</div>
			</form>
		);
	};
	renderFormDomain = () => {
		return (
			<div>
				<TextField id="domain" name="Domain" className={classes.Fields} label="Domain" value={this.state.Domain} onChange={this.handleChange} onBlur={this.handleBlurUsername} />
				{this.state.DomainError?<div style={{ color: "red", fontSize: 11 }}>Please enter valid domain</div>:null}
				<TextField id="ControlPanelUrl" name="ControlPanelUrl" className={classes.Fields} label="Control Panel URL" value={this.state.ControlPanelUrl} onChange={this.handleChange} onBlur={this.handleBlurUsername} />
				{this.state.controlPanelUrlError?<div style={{ color: "red", fontSize: 11 }}>Please enter valid control panel url</div>:null}
				<TextField id="TargetDirectory" name="TargetDirectory" className={classes.Fields} label="Target Directory" value={this.state.TargetDirectory} onChange={this.handleChange} onBlur={this.handleBlurUsername} />
				<TextField id="ServerUsername" name="ServerUsername" className={classes.Fields} label="Server Username" value={this.state.ServerUsername} onChange={this.handleChange} onBlur={this.handleBlurUsername} />
				<TextField id="ServerPassword" name="ServerPassword" className={classes.Fields} label="Server Password" type="password" value={this.state.ServerPassword} onChange={this.handleChange} onBlur={this.handleBlurUsername} />
			</div>
		);
	};
	renderRole = () => {
		return;
		let user = this.props.user;
		if (user !== null) {
			return <TextField type="text" label="Role" className={classes.Fields} />;
		}
	};

	render() {
		return (
			<div className={classes.ContainerMain}>
				<div className={classes.ContainerLogin}>
					{this.renderCreateMessage()}
					<div style={(styles.textCenter, styles.title)}>Welcome Aboard</div>
					{this.renderForm()}
				</div>
			</div>
		);
	}
}

const classes = {
  ContainerMain: "container",
  ContainerLogin: "login-container",
  Fields: "text-left w-100",
  RegisterBtn: "mt-4 w-100",
};
const styles = {
  loginContainer: { marginBottom: 20, fontSize: 18 },
  title: { fontSize: "18px" },
  textCenter: { textAlign: "center" },
  error: { color: "red", fontSize: 11 },
};
