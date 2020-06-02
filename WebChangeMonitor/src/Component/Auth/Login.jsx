import React from "react";
import TextField from "@material-ui/core/TextField";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import PasswordField from "./PasswordField/PasswordField";
import "./style.css";
export default class extends React.Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    Submit: false,
  };
  OnSubmit = (event) => {
    this.setState({ Submit: true });
    if (this.state.username.length !== 0 && this.state.password.length !== 0) {
      const newTodo = {
        Email: this.state.username,
        Password: this.state.password,
      };

      axios
        .post("http://localhost:4000/online_tutor_db/Login_Admin", newTodo)
        .then(() => console.log("api invoked"))
        .catch((err) => alert(err));
    }

    event.preventDefault();
  };
  setUser = (event) => {
    this.setState({ username: event.target.value });
  };
  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  style = {
    width: "100%",
  };

  renderUsernameField = () => {
    let jsx = (
      <TextField
        id="username"
        label="Username"
        value={this.state.username}
        onChange={this.setUser}
        style={this.style}
      />
    );

    if (this.state.username.length === 0 && this.state.Submit === true) {
      jsx = (
        <React.Fragment>
          {jsx} <div style={styles.error}>Enter Valid Password</div>
        </React.Fragment>
      );
    }
    return jsx;
  };

  renderPasswordField = () => {
    let jsx = (
      <PasswordField
        label="Password"
        name="Password"
        value={this.state.password}
        HandleChange={this.setPassword}
      />
    );

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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.LoginBtn}
          OnSubmit={this.login}
        >
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

  render() {
    return (
      <div className={classes.Outline}>
        <div className={classes.container}>
          <div style={(styles.loginContainer, styles.textCenter)}>
            Login Form
          </div>
          {this.renderForm()}
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