import React from "react";

class NewDomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "",
      controlPanelUrl: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    let change = {};
    let property = event.target.name;
    let value = event.target.value;
    change[property] = value;
    this.setState(change);

    console.log(this.state);
  };
  renderForm = () => {
    return (
      <div>
        <input
          type="text"
          placeholder="Domain"
          name="domain"
          className={classes.input}
          onBlur={this.handleChange}
        />
        <input
          type="text"
          placeholder="Control Panel URL"
          name="controlPanelUrl"
          className={classes.input}
          onBlur={this.handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={classes.input}
          onBlur={this.handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={classes.input}
          onBlur={this.handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className={classes.input}
          onBlur={this.handleChange}
        />

        <input type="button" value="Create Domain" className={classes.button} />
      </div>
    );
  };
  render() {
    return <div className={classes.container}>{this.renderForm()}</div>;
  }
}

export default NewDomain;

const classes = {
  container: "container my-5",
  input: "form-control mb-1",
  button: "btn btn-info btn-block",
};
