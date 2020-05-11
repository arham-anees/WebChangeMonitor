import React, { Component } from "react";
import { Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
class SelectedFile extends Component {
  state = {};
  handleClick = (index) => {
    this.props.handleClick(index);
  };
  render() {
    return (
      <div className="my-3 py-2 bg-light">
        <div className="d-flex justify-content-between">
          <span>{this.props.file.name}</span>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleClick.bind(this, this.props.id)}
            key={this.props.id}
          >
            <DeleteOutlineIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default SelectedFile;
