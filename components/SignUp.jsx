import React from "react";
import {
	Box,
	Hidden,
	Input,
	InputAdornment,
	IconButton,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DateRange, Visibility, VisibilityOff } from "@material-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
	},
	profileInfo: {
		border: "1px solid #32506D",
		padding: "0.3em 1em",
		borderRadius: "5px",
	},
}));

const SignUp = () => {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = React.useState(null);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
					Sign Up
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Typography color="primary">
								First Name <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								name="firstName"
								disableUnderline={true}
								required
								fullWidth
								id="firstName"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography color="primary">
								Last Name <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								id="lastName"
								name="lastName"
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography color="primary">
								Date of Birth <span style={{ color: "red" }}>*</span>
							</Typography>
							<DatePicker
								selected={selectedDate}
								onChange={(date) => setSelectedDate(date)}
								isClearable
								showMonthDropdown
								showYearDropdown
								customInput={
									<Input
										className={classes.profileInfo}
										fullWidth
										disableUnderline={true}
										id="dateOfBirth"
										name="dateOf Birth"
										endAdornment={
											<InputAdornment position="end">
												<IconButton>
													<DateRange color="primary" />
												</IconButton>
											</InputAdornment>
										}
									/>
								}
								dateFormat="dd/MM/yyyy"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography color="primary">
								Email Address <span style={{ color: "red" }}>*</span>
							</Typography>
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
						<Grid item xs={12}>
							<Typography color="primary">
								Phone Number <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								id="phone"
								name="phone"
								autoComplete="phone"
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography color="primary">
								Password <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								name="password"
								type="password"
								id="password"
								autoComplete="current-password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography color="primary">
								Confirm Password <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								name="confirmpassword"
								type="password"
								id="confirmpassword"
								autoComplete="current-password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I agree to the terms and conditions of using this website."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Sign Up
					</Button>
					<Grid style={{ marginTop: "0.5em" }} container justify="flex-end">
						<Grid item>
							<Typography style={{ fontSize: "17px" }}>
								Already have an account?{" "}
								<Link
									style={{ fontWeight: "bold", color: "primary" }}
									href="/login"
									variant="body2">
									Log in
								</Link>
							</Typography>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};
export default SignUp;
