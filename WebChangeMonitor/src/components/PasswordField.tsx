import * as React from "react";
import {
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  HandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // HandleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  // onBlur: React.FocusEvent;
}

export interface PasswordFieldState {
  showPassword: boolean;
}

class PasswordField extends React.Component<
  PasswordFieldProps,
  PasswordFieldState
> {
  constructor(props: PasswordFieldProps) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  style = {
    width: "100%",
  };

  iconStyle = {
    width: "20%",
  };
  render() {
    return (
      <React.Fragment>
        <FormControl>
          <InputLabel htmlFor="passwordField">{this.props.label}</InputLabel>
          <Input
            id="passwordField"
            type={this.state.showPassword ? "text" : "password"}
            //value={this.state.value}
            style={this.style}
            onChange={this.props.HandleChange}
            //onBlur={this.props.HandleBlur}
            name={this.props.name}
            required
            aria-describedby="passwordFieldError"
            endAdornment={
              <InputAdornment position="end" style={this.iconStyle}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </React.Fragment>
    );
  }
}

export default PasswordField;
