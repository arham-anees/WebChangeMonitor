import React from "react";
import "typeface-roboto";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import Auth from "./Auth";
import { BsFillPersonPlusFill, BsFillPeopleFill } from "react-icons/bs";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
		};
	}

	componentWillReceiveProps(props) {
		if (this.props.user !== this.state.user) {
			this.setState({ user: this.props.user });
		}
	}
	// static getDerivedStateFromProps(props, state) {
	// 	if (this.props.user !== this.state.user) {
	// 		this.setState({ user: this.props.user });
	// 	}
	// 	return null;
	// }
	renderAuth = (value, user) => {
		this.props.ChangeAuthStatus(value);
		this.setState({ user: user });
		this.props.history.length = 0;
		this.props.history.push("/Login");
	};
	renderLinks = () => {
		return links.map((link) => {
			// console.log(this.props, link, link.roles.includes(this.props.user.role));
			return this.state.user !== null && this.state.user !== {} && this.state.user !== undefined ? (
				link.roles !== undefined && link.roles.includes(this.state.user.role) ? (
					<Link style={styles.link} to={link.to} key={link.to}>
						{link.icon}
					</Link>
				) : null
			) : null;
		});
	};

	render() {
		return (
			<div className={classes.container} style={styles.container}>
				<div style={styles.header} className={classes.header}>
					<Link style={styles.link} className={classes.brand} to="/">
						<Typography>Web Change Monitor</Typography>
					</Link>

					<span className={classes.links}>
						{this.renderLinks()}
						<Link style={styles.link} to="/about">
							<InfoIcon />
						</Link>
						<Auth refresh={this.renderAuth} user={this.props.user} />
					</span>
				</div>
			</div>
		);
	}
}

export default Header;

const classes = {
	links: "ml-auto my-auto",
	header: "d-flex justify-content-center",
	container: "px-5",
	brand: "my-auto text-decoration-none",
};
const styles = {
	container: { background: "#0017a8", color: "white" },
	header: { height: "10vh", width: "100%" },
	link: { color: "white", marginLeft: "10px" },
};
const links = [
	{ to: "/versions", icon: <ListAltIcon />, auth: true, roles: [1, 2, 3, 4] },
	{ to: "/files/upload", icon: <CloudUploadIcon />, auth: true, roles: [3, 4] },
	{ to: "/RegisterResource", icon: <BsFillPersonPlusFill />, auth: true, roles: [1, 2] },
	{ to: "/Domain/Users", icon: <BsFillPeopleFill />, auth: true, roles: [1, 2] },
];
