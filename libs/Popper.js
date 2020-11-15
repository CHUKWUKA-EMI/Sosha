import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
	paper: {
		border: "1px solid",
		display: "flex",
		justifyContent: "space-between",
		padding: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SimplePopper(props) {
	const classes = useStyles();
	const { anchorEl, open } = props;

	return (
		<div>
			<Popper open={open} anchorEl={anchorEl}>
				<div className={classes.paper}>{props.children}</div>
			</Popper>
		</div>
	);
}
