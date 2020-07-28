import React from "react";
import { GetDomainUsers } from "../../RequestToServer/Users";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Container } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { DeleteUser } from "../../RequestToServer/Users";
import { Skeleton } from "@material-ui/lab";

class DomainUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			users: [],
			error: null,
		};
	}

	componentDidMount() {
		var user = this.props.user;
		console.log("user.domain", user.domain);
		this.setState({ user });
		GetDomainUsers(1)
			.then((res) => this.setState({ users: res }))
			.catch((err) => {
				console.log(err);
				if (err.status === undefined) this.setState({ error: err });
				else this.setState({ error: err.statusText });
			});
	}

	handleDelete = (username) => {
		console.log(username + " is going to be deleted");
		// eslint-disable-next-line no-restricted-globals
		var result = confirm("Do you really want to delete " + username);
		if (result) {
			DeleteUser(username).then((res) => {
				console.log(res);
			});
		}
	};

	render() {
		if (this.state.error !== null) {
			console.log(this.state.error);
			return <h4>error</h4>;
		} else {
			return (
				<Container>
					<Grid container direction="row" justify="center" alignItems="center" spacing={3} className={"mt-3"}>
						<Grid item xs={12}>
							<Typography variant="h4" component="h2">
								Users
							</Typography>
						</Grid>
						{this.state.users.length > 0
							? this.state.users.map((x, i) => (
									<Grid item xs key={i}>
										<Card>
											<CardActionArea>
												<CardContent>
													<h4>{x.user.userName}</h4>
													<Typography variant="body2" color="textSecondary" component="p">
														{x.user.firstName} {x.user.middleName} {x.user.lastName}
													</Typography>
													<Typography variant="body2" color="textSecondary" component="h5">
														{x.role.roleName}
													</Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														{x.user.email}
													</Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														{x.user.phone}
													</Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														{x.user.address}
													</Typography>
													<Typography variant="body2" color="textSecondary" component="p">
														{x.user.city}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="large" color="secondary" className="ml-auto" disabled={this.state.user.role >= x.role.id} onClick={() => this.handleDelete(x.user.userName)}>
													<DeleteForeverIcon />
												</Button>
											</CardActions>
										</Card>
									</Grid>
							  ))
							: this.renderSkeleton()}
					</Grid>
				</Container>
			);
		}
	}

	renderSkeleton = () => {
		const arr = [1, 2, 3, 4];
		return arr.map((x) => (
			<Grid item xs key={x}>
				<Card>
					<CardActionArea>
						<CardContent>
							<Skeleton variant="text" animation={"wave"} style={{ height: 50 }}></Skeleton>
							<Skeleton variant="text" animation={"wave"}></Skeleton>
							<Skeleton variant="text" animation={"wave"}></Skeleton>
							<Skeleton variant="text" animation={"wave"}></Skeleton>
							<Skeleton variant="text" animation={"wave"}></Skeleton>
							<Skeleton variant="text" animation={"wave"}></Skeleton>
							<Skeleton variant="text" animation={"wave"}></Skeleton>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="large" color="secondary" className="ml-auto" disabled={true}>
							<DeleteForeverIcon />
						</Button>
					</CardActions>
				</Card>
			</Grid>
		));
	};
}

export default DomainUsers;
