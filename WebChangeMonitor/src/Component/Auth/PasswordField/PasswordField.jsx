import * as React from "react";
import { InputAdornment, IconButton, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Visibility, VisibilityOff } from "@material-ui/icons";
export default class Password extends React.Component {
  state = {
    showPassword: false,
  };
  checkpassword = new RegExp(/^[A-Za-z0-9!@#$%^&*()_]{9,20}$/);
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    let error =
      !this.checkpassword.test(this.props.value) &&
      this.props.Submit === true &&
      this.props.Confirm === true;
    return (
      <React.Fragment>
        <FormControl className={classes.w100}>
          <TextField
            type={this.state.showPassword ? "text" : "password"}
            label={this.props.label}
            onChange={this.props.onChange}
            name={this.props.name}
            onBlur={this.props.onBlur}
            error={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={styles.icon}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error ? (
            <div style={styles.error}>
              Password Should contain minimum 8 digits
            </div>
          ) : null}
        </FormControl>
      </React.Fragment>
    );
  }
}

const classes = {
  w100: "w-100",
};

const styles = {
  error: {
    color: "red",
    fontSize: 11,
  },
  icon: {
    Width: "20%",
  },
};
