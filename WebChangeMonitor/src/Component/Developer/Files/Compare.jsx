import React from "react";
import {
  getLastTwoVersions,
  getFileContent,
} from "../../../RequestToServer/Files";
import ReactDiffViewer from "react-diff-viewer";
import { useState } from "react";

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldValue: "",
      newValue: "",
    };
  }
  oldValue = "";
  newValue = "";
  encodedName = this.props.location.search.substring(1);
  files = [];
  componentDidMount() {
    getLastTwoVersions(this.encodedName).then((res) => {
      this.files = res.data;
      let promises = [];
      promises.push(getFileContent(this.files[0].encodedName));
      //.then((result) => (oldValue = result));
      promises.push(getFileContent(this.files[1].encodedName));
      //.then((result) => (newValue = result));
      Promise.all(promises).then((result) => {
        this.oldValue = result[0].content;
        this.newValue = result[1].content;
        console.log("result", result);
        this.setState({ oldValue: this.oldValue, newValue: this.newValue });
      });
    });
  }
  render() {
    return (
      <ReactDiffViewer
        oldValue={this.state.oldValue}
        newValue={this.state.newValue}
        splitView={true}
      />
    );
  }
}

export default Compare;
