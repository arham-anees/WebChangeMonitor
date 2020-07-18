import React from "react";

import {
  Button,
  TextareaAutosize,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import {
  CreateAcceptanceStatus,
  GetLatestAcceptanceStatus,
  GetAcceptanceStatusesList,
} from "../../../../RequestToServer/AcceptanceStatus";
import { getUser } from "../../../../Helper/LocalStorage";

class AcceptanceStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: null,
      isAccepted: null,
      remarks: "",
      versionId: this.props.versionId,
      isReviewed: false,
      statuses: [],
    };
  }
  componentDidMount() {
    let user = getUser();
    this.setState({ role: user.role });

    GetLatestAcceptanceStatus(this.props.versionId).then((res) => {
      if (res.status === 200) {
        console.log("reviewed");
        this.setState({ isReviewed: true, isAccepted: res.data.isAccepted });
      }
      if (res.status === 204) {
        console.log("not reviewed");
      }
    });
    GetAcceptanceStatusesList(this.props.versionId).then((res) => {
      if (res.status === 200) {
        this.setState({ statuses: res.data });
      }
    });
  }
  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({ versionId: prevProps.versionId });
  //}
  handleAcceptClick = (event) => {
    console.log("changes accepted");
  };
  handleRejectClick = (event) => {
    console.log("changes Rejected");
  };

  handleChange = (e) => {
    this.setState({ remarks: e.target.value });
  };
  handleRadioChange = (e) => {
    let value = false;
    if (e.target.value === "1") {
      value = true;
    }
    this.setState({ isAccepted: value });
  };

  handleSubmit = () => {
    CreateAcceptanceStatus({
      remarks: this.state.remarks,
      isAccepted: this.state.isAccepted,
      versionId: this.props.versionId,
    })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ isReviewed: true });
        }
      })
      .catch((err) => {});
  };
  form = () => {
    let jsx = <div></div>;
    if (this.state.isReviewed) {
      jsx = (
        <div className="text-center">
          <span className="alert alert-info">
            You have Reviewed and{" "}
            {this.state.isAccepted ? "Accepted" : "Reject"} these changes
          </span>
        </div>
      );
    } else if (
      (this.state.statuses.length > 0) &
      this.state.statuses.filter((i) => i.role < this.state.role)
    ) {
      jsx = (
        <div className="text-center">
          <span className="alert alert-danger">
            Higher management has Reviewed and{" "}
            {this.state.isAccepted ? "Accepted" : "Reject"} these changes
          </span>
        </div>
      );
    } else {
      jsx = (
        <form>
          <FormLabel component="legend">Review</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            onChange={this.handleRadioChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Accept Changes"
              className="m-0 p-0"
              disabled={this.state.isReviewed}
            />
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Reject Changes"
              disabled={this.state.isReviewed}
              className="m-0 p-0"
            />
          </RadioGroup>
          <TextareaAutosize
            className="form-control"
            placeholder="Remarks"
            disabled={this.state.isReviewed}
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            className="mt-4 w-100"
            disabled={this.state.isReviewed}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
      );
    }
    return <div className={classes.container}>{jsx}</div>;
  };

  renderButtons = () => {
    var jfx = <div>{this.form()}</div>;
    if (this.state.role === "1") {
      jfx = (
        <React.Fragment>
          {jfx}
          <input
            type="button"
            className={classes.uploadChangeButton}
            value="Upload Changes"
            onClick={this.handleAcceptClick}
            style={styles.uploadChangeButton}
            disabled={!this.state.isReviewed}
          />
        </React.Fragment>
      );
    }
    if (this.state.role === "2") {
      jfx = <React.Fragment>{jfx}</React.Fragment>;
    }
    if (this.state.role === "3") {
      jfx = <React.Fragment>{jfx}</React.Fragment>;
    }
    if (this.state.role === "4") {
      return null;
    }

    return jfx;
  };
  render() {
    return <div>{this.renderButtons()}</div>;
  }
}

export default AcceptanceStatus;

const classes = {
  container: "my-2 py-4 px-3 border border-info rounded",
  uploadChangeButton:
    "btn btn-lg btn-warning ml-2 position-absolute float-right",
};

const styles = {
  uploadChangeButton: {
    bottom: 50,
    right: 50,
    width: "20%",
    zIndex: 1,
    minWidth: 175,
  },
};
