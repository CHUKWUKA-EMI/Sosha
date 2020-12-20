import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import {
	Box,
	Typography,
	Button,
	AppBar,
	Tabs,
	Tab,
	Link,
	Badge,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import EditProfile from "./EditProfile";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import validations from "../libs/validations";
import Resizer from "react-image-file-resizer";
import { formatDate } from "../libs/dates";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
	},
	imgArea: {
		height: "9rem",
		width: "9rem",
		background: "#32506D",
		marginLeft: "1rem",
		marginTop: "4rem",
		borderRadius: "4.5rem",
		border: "4px solid #fff",
		position: "absolute",
		zIndex: 1,
		// [theme.breakpoints.down("xs")]: {
		// 	height: "4rem",
		// 	width: "4rem",
		// 	borderRadius: "3rem",
		// },
	},
	infobox: {
		paddingLeft: "1rem",
		paddingRight: "1rem",
		paddingTop: "3.5rem",
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		maxWidth: "100%",
		overflowX: "hidden",
	},
	fab: {
		backgroundColor: "#fff",
		height: "2rem",
		borderRadius: "0.5rem",
		border: "1px solid #32506D",
		color: "#32506D",
		fontWeight: 800,
		textTransform: "capitalize",
		"&:hover": {
			background: "#c2d6d6",
		},
		"& .MuiButton-label": {
			lineHeight: "normal",
		},
	},
	followButton: {
		textTransform: "capitalize",
		fontSize: "1rem",
		fontWeight: "bold",
		padding: "0 1em",
		"&:hover": {
			background: "none",
			textDecoration: "underline",
		},
		"&:active": {
			background: "none",
			textDecoration: "underline",
		},
		"@media screen and (max-width: 959px)": {
			padding: "0 1em",
			fontSize: "1em",
			textAlign: "right",
		},
		"@media screen and (max-width: 760px)": {
			textAlign: "left",
		},
	},
	link: {
		fontSize: "1.2em",
		fontWeight: "bold",
		marginBottom: "0.6em",
		textDecoration: "none",
		color: "#32506D",
		"&:hover": {
			textDecoration: "underline",
		},
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const GET_USER = gql`
	query {
		user {
			id
			firstName
			lastName
			email
			phone
			imgUrl
			birthdate
			headline
			bio
			country
			state
			website
			sex
			createdAt
			Tweets {
				id
				content
				imgUrl
				Comments {
					id
					comment
				}
				Likes {
					id
					UserId
					value
				}
			}
		}
	}
`;

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	imageUrl: "",
	headline: "",
	bio: "",
	country: "",
	state: "",
	sex: "",
	website: "",
};

const initialMessages = {
	firstName: "",
	lastName: "",
	email: "",
	success: "",
	failure: "",
};

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: "-9.5rem",
		top: "10rem",
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
		borderRadius: "50%",
		background: "green",
		height: "1rem",
		width: "1rem",
	},
}))(Badge);

