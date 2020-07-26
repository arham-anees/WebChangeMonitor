import React from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import { Button, Chip } from "@material-ui/core";

function FilesListItem(props) {
	console.log(props);
	return (
		<ListItem>
			<div className={classes.listItem}>
				<span style={styles.flex2}>
					<span className={classes.contentVerticalCenter}>
						<span>
							<InsertDriveFileIcon color="primary" style={{ fontSize: 35 }} />
						</span>
						<span className="d-inline-block">
							<span>{props.file.localName}</span>
							<div style={styles.fileLocalPath}>{props.file.localRelativePath}</div>
						</span>
					</span>
				</span>
				<span style={styles.flex1}>
					<span>{props.file.uploadCompleteDateTime.substring(0, 10)}</span>
					<span>
						<Chip
							size="small"
							label={props.fileStatus.name}
							clickable
							className="mr-2"

							// onDelete={handleDelete}
						/>
						{/* <span className={classes.status}>{props.fileStatus.name}</span> */}
						<span>
							<Button
								variant="contained"
								onClick={(e) => {
									document.getElementById(props.file.encodedName + "2").click();
								}}
								color="primary"
								className={props.fileStatusId !== 2 ? "d-none" : "mr-2"}
							>
								Compare
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={(e) => {
									document.getElementById(props.file.encodedName + "1").click();
								}}
							>
								View
							</Button>
							<Link id={props.file.encodedName + "2"} className="d-none" to={"/files/compare?" + props.file.encodedName} variant="contained" color="primary"></Link>
							<Link id={props.file.encodedName + "1"} className="d-none" to={"/files/content?" + props.file.encodedName} variant="contained" color="primary"></Link>
							{/* <Link style={styles.link} className={props.fileStatusId === 2 ? classes.btnCompare : "d-none"} to={"/files/compare?" + props.file.encodedName}>
								Compare
							</Link>
							<Link style={styles.link} className={classes.btnView} to={"/files/content?" + props.file.encodedName}>
								View
							</Link> */}
						</span>
					</span>
				</span>
			</div>
		</ListItem>
	);
}

export default FilesListItem;

const classes = {
	listItem: "d-flex justify-content-between w-100 align-items-center",
	contentVerticalCenter: "d-flex align-items-center",
	status: "alert alert-info d-inline-block m-0 p-1",
	btnView: "btn btn-sm btn-info ml-1",
	btnCompare: "btn btn-sm btn-primary ml-1",
};

const styles = {
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
