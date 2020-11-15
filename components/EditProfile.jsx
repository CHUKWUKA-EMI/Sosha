import React from "react";
import {
	Modal,
	Backdrop,
	Box,
	Typography,
	Input,
	IconButton,
	InputAdornment,
	Dialog,
	Button,
	Fab,
} from "@material-ui/core";
import { PhotoCamera, Close, DateRange } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%",
		marginBottom: "2rem",
		// Fix IE 11 issue.
		// marginTop: theme.spacing(3),
	},
	submit: {
		fontWeight: "bold",
		marginTop: "2rem",
	},
	profileInfo: {
		border: "1px solid #32506D",
		padding: "0.3em 1em",
		borderRadius: "5px",
	},
	imgArea: {
		height: "9rem",
		width: "9rem",
		background: "#32506D",
		marginLeft: "1rem",
		marginTop: "1rem",
		borderRadius: "4.5rem",
		border: "4px solid #fff",
		position: "absolute",
		zIndex: 1,
		padding: "2.5rem",
		[theme.breakpoints.down("xs")]: {
			marginTop: "1rem",
			height: "6rem",
			width: "6rem",
			padding: "1rem",
			borderRadius: "3rem",
		},
	},
	dialogRoot: {
		width: "100%",
		height: "50em",
		paddingLeft: "2em",
		paddingRight: "2em",
		marginBottom: "2em",
	},
	dialogbox: {
		"& .MuiDialog-paperWidthSm": {
			width: "60%",
		},
	},
}));

const EditProfile = (props) => {
	const { open, handleClose } = props;

	const classes = useStyles();
	const [selectedDate, setSelectedDate] = React.useState(null);
	const rootRef = React.useRef(null);

	const editForm = (
		<Box className={classes.dialogRoot}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
				}}>
				<IconButton color="primary" component="span" onClick={handleClose}>
					<Close
						style={{
							height: "2rem",
							width: "2rem",
						}}
					/>
				</IconButton>
				<Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
					Edit profile
				</Typography>
			</div>
			<form className={classes.form}>
				<Box
					style={{
						marginBottom: "2rem",
						background: "#c2d6d6",
						height: "8rem",
					}}>
					<div style={{ marginLeft: "auto", marginRight: "auto" }}>
						<input
							accept="image/*"
							style={{ display: "none" }}
							id="contained-button-file1"
							type="file"
						/>
						<label htmlFor="contained-button-file1">
							<IconButton
								aria-label="upload picture"
								color="primary"
								component="span">
								<PhotoCamera
									style={{
										height: "2rem",
										width: "2rem",
									}}
								/>
							</IconButton>
						</label>
					</div>
					<div className={classes.imgArea}>
						<input
							accept="image/*"
							style={{ display: "none" }}
							id="contained-button-file2"
							multiple
							type="file"
						/>
						<label htmlFor="contained-button-file2">
							<IconButton
								aria-label="upload picture"
								style={{ color: "#fff" }}
								component="span">
								<PhotoCamera
									style={{
										height: "2rem",
										width: "2rem",
									}}
								/>
							</IconButton>
						</label>
					</div>
				</Box>
				<Box style={{ marginTop: "5rem" }}>
					<Typography color="primary">First Name</Typography>
					<Input
						className={classes.profileInfo}
						name="firstName"
						disableUnderline={true}
						fullWidth
						id="firstName"
						autoFocus
					/>
					<Typography color="primary">Last Name</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="lastName"
						name="lastName"
						autoComplete="lname"
					/>
					<Typography color="primary">Date of Birth</Typography>
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
										<IconButton color="primary">
											<DateRange />
										</IconButton>
									</InputAdornment>
								}
							/>
						}
						dateFormat="dd/MM/yyyy"
					/>
					<Typography color="primary">Email Address</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="email"
						name="email"
						autoComplete="email"
					/>

					<Typography color="primary">Phone Number</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="phone"
						name="phone"
						autoComplete="phone"
					/>
					<Typography color="primary">Headline</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						placeholder="e.g Software Developer at Facebook"
						disableUnderline={true}
						id="headline"
						name="headline"
						autoComplete="headline"
					/>
					<Typography color="primary">Bio</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="bio"
						name="bio"
						autoComplete="bio"
					/>
					<Typography color="primary">Country</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="country"
						name="country"
						autoComplete="country"
					/>
					<Typography color="primary">State</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="state"
						name="state"
						autoComplete="state"
					/>
					<Typography color="primary">Website Url</Typography>
					<Input
						className={classes.profileInfo}
						fullWidth
						disableUnderline={true}
						id="websiteurl"
						name="websiteurl"
						autoComplete="websiteurl"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Save
					</Button>
				</Box>
			</form>
		</Box>
	);

	return (
		<div>
			<Dialog
				className={classes.dialogbox}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				aria-describedby="simple-dialog-description">
				{editForm}
			</Dialog>
		</div>
	);
};

export default EditProfile;
