import React from "react";
import { getLastTwoVersions, getFileContent } from "../../../RequestToServer/Files";
import ReactDiffViewer from "react-diff-viewer";
import Skeleton from "@material-ui/lab/Skeleton";
import CustomSnackBar from "../../SnackBar";

class Compare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldValue: "",
			newValue: "",
			files: [],
			versions: [],
			lastModifiedBy: [],
			isLoaded: false,
			errorMessage: "",
			openDialog: false,
		};
	}
	componentDidMount() {
		const encodedName = this.props.location.search.substring(1);
		getLastTwoVersions(encodedName).then((res) => {
			const files = res.data.reverse();
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
					lastModifiedBy: [result[0].lastModifiedBy, result[1].lastModifiedBy],
					versions: [result[0].version, result[1].version],
					isLoaded: true,
				});
			});
		});
	}
	handleClose = () => {
		this.setState({ openDialog: false });
	};
	getFileDetails = () => {
		const loading = !this.state.isLoaded;
		return (
			<div className="bg-light mb-2 p-4">
				<div className={classes.container}>
					<h3>
						<span style={{ color: "#c4c4c4" }}>Name:</span> {loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.files[0].localName}
					</h3>
					<h6>
						<span style={{ color: "#c4c4c4" }}>Relative Path:</span> {loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.files[0].localRelativePath}
					</h6>
					<p>
						<span style={{ color: "#c4c4c4" }}>Uploaded On:</span> {loading ? <Skeleton variant="text" style={styles.skeleton} /> : <span> {Date(this.state.files[0].uploadCompleteDateTime).substring(0, 24).toString() + " / " + Date(this.state.files[1].uploadCompleteDateTime).substring(0, 24).toString()}</span>}
					</p>
					<div>
						<span style={{ color: "#c4c4c4" }}>Developer Name: </span>
						{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.lastModifiedBy[0].name + " / " + this.state.lastModifiedBy[1].name}
					</div>
					<div>
						<span style={{ color: "#c4c4c4" }}>Developer Username: </span>
						{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.lastModifiedBy[0].username + " / " + this.state.lastModifiedBy[1].username}
					</div>
					<div>
						<span style={{ color: "#c4c4c4" }}>Developer Email: </span>
						{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.lastModifiedBy[0].email + " / " + this.state.lastModifiedBy[1].email}
					</div>

					<div>
						<span style={{ color: "#c4c4c4" }}>Version: </span>
						{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.versions[0].version + " / " + this.state.versions[1].version}
					</div>
					<div>
						<span style={{ color: "#c4c4c4" }}>Version Status: </span>
						{loading ? <Skeleton variant="text" style={styles.skeleton} /> : this.state.versions[0].status + " / " + this.state.versions[1].status}
					</div>
				</div>
			</div>
		);
	};
	renderSkeleton = () => {
		return (
			<div>
				<Skeleton variant="text" style={{ height: 20 }} />
			</div>
		);
	};
	renderDialog = () => {
		return <CustomSnackBar message={this.state.errorMessage} handleClose={this.handleClose} open={this.state.openDialog} />;
	};
	render() {
		return (
			<div className={classes.container}>
				{this.getFileDetails()}

				{this.state.isLoaded ? <ReactDiffViewer oldValue={this.state.oldValue} newValue={this.state.newValue} splitView={true} /> : <Skeleton variant="rect" style={{ height: 1000 }} />}
				{this.renderDialog()}
			</div>
		);
	}
}

export default Compare;

const classes = {
	container: "container",
};
const styles = {
	skeleton: { width: 300, display: "inline-block" },
};
