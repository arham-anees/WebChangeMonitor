import React, { Component } from "react";
import { GetUser } from "../../RequestToServer/Users";
import { IsEmailAvailableForUpdate } from "../../RequestToServer/Auth";

import "../Auth/style.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      roleName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      IsEmailAvailable: true,
    };
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
    const response = IsEmailAvailableForUpdate(
      this.state.email,
      this.state.username
    );
    response.then((res) => {
      console.log(res);
      const Availability = res.data;
      this.setState({ IsEmailAvailable: Availability });
      console.log("email updated");
    });
  };

  handleSubmit = (event) => {
    console.log(this.state);

    event.preventDefault();
  };
  componentDidMount() {
    GetUser().then((response) => {
      if (response !== undefined) {
        if (response.status === 200) {
          this.setState(response.data);
        }
      }
    });
  }
  render() {
    return (
      <div className="bg-light login-container">
        <div className="mt-2">
          <span>Profile</span>
          <br />
          <span className="font-xl align-left">{this.state.username}</span>
          <br />
          <span>{this.state.roleName}</span>
        </div>
        <form>
          <input
            type="text"
            placeholder="first name"
            className="form-control mt-1"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="middle name"
            className="form-control mt-1"
            name="middleName"
            value={this.state.middleName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="last name"
            className="form-control mt-1"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="phone"
            className="form-control mt-1"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            className="form-control mt-1"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <input
            type="button"
            value="Update"
            className="btn btn-success btn-block"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Profile;
