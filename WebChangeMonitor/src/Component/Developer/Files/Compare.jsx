import React from "react";
import {
  getLastTwoVersions,
  getFileContent,
} from "../../../RequestToServer/Files";
import ReactDiffViewer from "react-diff-viewer";

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldValue: "",
      newValue: "",
      files: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    const encodedName = this.props.location.search.substring(1);
    getLastTwoVersions(encodedName).then((res) => {
      const files = res.data;
      let promises = [];
      promises.push(getFileContent(files[0].encodedName));
      //.then((result) => (oldValue = result));
      promises.push(getFileContent(files[1].encodedName));
      //.then((result) => (newValue = result));
      Promise.all(promises).then((result) => {
        this.oldValue = result[0].content;
        this.newValue = result[1].content;
        console.log("result", result);
        this.setState({
          oldValue: this.oldValue,
          newValue: this.newValue,
          files: files,
          isLoaded: true,
        });
      });
    });
  }

  getFileDetails = () => {
    if (this.state.isLoaded) {
      return (
        <div className="bg-light d-flex justify-content-between mb-2 p-4">
          <div>
            <div className="font-italic font-weight-bold font-xl">
              {this.state.files[0].localName}
            </div>
            <div className="font-md">
              {this.state.files[0].localRelativePath}
            </div>
          </div>
          <div className="font-md align-self-center">
            {Date(this.state.files[0].uploadCompleteDateTime)}
          </div>
        </div>
      );
    } else {
      return "";
    }
  };
  render() {
    return (
      <div className={classes.container}>
        {this.getFileDetails()}

        {/* {this.state.files[0].localRelativePath} */}
        <ReactDiffViewer
          oldValue={this.state.oldValue}
          newValue={this.state.newValue}
          splitView={true}
        />
      </div>
    );
  }
}

export default Compare;

const classes = {
  container: "container",
};
