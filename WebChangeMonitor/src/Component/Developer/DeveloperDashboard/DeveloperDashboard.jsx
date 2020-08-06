import * as React from "react";
import { Grid, Paper, TableContainer, TableHead, TableCell, withStyles } from "@material-ui/core";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import Done from "@material-ui/icons/Done";
import DeleteForever from "@material-ui/icons/DeleteForever";
import List from "@material-ui/icons/List";
import { getUserVersions } from "../../../RequestToServer/Versions";
import { Table, TableRow, TableBody } from "@material-ui/core";
import { ListItem } from "material-ui";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Chart from "react-google-charts";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: "#0017a8",
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

class DeveloperDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accepted: 10,
			rejected: 4,
			pending: 5,
			versions: [],
			reviews: [],
			dataset: [
				["Months", "Uploads"],
				["January", 0],
				["February", 0],
				["March", 0],
				["April", 0],
				["May", 0],
				["June", 0],
				["July", 0],
				["August", 0],
				["September", 0],
				["November", 0],
				["October", 0],
				["December", 0],
			],
		};
	}
	componentDidMount() {
		try {
			getUserVersions()
				.then((x) => {
					let rejected = x.filter((x) => x.review.filter((y) => !y.isAccepted).length > 0).length;
					let accepted = x.filter((x) => x.review.filter((y) => y.isAccepted).length > 0).length;
					let pending = x.filter((x) => x.review.length === 0).length;
					let reviews = [];
					let dates = [];
					var dataset = [
						["Months", "Uploads"],
						["January", 0],
						["February", 0],
						["March", 0],
						["April", 0],
						["May", 0],
						["June", 0],
						["July", 0],
						["August", 0],
						["September", 0],
						["November", 0],
						["October", 0],
						["December", 0],
					];
					try {
						x.forEach((v) => {
							// v.review.forEach((r) => reviews.push({ ...r, version: v.version }));
							if (new Date().getFullYear().toString() === v.date.substring(0, 4)) {
								dates.push(parseInt(v.date.substring(5, 7)));
							}
						});
						dates.forEach((i) => (dataset[i][1] = ++dataset[i][1]));
						dataset.length = new Date().getMonth() + 2;
					} catch (err) {
						console.log(err);
					}

					x.forEach((v) => {
						v.review.forEach((r) => reviews.push({ ...r, version: v.version }));
					});

					this.setState({ versions: x, accepted, rejected, pending, reviews, dataset });
				})
				.catch((err) => this.setState({ errorMessage: err, openDialog: true }));
		} catch (err) {
			this.setState({ errorMessage: err.message, openDialog: true });
		}
	}
	render() {
		const s = this.state;
		return (
			<div style={styles.container}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} md={3}>
								<Paper elevation={3} style={styles.card}>
									<Grid container>
										<Grid item xs={4}>
											<Paper elevation={10} style={{ ...styles.cardHeader, backgroundColor: "#08009c" }} className={classes.cardHeader}>
												<List color="primary" className={classes.cardIcon} style={styles.cardIcon} />
											</Paper>
										</Grid>
										<Grid item xs={8} style={styles.cardBody}>
											<span style={styles.cardNumber}>{s.accepted + s.rejected + s.pending}</span>
											<br />
											Total Uploads
										</Grid>
									</Grid>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={6} md={3}>
								<Paper elevation={3} style={styles.card}>
									<Grid container>
										<Grid item xs={4}>
											<Paper elevation={10} style={{ ...styles.cardHeader, backgroundColor: "#209940" }} className={classes.cardHeader}>
												<Done color="primary" className={classes.cardIcon} style={styles.cardIcon} />
											</Paper>
										</Grid>
										<Grid item xs={8} style={styles.cardBody}>
											<span style={styles.cardNumber}>{s.accepted}</span>
											<br />
											Accepted
										</Grid>
									</Grid>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={6} md={3}>
								<Paper elevation={3} style={styles.card}>
									<Grid container>
										<Grid item xs={4}>
											<Paper elevation={10} style={{ ...styles.cardHeader, backgroundColor: "#dbd644" }} className={classes.cardHeader}>
												<FlipCameraAndroidIcon color="primary" className={classes.cardIcon} style={styles.cardIcon} />
											</Paper>
										</Grid>
										<Grid item xs={8} style={styles.cardBody}>
											<span style={styles.cardNumber}>{s.pending}</span>
											<br />
											Pending
										</Grid>
									</Grid>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={6} md={3}>
								<Paper elevation={3} style={styles.card}>
									<Grid container>
										<Grid item xs={4}>
											<Paper elevation={10} style={{ ...styles.cardHeader, backgroundColor: "#c70000" }} className={classes.cardHeader}>
												<DeleteForever color="primary" className={classes.cardIcon} style={styles.cardIcon} />
											</Paper>
										</Grid>
										<Grid item xs={8} style={styles.cardBody}>
											<span style={styles.cardNumber}>{s.rejected}</span>
											<br />
											Rejected
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={7}>
								<Paper elevation={3} style={{ padding: 20 }}>
									<Chart
										height={300}
										chartType="Bar"
										loader={<div>Loading Chart</div>}
										data={this.state.dataset}
										options={{
											// Material design options
											chart: {
												title: "Uploads",
												subtitle: "Number of uploads per month, this year",
											},
										}}
										// For tests
										rootProps={{ "data-testid": "3" }}
									/>
								</Paper>
							</Grid>
							<Grid item xs={12} md={5}>
								<Paper elevation={3} style={{ padding: 20 }}>
									<Chart
										height={300}
										chartType="PieChart"
										loader={<div>Loading Chart</div>}
										data={[
											["Task", "Hours per Day"],
											["Accepted", this.state.accepted],
											["Pending", this.state.pending],
											["Rejected", this.state.rejected],
										]}
										options={{
											title: "Versions Status Pie",
											// Just add this option
											is3D: true,
										}}
										rootProps={{ "data-testid": "2" }}
									/>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<Paper elevation={3}>
									{this.state.versions !== null && this.state.versions !== undefined && this.state.versions.length > 0 ? (
										<TableContainer component={Paper}>
											<Table aria-label="simple table">
												<TableHead>
													<TableRow>
														<StyledTableCell>Version</StyledTableCell>
														<StyledTableCell align="right">Files</StyledTableCell>
														<StyledTableCell align="right">Edited</StyledTableCell>
														<StyledTableCell align="right">Added</StyledTableCell>
														<StyledTableCell align="right">Deleted</StyledTableCell>
														<StyledTableCell align="right">Unchanged</StyledTableCell>
														<StyledTableCell align="right">Status</StyledTableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{this.state.versions.map((x) => (
														<TableRow key={x.id}>
															<StyledTableCell component="th" scope="row">
																{x.version}
															</StyledTableCell>
															<StyledTableCell align="right">{x.versionFiles.length}</StyledTableCell>
															<StyledTableCell align="right">{x.versionFiles.filter((x) => x.fileStatusId === 2).length}</StyledTableCell>
															<StyledTableCell align="right">{x.versionFiles.filter((x) => x.fileStatusId === 1).length}</StyledTableCell>
															<StyledTableCell align="right">{x.versionFiles.filter((x) => x.fileStatusId === 3).length}</StyledTableCell>
															<StyledTableCell align="right">{x.versionFiles.filter((x) => x.fileStatusId === 4).length}</StyledTableCell>
															<StyledTableCell align="right">{x.status.name}</StyledTableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									) : (
										"No item found"
									)}
								</Paper>
							</Grid>
							<Grid item xs={12} md={6}>
								{this.state.reviews.map((x) => (
									<React.Fragment>
										<Paper elevation={3}>
											<ListItem>
												<span className="d-flex justify-content-between align-items-center">
													<span>
														{x.userRole.user.userName} | <span style={{ fontSize: 12 }}>{x.userRole.role.roleName}</span>
													</span>
													<span>{x.isAccepted ? <AssignmentTurnedInIcon style={{ color: "#0017a8" }} /> : <BackspaceIcon style={{ color: "#c70000" }} />}</span>
												</span>
												<span className="row" style={{ marginTop: 7 }}>
													<span className="col-2">{x.version}</span>
													<span className="col-10">{x.remarks}</span>
												</span>
											</ListItem>
										</Paper>
									</React.Fragment>
								))}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default DeveloperDashboard;

const classes = {
	cardHeader: "d-flex",
	cardIcon: "m-auto w-100",
};
const styles = {
	container: { margin: 20 },
	card: { height: 120 },
	cardHeader: { height: 120, backgroundColor: "red" },
	cardBody: { textAlign: "center" },
	cardIcon: { height: 35, color: "#fff" },
	cardNumber: { fontSize: 44, fontWeight: 600 },
};
