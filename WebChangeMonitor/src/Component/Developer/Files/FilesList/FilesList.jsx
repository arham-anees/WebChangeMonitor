import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import { getVersion } from "../../../../RequestToServer/Versions";
import FilesListItem from "./FilesListItem";
import AcceptanceStatus from "./AcceptanceStatus";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { Button } from "@material-ui/core";
import { Chip } from "material-ui";
import CustomSnackBar from "../../../SnackBar";

class FilesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [], //this.handleLoad,
			error: 0,
			versionId: 0,
			versionStatus: 0,
			isLoading: true,
			errorMessage: "",
			openDialog: false,
		};
	}

	renderStatus = () => {
		if (this.state.versionId > 0) {
			return <AcceptanceStatus versionId={this.state.versionId} user={this.props.user} />;
		}
	};
	handleClose = () => {
		this.setState({ openDialog: false });
	};
	getUploadDate = (files) => {
		try {
			let isDone = false;
			files.forEach((x) => {
				if (x.fileStatus.id !== 4 && !isDone) {
					this.setState({ uploadDate: x.file.uploadCompleteDateTime });
					isDone = true;
				}
			});
		} catch (err) {
			this.setState({ errorMessage: err.message, openDialog: true });
		}
	};

	render() {
		const loading = this.state.isLoading;
		return (
			<div className={classes.container}>
				{this.renderStatus()}
				{this.errorView()}
				<div className={classes.listItemsContainer}>
					<div className={classes.filesListTitle}>Version {loading ? <Skeleton variant="text" style={{ width: 100, display: "inline-block" }} /> : this.state.version}</div>
					<Divider light />
					<div className="ml-4">
						<p>
							<span style={{ color: "#c4c4c4" }}>Uploaded On:</span> {loading ? <Skeleton variant="text" style={styles.skeleton} /> : <span> {moment(this.state.uploadDate)._d.toString().substring(0, 24)}</span>}
						</p>
						<div>
							<span style={{ color: "#c4c4c4" }}>Developer Name: </span>
							{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.developer}
						</div>
						<div>
							<span style={{ color: "#c4c4c4" }}>Developer Username: </span>
							{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.username}
						</div>
						<div>
							<span style={{ color: "#c4c4c4" }}>Developer Email: </span>
							{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.email}
						</div>
					</div>
					<Divider light />
					{loading ? this.listItemsSkeleton() : this.listItems()}
				</div>
			</div>
		);
	}

	componentDidMount = () => {
		//const history = useHistory();

		console.log("history", this.props.history);
		let user = this.props.user;
		if (user === null) {
			this.props.history.push("/login");
		}

		const versionId = this.props.match.params.versionId;
		console.log("param", versionId);
		if (parseInt(versionId) < 1) {
			this.props.history.push("/");
		} else {
			getVersion(versionId) //to call this method only once
				.then((res) => {
					this.getUploadDate(res.versionFiles);
					console.log(res);
					this.setState({
						files: res.versionFiles,
						role: user.role,
						developer: res.developer,
						email: res.email,
						username: res.username,
						status: res.status,
						version: res.version,
						isLoading: false,
						versionId: versionId,
					});
				})
				.catch((err) => {
					this.setState({ error: 1 });
				});
		}
	};
	renderDialog = () => {
		return <CustomSnackBar message={this.state.errorMessage} handleClose={this.handleClose} open={this.state.openDialog} />;
	};
	errorView = () => {
		return <CustomSnackBar message={this.state.errorMessage} handleClose={this.handleClose} open={this.state.openDialog} />;
		// if (this.state.error === 0) {
		// 	return <div></div>;
		// }
		// return (
		// 	<div className="mt-4">
		// 		<span className={classes.error}>An Error occurred while getting files from server</span>
		// 	</div>
		// );
	};

	listItemsSkeleton = () => {
		const arr = [1, 2, 3, 4, 5];
		return arr.map((x) => {
			return (
				<React.Fragment>
					<div className={"pl-4 pr-4 p-2"}>{this.listItemSkeleton()}</div>
					<Divider light />
				</React.Fragment>
			);
		});
	};
	listItemSkeleton = () => {
		return (
			<div className={classes.listItem}>
				<span style={styles.flex2}>
					<span className={classes.contentVerticalCenter}>
						<span>
							<InsertDriveFileIcon color="primary" style={{ fontSize: 35 }} />
						</span>
						<span className="d-inline-block">
							<span>
								<Skeleton variant="text" style={{ width: 100, display: "inline-block" }} />
							</span>
							<div style={styles.fileLocalPath}>
								<Skeleton variant="text" style={{ width: 100, display: "inline-block" }} />
							</div>
						</span>
					</span>
				</span>
				<span style={styles.flex1}>
					<span>
						<Skeleton variant="text" style={{ width: 100 }} />
					</span>
					<span>
						<Skeleton>
							<Chip size="small" clickable className="mr-2" />
						</Skeleton>
						<span>
							<Button variant="contained" color="primary" className={"mr-2"}>
								Compare
							</Button>
							<Button variant="contained" color="primary">
								View
							</Button>
						</span>
					</span>
				</span>
			</div>
		);
	};
	//design list of files
	listItems = () => {
		let files = [...this.state.files]; //TODO sort files to show in directory structure

		if (files.length > 0) {
			return files.map((file) => {
				return (
					<React.Fragment key={file.file.encodedName.toString()}>
						<FilesListItem file={file.file} fileStatus={file.fileStatus} fileStatusId={file.fileStatusId} />
						<Divider />
					</React.Fragment>
				);
			});
		}
	};
}

export default FilesList;

const classes = {
	container: "container",
	listItem: "d-flex justify-content-between w-100 align-items-center",
	contentVerticalCenter: "d-flex align-items-center",
	error: "alert alert-danger font-lg",
	listItemsContainer: "mt-4 rounded border border-secondary mb-5",
	filesListTitle: "font-weight-bold font-italic font-xl text-center my-3",
};
const styles = {
	skeleton: { width: 300, display: "inline-block" },
	fileName: {},
	fileLocalPath: {
		fontSize: 10,
	},
	flex2: {
		flex: 1,
	},
	flex1: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		display: "flex",
	},
};
