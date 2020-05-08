import React, { Component } from "react";

class SelectedFile extends Component {
  state = {};
  render() {
    return <div>{this.props.file.name}</div>;
  }
}

export default SelectedFile;
