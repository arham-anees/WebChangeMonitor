import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Paper } from "@material-ui/core";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { getVersionsList } from "../../../RequestToServer/Versions";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CodeIcon from "@material-ui/icons/Code";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
class VersionsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			versions: [],
			isRejectedByLowerLevel: false,
		};
	}

	//#region version item
	statusIcon = (status) => {
		return <ListItemIcon>{status === "Pending" ? <HourglassEmptyIcon edge="start" tabIndex={-1} /> : status === "Uploaded" ? <DoneAllIcon edge="start" tabIndex={-1} /> : <SettingsBackupRestoreIcon edge="start" tabIndex={-1} />}</ListItemIcon>;
	};

	items = () => {
		return (
			<div>
				<List dense={true}>
					{this.state.versions !== undefined && this.state.versions !== null && this.state.versions.length !== 0 ? (
						this.state.versions.map((version) => {
							const labelId = `checkbox-list-label-${version.id}`;
							const isRejected = version.review.filter((x) => x.isAccepted === false).length > 0;
							return (
								<React.Fragment key={version.id}>
									<ListItem key={version.id} disabled={isRejected}>
										<Paper
											elevation={3}
											style={{ width: "100%", cursor: "pointer" }}
											className="d-flex justify-content-between row p-2 m-auto"
											onClick={() => {
												if (!isRejected) {
													this.props.history.push(`/versions/${version.id}`);
												}
											}}
										>
											<span className={classes.col4 + classes.itemMiddle}>
												<span className={classes.flexRow}>
													<ListItemIcon>
														<FlipCameraAndroidIcon edge="start" tabIndex={-1} />
													</ListItemIcon>
													<ListItemText id={labelId} primary={`Version ${version.version}`} />
												</span>
												<span className={classes.flexRow}>
													<ListItemIcon>
														<ScheduleIcon edge="start" tabIndex={-1} style={{ fontSize: 15, marginLeft: 5 }} />
													</ListItemIcon>
													<span style={styles.smallFont}>{version.createdOn}</span>
												</span>
											</span>
											<span className={classes.col4 + classes.itemMiddle + classes.flexRow}>
												<ListItemIcon>
													<CodeIcon edge="start" tabIndex={-1} />
												</ListItemIcon>
												<span>
													<ListItemText id={labelId} primary={`${version.createdBy}`} style={styles.smallFont} />
												</span>
											</span>
											<span className={classes.col4 + classes.itemMiddle + classes.flexRow}>
												{this.statusIcon(version.status)} {version.status}
											</span>
										</Paper>
									</ListItem>
								</React.Fragment>
							);
						})
					) : (
						<h4>No Version Found</h4>
					)}
				</List>
			</div>
		);
	};
	//#endregion

	componentDidMount() {
		getVersionsList()
			.then((res) => this.setState({ versions: res }))
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		return (
			<div className={classes.container}>
				<h3 className={classes.title}>Versions List</h3>
				{this.items()}
			</div>
		);
	}
}

export default VersionsList;

const classes = {
	container: "m-2",
	title: "text-center",
	itemMiddle: " align-items-center",
	col4: " col-4",
	flexRow: " d-flex flex-row",
};

const styles = {
	smallFont: { fontSize: 10 },
};
