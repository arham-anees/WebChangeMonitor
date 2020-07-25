import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ErrorIcon from "@material-ui/icons/Error";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";

class SelectedFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: props.file.file !== undefined ? props.file.file : props.file,
			isModified: props.isModified,
			isDeleted: false,
			isUploading: false,
			isUploadCompleted: false,
		};
	}

	handleClick = (index) => {
		this.props.handleClick(index);
	};

	// getProgressBar = () => {
	//   if (this.props.isUploading && !this.props.isUploadCompleted) {
	//     return (
	//       <div className={classes.progressBar}>
	//         <LinearProgress />
	//       </div>
	//     );
	//   }
	// };

	getDate = () => {
		if (this.props.file.lastModifiedDate === undefined) {
			return;
		}
		let date = this.props.file.lastModifiedDate;
		return (
			<div className={classes.date}>
				<div>{date.toLocaleDateString()} </div>
				<div>{date.toLocaleTimeString()}</div>
			</div>
		);
	};

	getStatusIndicator = () => {
		let title = "";
		let jsx = "";
		if (this.props.isUploading) {
			return (
				<div style={styles.root}>
					<Tooltip title="this file is uploading, please wait">
						<CircularProgress color="primary" />
					</Tooltip>
				</div>
			);
		} else if (this.props.isUploadFailed) {
			title = "this file failed to upload";
			jsx = <ErrorIcon color="primary" />;
		} else if (this.props.isUploadCompleted) {
			title = "this file is uploaded successfully";
			jsx = <CheckCircleIcon color="primary" />;
		} else if (this.props.isModified) {
			title = "this file is modified, this will be uploaded";
			jsx = <CloudUploadIcon color="primary" />;
		} else if (this.props.isAdded) {
			title = "this file is deleted from local machine";
			jsx = <AddCircleIcon style={{ color: "#07b507" }} />;
		} else if (this.props.isDeleted) {
			title = "this file is deleted from local machine";
			jsx = <CancelIcon color="secondary" />;
		} else {
			title = "this file is unchanged, and will be ignore while uploading files";
			jsx = <CloudUploadIcon color="disabled" />;
		}

		return <Tooltip title={title}>{jsx}</Tooltip>;
	};

	getName = () => {
		//if (this.props.file.file !== undefined) this.setState({ file: this.props.file.file });
		let f = this.state.file;
		return f.name ? f.name : f.localName;
	};

	getRelativePath = () => {
		let f = this.state.file;
		return f.webkitRelativePath ? f.webkitRelativePath : f.localRelativePath;
	};
	render() {
		return (
			<div className={classes.container}>
				<div className={classes.subContainer}>
					<span>
						<InsertDriveFileIcon color="primary" />
						<span>
							<span className={classes.fileName}>{this.getName()}</span>
							<br />
							<span style={styles.smallText}>{this.getRelativePath()}</span>
						</span>
					</span>
					<span>{this.getDate()}</span>
					<span>{this.getStatusIndicator()}</span>
				</div>
			</div>
		);
	}
}

export default SelectedFile;

const classes = {
	container: "my-3 p-2 bg-light rounded",
	subContainer: " align-items-center d-flex justify-content-between",
	fileNameContainer: "",
	fileName: "pl-1",
	progressBar: "mt-2",
	date: "text-center small",
};

//TODO: convert this into makeStyles and apply style to progress bar
const styles = {
	root: {
		display: "flex",
	},
	spinner: {
		height: "25px !important",
		width: "25px !important",
	},
	smallText: {
		fontSize: 10,
	},
};
