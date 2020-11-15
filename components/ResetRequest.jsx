import React from "react";
import { Box, Hidden, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "7em",
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		fontSize: "bold",
		marginTop: "1em",
	},
	profileInfo: {
		border: "1px solid #32506D",
		padding: "0.3em 1em",
		borderRadius: "5px",
	},
}));

const ResetRequest = () => {
	const classes = useStyles();

	return (
		<Grid className={classes.root} spacing={2} justify="center" container>
			<Hidden xsDown>
				<Grid item sm={6}>
					<Box>
						<img src="/auth.svg" alt="auth image" style={{ width: "90%" }} />
					</Box>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={6}>
				<Typography color="primary" component="h1" variant="h5">
					Enter your Email address
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography color="primary">Email Address</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								id="email"
								name="email"
								autoComplete="email"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Send Request
					</Button>
				</form>
			</Grid>
		</Grid>
	);
};
export default ResetRequest;
