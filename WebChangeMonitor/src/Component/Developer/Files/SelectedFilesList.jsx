import React, { Component } from "react";
class SelectedFilesList extends Component {
  state = {};
  renderSelectedFiles(props) {
    if (props != null) {
      const files = [...props.filesList];
      const listFiles = files.map((f) => <li>f</li>);
      return <ul>{listFiles}</ul>;
    }
  }
  render() {
    return <p>{this.renderSelectedFiles()}</p>;
  }
}

export default SelectedFilesList;
