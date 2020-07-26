import React, { Component } from "react";
import * as FileApi from "../../../RequestToServer/Files";
import moment from "moment";
import { Paper, Button } from "@material-ui/core";

class FileContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			encodedName: "",
			content: "",
			fileType: "",
			file: { localName: "", localRelativePath: "", uploadCompleteDateTime: "2020-07-22T10:48:52.8722603" },
			lastModifiedBy: { name: "", email: "", username: "" },
			version: { version: "", status: "" },
			words: 1000,
		};
	}

	componentDidMount() {
		let param = this.props.location.search.substring(1);
		FileApi.getFileContent(param)
			.then((response) => {
				console.log("result:", response);
				if (response !== undefined) {
					this.setState({
						encodedName: response.encodedName,
						content: response.content,
						fileType: "",
						file: response.file,
						lastModifiedBy: response.lastModifiedBy,
						version: response.version,
					});
				} else {
					//error message
				}
			})
			.catch((error) => console.log(error));
	}

	data = () => {
		return (
			<span>
				{this.state.encodedName} | {this.state.content}
			</span>
		);
	};
	handleReadMore = () => {
		if (this.state.words + 1200 < this.state.content.length) this.setState({ words: this.state.words + 1000 });
		else this.setState({ words: this.state.content.length });
	};
	render() {
		return (
			<div className={classes.main}>
				<div className={classes.container}>
					<h3>
						<span style={{ color: "#c4c4c4" }}>Name:</span> {this.state.file.localName}
					</h3>
					<h6>
						<span style={{ color: "#c4c4c4" }}>Relative Path:</span> {this.state.file.localRelativePath}
					</h6>
					<p>
						<span style={{ color: "#c4c4c4" }}>Uploaded On:</span> {moment(this.state.file.uploadCompleteDateTime)._d.toString().substring(0, 24)}
					</p>
					<span>
						<span style={{ color: "#c4c4c4" }}>Developer Name: </span>
						{this.state.lastModifiedBy.name}
					</span>
					<br />
					<span>
						<span style={{ color: "#c4c4c4" }}>Developer Username: </span>
						{this.state.lastModifiedBy.username}
					</span>
					<br />
					<span>
						<span style={{ color: "#c4c4c4" }}>Developer Email: </span>
						{this.state.lastModifiedBy.email}
					</span>
					<br />

					<span>
						<span style={{ color: "#c4c4c4" }}>Version: </span>
						{this.state.version.version}
					</span>
					<br />
					<span>
						<span style={{ color: "#c4c4c4" }}>Version Status: </span>
						{this.state.version.status}
					</span>
					<Paper elevation={3} className="mt-3 mb-3 p-2">
						<pre>{this.state.content.substring(0, this.state.words) + (this.state.words < this.state.content.length ? "..." : "")}</pre>
						{this.state.words < this.state.content.length ? (
							<div>
								<Button variant="outlined" color="primary" onClick={this.handleReadMore}>
									Read More
								</Button>
								<Button variant="outlined" className="ml-2" color="primary" onClick={() => this.setState({ words: this.state.content.length })}>
									Read All
								</Button>
							</div>
						) : null}
					</Paper>
				</div>
			</div>
		);
	}
}

export default FileContent;

const classes = {
	main: "bg-white",
	container: "container bg-light pt-4",
};
