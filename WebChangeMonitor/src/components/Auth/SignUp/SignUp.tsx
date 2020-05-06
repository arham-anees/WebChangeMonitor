import * as React from "react";

import TextField from "@material-ui/core/TextField";

import "../style.scss";
import "./SignUp.scss";
import PasswordField from "../../PasswordField";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

export interface SignUpProps {}

export interface SignUpState {
  Name: string;
  Email: string;
  Username: string;
  Password: string;
}

class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Username: "",
      Password: "",
    };
  }
  private OnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(this.state);
    event.preventDefault();
  };

  HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const propName: string = event.currentTarget.name; //.toString();
    const propValue: string = event.currentTarget.value; //.toString();
    this.setState({
      ...this.state,
      [propName]: propValue,
    });
    event.preventDefault();
  };

  HandleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log("blur event called");
    console.log(event.currentTarget.name + ":" + event.currentTarget.value);
    event.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <div className="login-container">
          <h4>Welcome Onboard</h4>
          <form className="w-100" onSubmit={this.OnSubmit}>
            <TextField
              id="name"
              name="Name"
              label="Name"
              onChange={this.HandleChange}
              onBlur={this.HandleBlur}
            />
            <TextField
              id="email"
              name="Email"
              type="email"
              label="Email"
              onChange={this.HandleChange}
              required
            />
            <TextField
              id="username"
              name="Username"
              label="Username"
              onChange={this.HandleChange}
              required
            />
            <PasswordField
              label="Password"
              name="Password"
              value={this.state.Password}
              HandleChange={this.HandleChange}
              // HandleBlur={this.HandleBlur}
            />
            {/* <PasswordField label="Confirm Password" Required={true} /> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3"
            >
              Sign up
              <ExitToApp />
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
