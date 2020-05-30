import React from "react";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import PasswordField from "./PasswordField/PasswordField";
import axios from "axios";
import { Link } from "react-router-dom";

export default class extends React.Component {
  state = {
    Name: "",
    Email: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
    submit: false,
  };
  checkname = new RegExp(/^[a-z A-Z]{3,40}$/);
  checkemail = new RegExp(
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
  );
  checkusername = new RegExp(/^[A-Za-z0-9_]{4,20}$/);
  checkpassword = new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{9,20}$/);

  OnSubmit = (event) => {
    this.setState({ submit: true });
    if (
      this.checkname.test(this.state.Name) === true &&
      this.checkemail.test(this.state.Email) === true &&
      this.checkusername.test(this.state.Username) === true &&
      this.checkpassword.test(this.state.Password) === true &&
      this.state.Password === this.state.ConfirmPassword
    ) {
      console.log("this data you can use to store in data base", this.state);

      const newTodo = {
        Name: this.state.Name,
        User_Name: this.state.Username,
        Email: this.state.Email,
        Password: this.state.Password,
      };

      axios
        .post(
          "http://localhost:4000/online_tutor_db/Register_New_Admin",
          newTodo
        )
        .then(() => console.log("api invoked"))
        .catch((err) => alert(err));
    }

    event.preventDefault();
  };
  setName = (e) => {
    this.setState({ Name: e.target.value });
  };
  setEmail = (e) => {
    this.setState({ Email: e.target.value });
  };
  setUsername = (e) => {
    this.setState({ Username: e.target.value });
  };
  setPassword = (e) => {
    this.setState({ Password: e.target.value });
  };
  setRepass = (e) => {
    this.setState({ ConfirmPassword: e.target.value });
  };

  HandleBlur = (event) => {
    console.log("blur event called");
    console.log(event.currentTarget.name + ":" + event.currentTarget.value);
    event.preventDefault();
  };

  renderName = () => {
    let error =
      !this.checkname.test(this.state.Name) && this.state.submit === true
        ? true
        : false;
    let jsx = (
      <TextField
        id="name"
        name="Name"
        label="Name"
        className={classes.Fields}
        error={error}
        aria-describedby="component-error-text"
        onChange={this.setName}
        onBlur={this.HandleBlur}
      />
    );
    if (error) {
      jsx = (
        <React.Fragment>
          {jsx}
          <div style={{ color: "red", fontSize: 11 }}>
            Name should only contain letters
          </div>
        </React.Fragment>
      );
    }

    return jsx;
  };

  renderEmail = () => {
    let error =
      !this.checkemail.test(this.state.Email) && this.state.submit === true
        ? true
        : false;

    let jsx = (
      <TextField
        id="email"
        name="Email"
        className={classes.Fields}
        label="Email"
        error={error}
        aria-describedby="component-error-text"
        onChange={this.setEmail}
      />
    );
    if (error) {
      jsx = (
        <React.Fragment>
          {jsx}
          <div style={styles.error}>Enter Valid Email address</div>
        </React.Fragment>
      );
    }
    return jsx;
  };

  renderUsername = () => {
    let error =
      !this.checkusername.test(this.state.Username) &&
      this.state.submit === true
        ? true
        : false;
    let jsx = (
      <TextField
        id="username"
        name="Username"
        className={classes.Fields}
        label="Username"
        error={error}
        onChange={this.setUsername}
      />
    );
    if (error) {
      jsx = (
        <React.Fragment>
          {jsx}
          <div style={{ color: "red", fontSize: 11 }}>
            Enter Valid User Name
          </div>
        </React.Fragment>
      );
    }
    return jsx;
  };

  renderPassword = () => {
    return (
      <PasswordField
        label="Password"
        name="Password"
        Submit={this.state.submit}
        value={this.state.Password}
        Confirm={true}
        emsg={true}
        HandleChange={this.setPassword}
      />
    );
  };

  renderConfirmPassword = () => {
    let error =
      this.state.ConfirmPassword !== this.state.Password &&
      this.state.submit === true;
    let confirm =
      this.state.ConfirmPassword !== this.state.Password ? true : false;

    let jsx = (
      <PasswordField
        label="Confirm Password"
        className={classes.Fields}
        name="Confirm Password"
        emsg={false}
        Submit={this.state.submit}
        value={this.state.ConfirmPassword}
        Confirm={confirm}
        HandleChange={this.setRepass}
      />
    );
    if (error) {
      jsx = (
        <React.Fragment>
          {jsx}
          <div style={{ color: "red", fontSize: 11 }}>
            Password Should b match
          </div>
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
      <form className="w-100" onSubmit={this.OnSubmit}>
        {this.renderName()}
        {this.renderEmail()}
        {this.renderUsername()}
        {this.renderPassword()}
        {this.renderConfirmPassword()}

        <Button
          type="submit"
          variant="contained"
          className={(classes.Fields, classes.RegisterBtn)}
          color="primary"
        >
          Sign up
          <ExitToApp />
        </Button>
        <div>{this.renderLinks()}</div>
      </form>
    );
  };

  render() {
    return (
      <div className={classes.ContainerMain}>
        <div className={classes.ContainerLogin}>
          <div style={(styles.textCenter, styles.title)}>Registration Form</div>
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