const Profile = () => {
	const classes = useStyles();
	const router = useRouter();
	const [value, setValue] = useState(0);
	const [edit, setEdit] = useState(false);
	const [state, setState] = useState(initialState);
	const [messages, setMessages] = useState(initialMessages);
	const [birthdate, setBirthdate] = React.useState(null);
	const [update, setUpdate] = useState(false);

	const { loading, error, data } = useQuery(GET_USER, {
		onCompleted: () => {
			setState({
				...state,
				firstName: data.user.firstName,
				lastName: data.user.lastName,
				email: data.user.email,
				phone: data.user.phone,
				imageUrl:
					data.user && data.user && data.user.imgUrl ? data.user.imgUrl : "",
				headline:
					data.user && data.user && data.user.headline
						? data.user.headline
						: "",
				bio: data.user && data.user && data.user.bio ? data.user.bio : "",
				country:
					data.user && data.user && data.user.country ? data.user.country : "",
				state: data.user && data.user && data.user.state ? data.user.state : "",
				sex: data.user && data.user && data.user.sex ? data.user.sex : "",
				website:
					data.user && data.user && data.user.website ? data.user.website : "",
			});
			setBirthdate(
				parseInt(new Date(data.user.birthdate).toLocaleDateString())
			);
			localStorage.setItem("user", JSON.stringify(data.user));
		},
	});

	useEffect(() => {
		const authData = JSON.parse(localStorage.getItem("authData"));
		if (!authData || authData.token === null) {
			router.push("/login");
		}
	});
	const imageReg = /\.(gif|jpe?g|tiff|png|webp|bmp)$/i;

	const handleChange = (e) => {
		if (e.target.name === "imageUrl") {
			if (imageReg.test(e.target.files[0].name)) {
				const type = e.target.files[0].type.split("/")[1];

				Resizer.imageFileResizer(
					e.target.files[0],
					100,
					100,
					type,
					100,
					0,
					(uri) => {
						setState({ ...state, imageUrl: uri });
					},
					"base64"
				);
				e.target.value = "";
			} else {
				e.target.value = "";
				setState({ ...state, failure: "Please upload a valid photo" });
			}
		} else {
			setState({ ...state, [e.target.name]: e.target.value });
		}
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
	};

	const handleTabs = (event, newValue) => {
		setValue(newValue);
	};

	const openEdit = () => {
		setEdit(true);
	};

	const closeEdit = () => {
		setEdit(false);
	};

	const UPDATE_USER = gql`
		mutation updateProfile(
			$id: ID!
			$firstName: String
			$lastName: String
			$email: String
			$phone: String
			$imgUrl: String
			$birthdate: Date
			$headline: String
			$bio: String
			$country: String
			$state: String
			$website: String
			$sex: String
		) {
			updateProfile(
				id: $id
				firstName: $firstName
				lastName: $lastName
				email: $email
				phone: $phone
				imgUrl: $imgUrl
				birthdate: $birthdate
				headline: $headline
				bio: $bio
				country: $country
				state: $state
				website: $website
				sex: $sex
			) {
				id
				firstName
				lastName
				email
				phone
				headline
				bio
				country
				state
				sex
				website
			}
		}
	`;
	const [updateProfile] = useMutation(UPDATE_USER, {
		ignoreResults: false,
		onError: (error) => {
			console.log("error", error);
			setMessages({
				failure: "Sorry your request cannot be processed at the moment",
			});
		},
		onCompleted: () => {
			setState(initialState);
			closeEdit();
		},
	});

	const handleSubmit = async () => {
		setUpdate(true);
		await updateProfile({
			variables: {
				id: data.user.id,
				firstName: state.firstName.trim() || data.user.firstName,
				lastName: state.lastName.trim() || data.user.firstName,
				email: state.email.trim() || data.user.email,
				phone: state.phone || data.user.phone,
				imgUrl: state.imageUrl || data.user.imgUrl,
				birthdate: birthdate || data.user.birthdate,
				headline: state.headline.trim() || data.user.birthdate,
				bio: state.bio.trim() || data.user.bio,
				country: state.country.trim() || data.user.country,
				state: state.state.trim() || data.user.state,
				website: state.website.trim() || data.user.website,
				sex: state.sex.trim() || data.user.sex,
			},
		});
		setUpdate(false);
	};
	const noErrors = () => {
		const valid =
			!messages.firstName &&
			!messages.lastName &&
			!messages.email &&
			!messages.phone &&
			state.firstName &&
			state.lastName;
		state.phone && state.email;

		return valid;
	};

	return (
		<div className={classes.root}>
			{edit ? (
				<EditProfile
					open={edit}
					handleClose={closeEdit}
					handleChange={handleChange}
					validateField={validateField}
					firstName={state.firstName}
					lastName={state.lastName}
					birthdate={birthdate}
					setBirthdate={setBirthdate}
					email={state.email}
					phone={state.phone}
					imageUrl={state.imageUrl}
					headline={state.headline}
					bio={state.bio}
					country={state.country}
					state={state.state}
					sex={state.sex}
					website={state.website}
					data={data}
					handleSubmit={handleSubmit}
					update={update}
					noErrors={noErrors}
				/>
			) : (
				""
			)}
			{!loading ? (
				<Box style={{ width: "100%" }}>
					<Box
						style={
							data && data.user
								? {
										backgroundImage: "url(" + data.user.imgUrl + ")",
										backgroundRepeat: "round",
										backgroundSize: "cover",
										backgroundPosition: "center",
										marginBottom: "2rem",
										height: "8rem",
								  }
								: {
										marginBottom: "2rem",
										background: "#c2d6d6",
										height: "8rem",
								  }
						}>
						<StyledBadge
							style={{ color: "red" }}
							overlap="circle"
							badgeContent=" "
							variant="dot">
							{
								<Avatar
									className={classes.imgArea}
									src={data ? data.user.imgUrl : ""}
								/>
							}
						</StyledBadge>
					</Box>
					<Box style={{ background: "#fff", paddingBottom: "2rem" }}>
						<Box className={classes.infobox}>
							<div style={{ width: "70%" }}>
								<Typography style={{ fontSize: "2em" }} variant="h4">{`${
									data ? data.user.firstName : ""
								} ${data ? data.user.lastName : ""}`}</Typography>
								<Typography style={{ marginBottom: "0.6rem" }} variant="body1">
									@{`${data ? data.user.firstName.toLowerCase() : ""}`}_
									{`${data ? data.user.lastName.toLowerCase() : ""}`}
								</Typography>
								<Typography style={{ fontSize: "1.5em", fontWeight: "bold" }}>
									{`${
										data && data.user.headline ? `${data.user.headline}` : ""
									}`}
								</Typography>
								{data && data.user.website ? (
									<Typography
										style={{
											display: "flex",
											alignItems: "center",
										}}>
										<Link
											className={classes.link}
											href={data.user.website}
											target="_blank">{` ${data.user.website}`}</Link>
									</Typography>
								) : (
									""
								)}
								{data && data.user.createdAt ? (
									<Typography
										style={{
											display: "flex",
											alignItems: "center",
											fontSize: "1.2em",
											marginBottom: "0.6em",
											fontWeight: 600,
										}}>
										<DateRangeIcon color="primary" /> Joined on{" "}
										{formatDate(data.user.createdAt)}
									</Typography>
								) : (
									""
								)}
								{data && data.user.state && data.user.country ? (
									<Typography
										style={{
											display: "flex",
											alignItems: "center",
											fontWeight: "bold",
											fontSize: "1.2em",
										}}>
										<LocationOnIcon color="primary" />{" "}
										{` ${
											data && data.user.state
												? `${data.user.state}, ${
														data.user.country ? data.user.country : ""
												  }`
												: ""
										}`}
									</Typography>
								) : (
									""
								)}
								<div>
									{data.user.followers ? (
										<Button className={classes.followButton}>
											{`${data.user.followers} followers`}
										</Button>
									) : (
										""
									)}
									{data.user.following ? (
										<Button className={classes.followButton}>
											{`${data.user.following} following`}
										</Button>
									) : (
										""
									)}
								</div>
							</div>
							<Button onClick={openEdit} className={classes.fab}>
								Edit Profile
							</Button>
						</Box>
					</Box>
					{data && data.user.bio ? (
						<Box
							style={{
								marginBottom: "1rem",
								marginLeft: "auto",
								marginRight: "auto",
								marginTop: "1rem",
								background: "white",
								borderRadius: "1rem",
								padding: "1.5rem",
							}}>
							<Typography variant="h4">About</Typography>
							<Typography
								style={{
									fontSize: "1.2em",
									fontWeight: "bold",
									fontStyle: "italic",
								}}>
								{`${data.user.bio}`}
							</Typography>
						</Box>
					) : (
						""
					)}
					<Box>
						<AppBar
							elevation={0}
							style={{ background: "#fff" }}
							position="static">
							<Tabs
								indicatorColor="primary"
								variant="fullWidth"
								value={value}
								onChange={handleTabs}
								aria-label="simple tabs example">
								<Tab
									style={{
										color: "black",
										fontSize: "17px",
										fontWeight: "bold",
									}}
									label="Posts"
									{...a11yProps(0)}
								/>
								<Tab
									style={{
										color: "black",
										fontSize: "17px",
										fontWeight: "bold",
									}}
									label="Posts & Comments"
									{...a11yProps(1)}
								/>
								<Tab
									style={{
										color: "black",
										fontSize: "17px",
										fontWeight: "bold",
									}}
									label="Likes"
									{...a11yProps(2)}
								/>
							</Tabs>
						</AppBar>
						<TabPanel value={value} index={0}>
							Posts
						</TabPanel>
						<TabPanel value={value} index={1}>
							Posts and Comments
						</TabPanel>
						<TabPanel value={value} index={2}>
							Likes
						</TabPanel>
					</Box>
				</Box>
			) : (
				<div
					style={{
						marginTop: "2rem",
						marginRight: "1rem",
						marginLeft: "1rem",
					}}>
					<Skeleton
						animation="wave"
						style={{ background: "white" }}
						variant="text"
					/>
					<Skeleton
						style={{ background: "white" }}
						variant="circle"
						animation="pulse"
						width={100}
						height={100}
					/>
					<Skeleton
						style={{ background: "white" }}
						variant="rect"
						animation="wave"
						width={`${100}%`}
						height={118}
					/>
					<Skeleton
						style={{ background: "white", marginTop: "2rem" }}
						variant="rect"
						animation="wave"
						width={`${100}%`}
						height={30}
					/>
					<div style={{ display: "flex" }}>
						<Skeleton
							style={{ background: "white", marginTop: "2rem" }}
							variant="rect"
							animation="wave"
							width={`${30}%`}
							height={50}
						/>
						<Skeleton
							style={{ background: "white", marginTop: "2rem" }}
							variant="rect"
							animation="wave"
							width={`${30}%`}
							height={50}
						/>
						<Skeleton
							style={{ background: "white", marginTop: "2rem" }}
							variant="rect"
							animation="wave"
							width={`${30}%`}
							height={50}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
