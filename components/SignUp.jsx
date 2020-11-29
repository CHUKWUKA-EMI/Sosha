import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
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
import validations from "../libs/validations";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

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
		marginBottom: "1rem",
	},
	submit: {
		fontSize: "bold",
		marginTop: "2rem",
	},
	profileInfo: {
		border: "1px solid #32506D",
		padding: "0.3em 1em",
		borderRadius: "5px",
	},
}));

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	phone: "",
	birthdate: "",
};

const initialMessages = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	phone: "",
	birthdate: "",
	success: "",
	failure: "",
};

const SignUp = () => {
	const classes = useStyles();
	const router = useRouter();
	const [birthdate, setBirthdate] = useState("");
	const [state, setState] = useState(initialState);
	const [messages, setMessages] = useState(initialMessages);
	const [dataloading, setLoading] = useState(false);
	const [show, setShow] = useState({
		password: false,
		passconf: false,
	});

	useEffect(() => {
		const authData = JSON.parse(localStorage.getItem("authData"));
		const token = authData !== null ? authData.token : "";
		if (!token) {
			router.push("/feeds");
		}
	});
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const validateField = (e) => {
		if (e.target.name === "firstName") {
			const validate = validations(
				state.firstName,
				"First Name",
				true,
				"",
				"",
				20
			);
			if (validate.status) {
				setMessages({
					...messages,
					firstName: validate.message,
					success: "",
					failure: "",
				});
			} else {
				setMessages({ ...messages, firstName: "", success: "", failure: "" });
			}
		}

		if (e.target.name === "lastName") {
			const validate = validations(
				state.lastName,
				"Last Name",
				true,
				"",
				"",
				20
			);
			if (validate.status) {
				setMessages({
					...messages,
					lastName: validate.message,
					success: "",
					failure: "",
				});
			} else {
				setMessages({ ...messages, lastName: "", success: "", failure: "" });
			}
		}

		if (e.target.name === "email") {
			const validate = validations(state.email, "Email", true, "email");
			if (validate.status) {
				setMessages({
					...messages,
					email: validate.message,
					success: "",
					failure: "",
				});
			} else {
				setMessages({ ...messages, email: "", success: "", failure: "" });
			}
		}

		if (e.target.name === "phone") {
			const validate = validations(
				state.phone,
				"mobile number",
				true,
				"digits"
			);
			if (validate.status) {
				setMessages({
					...messages,
					phone: validate.message,
					success: "",
					failure: "",
				});
			} else {
				setMessages({ ...messages, phone: "", success: "", failure: "" });
			}
		}

		if (e.target.name === "password") {
			const validate = validations(
				state.password,
				"Password",
				true,
				"password"
			);
			if (validate.status) {
				setMessages({ ...messages, password: validate.message });
			} else {
				setMessages({ ...messages, password: "", success: "", failure: "" });
			}
		}

		if (e.target.name === "confirmPassword") {
			const validate = validations(
				state.passwordConfirmation,
				"Password Confirmation",
				true,
				"compare",
				state.password
			);

			if (validate.status) {
				setMessages({
					...messages,
					passwordConfirmation: validate.message,
					success: "",
					failure: "",
				});
			} else {
				setMessages({
					...messages,
					passwordConfirmation: "",
					success: "",
					failure: "",
				});
			}
		}
	};

	const clearError = (value) => {
		if (value !== "failure" || value !== "success") {
			setMessages({ ...initialMessages, [value]: "" });
		}
		setMessages(initialMessages);
	};

	const clearMessages = () => {
		const timer = setTimeout(() => {
			clearError();
		}, 1000 * 3);
		return () => clearTimeout(timer);
	};

	const CREATE_USER = gql`
		mutation createUser(
			$firstName: String!
			$lastName: String!
			$email: String!
			$password: String!
			$phone: String!
			$birthdate: Date!
		) {
			createUser(
				firstName: $firstName
				lastName: $lastName
				email: $email
				password: $password
				phone: $phone
				birthdate: $birthdate
			) {
				firstName
				lastName
			}
		}
	`;
	const [creatUser, { loading }] = useMutation(CREATE_USER, {
		ignoreResults: false,
		onError: (error) => {
			console.log("error", error);
			setMessages({
				failure: "Sorry your request cannot be processed at the moment",
			});
		},
		onCompleted: () => {
			setMessages({
				...messages,
				success:
					"Your registration was successful. Check your Email for further instructions on how to activate your account.",
			});
			setState(initialState);
		},
	});

	const handleSubmit = async () => {
		creatUser({
			variables: {
				firstName: state.firstName,
				lastName: state.lastName,
				email: state.email,
				password: state.password,
				phone: state.phone,
				birthdate: birthdate,
			},
		});
	};

	const noErrors = () => {
		const valid =
			!messages.firstName &&
			!messages.lastName &&
			!messages.email &&
			!messages.password &&
			!messages.confirmPassword &&
			state.firstName &&
			!messages.phone &&
			state.phone &&
			state.lastName &&
			state.email &&
			state.password &&
			state.confirmPassword;

		return !valid;
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
				<form
					className={classes.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}>
					{messages.failure && (
						<Alert
							severity="error"
							onClose={() => clearError("failure")}
							color="error">
							{messages.failure}
						</Alert>
					)}
					{messages.success && (
						<Alert
							severity="success"
							onClose={() => clearError("success")}
							color="info">
							{messages.success}
						</Alert>
					)}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Typography color="primary">
								First Name <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								name="firstName"
								disableUnderline={true}
								value={state.firstName}
								onChange={handleChange}
								onKeyUp={validateField}
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
								onChange={handleChange}
								onKeyUp={validateField}
								value={state.lastName}
								id="lastName"
								name="lastName"
								autoComplete="lname"
							/>
						</Grid>
						{messages.firstName && (
							<Alert severity="error" color="error">
								{messages.firstName}
							</Alert>
						)}

						{messages.lastName && (
							<Alert severity="error" color="error">
								{messages.lastName}
							</Alert>
						)}
						<Grid item xs={12} sm={6}>
							<Typography color="primary">
								Date of Birth <span style={{ color: "red" }}>*</span>
							</Typography>
							<DatePicker
								selected={birthdate}
								name="birthdate"
								onChange={(date) => setBirthdate(date)}
								isClearable
								showMonthDropdown
								showYearDropdown
								customInput={
									<Input
										className={classes.profileInfo}
										fullWidth
										disableUnderline={true}
										id="dateOfBirth"
										name="birthdate"
										onKeyUp={validateField}
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
								onChange={handleChange}
								value={state.email}
								onKeyUp={validateField}
								id="email"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						{messages.email && (
							<Alert severity="error" color="error">
								{messages.email}
							</Alert>
						)}
						{messages.birthdate && (
							<Alert severity="error" color="error">
								{messages.birthdate}
							</Alert>
						)}
						<Grid item xs={12}>
							<Typography color="primary">
								Phone Number <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								onChange={handleChange}
								value={state.phone}
								onKeyUp={validateField}
								id="phone"
								name="phone"
								autoComplete="phone"
							/>
						</Grid>
						{messages.phone && (
							<Alert severity="error" color="error">
								{messages.phone}
							</Alert>
						)}
						<Grid item xs={12}>
							<Typography color="primary">
								Password <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								onChange={handleChange}
								onKeyUp={validateField}
								value={state.password}
								name="password"
								type={!show.password ? "password" : "text"}
								id="password"
								autoComplete="current-password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() =>
												setShow({ ...show, password: !show.password })
											}
											onMouseDown={() =>
												setShow({ ...show, password: !show.password })
											}>
											{!show.password ? (
												<Visibility color="primary" />
											) : (
												<VisibilityOff color="primary" />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
						{messages.password && (
							<Alert severity="error" color="error">
								{messages.password}
							</Alert>
						)}
						<Grid item xs={12}>
							<Typography color="primary">
								Confirm Password <span style={{ color: "red" }}>*</span>
							</Typography>
							<Input
								className={classes.profileInfo}
								required
								fullWidth
								disableUnderline={true}
								onChange={handleChange}
								value={state.confirmPassword}
								onKeyUp={validateField}
								name="confirmPassword"
								type={!show.passconf ? "password" : "text"}
								id="confirmPassword"
								autoComplete="current-password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() =>
												setShow({ ...show, passconf: !show.passconf })
											}
											onMouseDown={() =>
												setShow({ ...show, passconf: !show.passconf })
											}>
											{!show.password ? (
												<Visibility color="primary" />
											) : (
												<VisibilityOff color="primary" />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Grid>
						{messages.confirmPassword && (
							<Alert severity="error" color="error">
								{messages.confirmPassword}
							</Alert>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						style={{
							background: noErrors() ? "#cfdce6" : "#32506D",
							border: noErrors() ? "1px solid #cfdce6" : "1px solid #32506D",
							color: noErrors() ? "#fff" : "#fff",
						}}
						disabled={noErrors() || loading ? true : false}
						className={classes.submit}>
						{loading ? (
							<CircularProgress size="2em" style={{ color: "#fff" }} />
						) : (
							"Sign Up"
						)}
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
