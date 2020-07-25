import React, { useState } from "react";
import { Snackbar, Slide } from "@material-ui/core";
import { IconButton } from "material-ui";
import CloseIcon from "@material-ui/icons/Close";

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}
function CustomSnackBar(props) {
	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			TransitionComponent={SlideTransition}
			open={props.open}
			message={props.message}
			action={
				<React.Fragment>
					<IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</React.Fragment>
			}
		/>
	);
}

export default CustomSnackBar;
