import React from "react";

import { Button, TextareaAutosize, FormLabel, FormControlLabel, RadioGroup, Radio, Paper } from "@material-ui/core";
import { CreateAcceptanceStatus, GetLatestAcceptanceStatus, GetAcceptanceStatusesList } from "../../../../RequestToServer/AcceptanceStatus";
import { Chip, Avatar } from "material-ui";
import DoneIcon from "@material-ui/icons/Done";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

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
			openDialog: false,
			errorMessage: "",
		};
	}
	componentDidMount() {
		let user = this.props.user;
		this.setState({ role: user.role });

		if (user.role < 4)
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
	getStatuses = () => {
		if (this.state.statuses.length > 0) {
			return this.state.statuses.map((x) => (
				<Paper elevation={3} className="mt-3 mb-3 p-2" style={{ backgroundColor: x.isAccepted ? "#4caf50" : "#f44336" }}>
					{x.isAccepted ? <CheckCircleIcon style={{ color: "#fff" }} /> : <CancelIcon style={{ color: "#fff" }} />}
					<span style={{ color: "white" }}>
						{"  "}
						{x.user} <span style={{ fontSize: "small" }}>(Role: {x.roleName})</span>: {x.remarks}
					</span>
					{this.state.isReviewed ? (
						<Chip
							size="small"
							avatar={<Avatar>M</Avatar>}
							label={`You have Reviewed and ${this.state.isAccepted ? "Accepted" : "Reject"} these changes`}
							// clickable
							color="primary"
							// onDelete={handleDelete}
							deleteIcon={<DoneIcon />}
						/>
					) : null}
				</Paper>
			));
		}
	};
	form = () => {
		//let jsx = <div></div>;
		if (this.state.role < 4)
			if (!this.state.isReviewed && this.state.statuses.filter((x) => x.role === this.state.role).length === 0) {
				return (
					<form>
						<FormLabel component="legend">Review</FormLabel>
						<RadioGroup aria-label="gender" name="gender1" onChange={this.handleRadioChange}>
							<FormControlLabel value="1" control={<Radio />} label={`Accept Changes ${this.state.role === 1 ? `(Accepting changes will upload files to server)` : ``}`} className="m-0 p-0" disabled={this.state.isReviewed} />
							<FormControlLabel value="0" control={<Radio />} label="Reject Changes" disabled={this.state.isReviewed} className="m-0 p-0" />
						</RadioGroup>
						<TextareaAutosize className="form-control" placeholder="Remarks" disabled={this.state.isReviewed} onChange={this.handleChange} />
						<Button variant="contained" color="primary" className="mt-4 w-100" disabled={this.state.isReviewed} onClick={this.handleSubmit}>
							Submit
						</Button>
					</form>
				);
			}

		return null; //<div className={classes.container}>{jsx}</div>;
	};

	render() {
		return (
			<div>
				{this.getStatuses()}
				{this.form()}
			</div>
		);
	}
}

export default AcceptanceStatus;
