import * as React from "react";
import SelectedFile from "./SelectedFile";
import * as Utils from "./UploadFilesUtils";
import * as FileApi from "../../../RequestToServer/Files";

import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { setVersion } from "../../../RequestToServer/Versions";
import { uploadFiles } from "./UploadFilesUtils";
import CustomSnackBar from "../../SnackBar";

class UploadFiles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filesToBeSent: [],
			filesFromServer: [],
			modifiedFiles: [],
			deletedFiles: [],
			newVersionFiles: [],
			selectedFiles: [],
			filesCheck: false,
			uploadFiles: false,
			uploading: false,
			isProcessing: false,
			version: "",
			sortBy: "none",
			outputFiles: [],
			reload: false, //this is used for if CEO or manager tries to upload files
			role: 0, //this is used to whether allow logged in user to process files or not
			errorMessage: "",
			openDialog: false,
			disableProjectButton: false,
			disableOutputButton: false,
		};
		this.child = React.createRef();
	}

	componentDidMount() {
		var user = this.props.user;
		if (user !== null) {
			if (user.role < 3 && !this.state.reload) this.setState({ role: user.role, reload: true });
		} else this.props.history.push("/Login");
	}
	handleClickOpen = () => {
		this.setState({ openDialog: true });
	};

	handleClose = () => {
		this.setState({ openDialog: false });
	};

	onFileSelect = async (event) => {
		event.preventDefault();

		if (this.state.uploading) {
			this.setState({ errorMessage: "upload is in progress. please wait and donot close browser or tab", openDialog: true });
			return;
		}

		this.setState({ uploadFiles: true, uploading: true });
		//var apiBaseUrl = ApiUrls.FileList; //axios.defaults.baseURL + "user/upload";

		if (this.state.filesToBeSent.length > 0 && this.state.outputFiles.length > 0 && this.state.version !== "") {
			//output files
			if (await this.uploadOutputFiles()) {
				this.setState({ uploadOutputFilesFailed: false });
			} else {
				this.setState({ uploadOutputFilesFailed: true });
			}
			//upload modified files
			await this.uploadModifiedFiles().then((res) => {
				setVersion(this.state.version, this.state.newVersionFiles);
			});
		} else {
			this.setState({ uploadFiles: false, uploading: false, errorMessage: "Please select both project folder and output folder", openDialog: true });
		}
	};

	handleOutputFolderSelect = (e) => {
		let targetfiles = [...e.target.files];
		if (targetfiles !== null && targetfiles.length !== 0) this.setState({ outputFiles: targetfiles, disableProjectButton: true });
		else this.setState({ errorMessage: "Please select a valid folder", openDialog: true });
	};
	//this method handles change in file selection
	handleChange = async (e) => {
		const files = []; ///...this.state.filesToBeSent]; //get files from current state
		files.push([...e.target.files]); //push new files
		if (files.length !== 0) {
			await this.setState({
				//update state
				filesToBeSent: files,
			});
			this.checkOutputFilesValidity();
			this.setState({ isProcessing: true });
			let selectedFiles = [];
			await files[0].forEach((element, index) => {
				let obj = {
					file: element,
					number: index,
					isAdded: true,
					isModified: false,
					isDeleted: false,
					isUploaded: false,
					isUploading: false,
					isUploadFailed: false,
					status: 0,
				};

				selectedFiles.push(obj);
			});
			if (selectedFiles.length > 0) {
				console.log("work started");
				await this.setState({
					selectedFiles: selectedFiles,
				});
				await this.getWebsiteFiles().catch((err) => {
					//error message
					this.setState({ errorMessage: err.message, openDialog: true });
				});

				console.log("checkModifiedFiles");
				//check modified files
				await this.checkModifiedFiles()
					.then((res) => {
						this.setState({ selectedFiles: res.filesArray });
					})
					.catch((err) => {
						//error message
						this.setState({ errorMessage: err.message, openDialog: true });
					});

				console.log("checkDeletedFiles");
				await this.checkDeletedFiles();
				// .then((x) => {})
				// .catch((err) => {
				// 	//error message
				// 	this.setState({ errorMessage: err, openDialog: true });
				// });
				//console.log("work completed");
				this.setState({ isProcessing: false });
			}
		} else {
			this.setState({ errorMessage: "Please select a valid folder", openDialog: true });
		}
	};

	checkOutputFilesValidity = () => {
		const project = [...this.state.filesToBeSent[0]];
		const output = [...this.state.outputFiles];
		console.log("project", project);
		console.log("output", output);
	};
	getWebsiteFiles = () => {
		return new Promise((resolve, reject) => {
			console.log("getting files list from server");
			FileApi.getWebsiteFiles()
				.then((response) => {
					// console.log("Response :", response);
					if (response.status === 200) {
						let newVersionFiles = [];

						response.data.versionFiles.forEach((x) => {
							// console.log(x);
							newVersionFiles.push({
								encodedName: x.file.encodedName,
								statusId: 4,
							});
						});
						// console.log(newVersionFiles);
						this.setState({
							filesFromServer: response.data.versionFiles,
							newVersionFiles: newVersionFiles,
						});
						resolve(response.data);
						console.log("files list got successfully");
					} else if (response.status === 204) {
					}
					resolve("null");
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	};

	checkDeletedFiles = () => {
		const s = this.state;
		if (s.selectedFiles.length > 0) {
			Utils.getDeletedFiles([...s.selectedFiles], s.filesFromServer).then((res) => {
				console.log("Deleted Files :", res);
				let UpdatedVersionFiles = [...s.newVersionFiles];
				res.forEach((x) => {
					UpdatedVersionFiles.forEach((file) => {
						if (s.newVersionFiles.includes(file)) file.statusId = 3;
					});
					// const index = s.newVersionFiles.findIndex((f) => f.encodedName === x.file.encodedName);
					// //TODO: change this approach to better approach by separating out object first
					// UpdatedVersionFiles[index].statusId = 3;
				});
				this.setState({
					deletedFiles: res,
					selectedFiles: this.state.selectedFiles.concat(res),
					newVersionFiles: UpdatedVersionFiles,
				});
			});
		} else {
			console.log("no file is selected, please select files");
		}
	};

	checkModifiedFiles = () => {
		return new Promise((resolve, reject) => {
			if (this.state.selectedFiles.length === 0) {
				reject("lenth of selected files is zero. please select files first");
			}
			console.log("checking files for modification");
			let s = this.state;

			Utils.getModifiedFiles([...s.selectedFiles], s.filesFromServer, s.newVersionFiles).then((res) => {
				const files = [...res.filesArray];
				let modifiedFiles = files.filter((item) => {
					return item.isModified;
				});
				//console.log("Res :", res);
				//console.log("modified files :", modifiedFiles);
				// let UpdateVersionFiles = [...s.newVersionFiles];
				// modifiedFiles.forEach((x) => {
				//   const index = UpdateVersionFiles.findIndex(
				//     (f) => f.encodedName === x.file.encodedName
				//   );
				//   if (index > -1) {
				//     UpdateVersionFiles[index].statusId = 2;
				//   } else {
				//     //console.log()
				//   }
				//});
				console.log(res.newVersionFiles);
				console.log("checking files for modification completed");
				this.setState({
					modifiedFiles: modifiedFiles,
					newVersionFiles: res.newVersionFiles,
				});
				console.log(this.state.newVersionFiles);
				resolve(res);
			});
		});
	};

	uploadModifiedFiles = () => {
		return new Promise((resolve, reject) => {
			const items = this.state.selectedFiles.filter((x) => x.status === 1 || x.status === 2);
			console.log(items);
			let updateVersionFiles = [...this.state.newVersionFiles];
			uploadFiles(items, [...this.state.selectedFiles], this.setState.bind(this))
				.then((result) => {
					this.setState({
						newVersionFiles: updateVersionFiles.concat(result),
					});
					console.log("newVersionFiles:", this.state.newVersionFiles);
					resolve(updateVersionFiles.concat(result));
				})
				.catch((error) => console.log(error));
		});
	};
	uploadOutputFiles = () => {
		try {
			const outputFiles = [...this.state.outputFiles];
			let promises = [];
			outputFiles.forEach((element) => {
				promises.push(FileApi.uploadOutputFile(element));
			});
			let isSuccessful = false;
			Promise.all(promises)
				.then((res) => (isSuccessful = true))
				.catch((err) => console.log(err));
			return isSuccessful;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	//this handles click of delete button on selectedFile to delete item from state
	handleDeleteClick = (index) => {
		//console.log(index);
		let files = [...this.state.filesToBeSent]; //get files from state
		console.log(files[0][index]); //display file to be deleted
		files[0].splice(index, 1); //remove item
		this.setState({ filesToBeSent: files }); //update state
	};

	//this method renders selected files when they are changed
	renderSelectedFiles = () => {
		//console.log("rendering files", this.state.selectedFiles);
		let files = [...this.state.selectedFiles]; //get list of files

		//TODO: sort data here and then apply to files list
		//underscoreJs can help
		if (this.state.sortBy === "name") {
			console.log(files.sort((a, b) => a.file.name - b.file.name));
		} else if (this.state.sortBy === "lastModifiedDate") {
		}
		if (files[0] != null) {
			return files.map((file, i) => {
				return <SelectedFile key={i} {...file} handleClick={this.handleDeleteClick.bind(this)} />;
			});
		}
	};

	handleVersionBlur = (event) => {
		this.setState({ version: event.target.value });
	};

	handleSelectedIndexChanged = (event) => {
		const sortBy = event.target.value;
		console.log(sortBy);
		this.setState({ sortBy: sortBy });
	};
	renderUnderProgressMessage = () => {
		return <div>renderUnderProgressMessage</div>;
	};
	renderVersionInput = () => {
		return (
			<div className="d-flex align-items-center">
				<label>Version:</label>
				<input type="text" name="version" className="form-control m-2" onBlur={this.handleVersionBlur} />
			</div>
		);
	};
	renderDropDown = () => {
		const disable = this.state.selectedFiles.length === 0;
		return (
			<div className={classes.dropDownContainer}>
				<div className="row">
					<div className="col-2">Sort By</div>
					<div className="col-10">
						<select name="SortBy" id="sortBy" className={classes.dropDown} onChange={this.handleSelectedIndexChanged} disabled={disable}>
							<option value="none">None</option>
							<option value="name">Name</option>
							<option value="path">Location</option>
							<option value="lastModfiedDate">Last Modified Date</option>
						</select>
					</div>
				</div>
			</div>
		);
	};
	renderUploadBtn = () => {
		const disable = this.state.selectedFiles.length === 0;

		return (
			<Fab variant="extended" style={styles.floatingButton} disabled={disable} onClick={this.onFileSelect}>
				<CloudUploadIcon className="m-1" />
				Upload
			</Fab>
		);
	};
	renderFileInput = () => {
		return (
			<React.Fragment>
				<input webkitdirectory="" multiple className="d-none projectFolder" type="file" onChange={this.handleChange} />
				<button
					className={classes.select}
					onClick={() => {
						let element = document.getElementsByClassName("projectFolder")[0];
						element.click();
					}}
				>
					Select Project Folder
				</button>
				<input webkitdirectory="" multiple className="d-none outputFolder" type="file" onChange={this.handleOutputFolderSelect} />
				<button
					className={classes.select + " mt-2 bg-secondary"}
					onClick={() => {
						let element = document.getElementsByClassName("outputFolder")[0];
						element.click();
					}}
				>
					Select Output Folder
				</button>
			</React.Fragment>
		);
	};
	renderView = () => {
		if (this.state.isProcessing) {
			return (
				<React.Fragment>
					{this.renderUnderProgressMessage()}
					{this.renderSelectedFiles()}
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{this.renderDropDown()}
				{this.renderSelectedFiles()}
				{this.renderUploadBtn()}
			</React.Fragment>
		);
	};

	renderDialog = () => {
		return <CustomSnackBar message={this.state.errorMessage} handleClose={this.handleClose} open={this.state.openDialog} />;
	};
	render() {
		return (
			<div className={classes.container}>
				{this.renderFileInput()}
				{this.renderVersionInput()}
				{this.renderView()}
				{this.renderDialog()}
			</div>
		);
	}
}
export default UploadFiles;

const classes = {
	container: "container mt-3",
	select: "btn btn-block btn-primary",
	upload: "btn btn-block btn-success",
	dropDownContainer: "my-2",
	dropDown: "form-control",
};
const styles = {
	floatingButton: {
		opacity: 0.75,
		position: "fixed",
		top: "90vh",
		left: "80%",
		transform: "translate(-50%, -100%)",
	},
};
