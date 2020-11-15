import React from "react";
import PropTypes from "prop-types";
import {
	Box,
	Typography,
	Button,
	Fab,
	AppBar,
	Tabs,
	Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditProfile from "./EditProfile";

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
	},
	fab: {
		backgroundColor: "#fff",
		border: "1px solid #32506D",
		color: "#32506D",
		fontWeight: 600,
		textTransform: "capitalize",
		"&:hover": {
			background: "#c2d6d6",
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

const Profile = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [edit, setEdit] = React.useState(false);

	const handleTabs = (event, newValue) => {
		setValue(newValue);
	};

	const openEdit = () => {
		setEdit(true);
	};

	const closeEdit = () => {
		setEdit(false);
	};

	return (
		<div className={classes.root}>
			{edit ? <EditProfile open={edit} handleClose={closeEdit} /> : ""}
			<Box>
				<Box
					style={{
						marginBottom: "2rem",
						background: "#c2d6d6",
						height: "8rem",
					}}>
					<div className={classes.imgArea}></div>
				</Box>
				<Box style={{ background: "#fff", paddingBottom: "2rem" }}>
					<Box className={classes.infobox}>
						<div>
							<Typography variant="h6">firstName lastName</Typography>
							<Typography variant="body1">@username</Typography>
							<Typography variant="h6">Headline</Typography>
							<Typography>Lives in...</Typography>
							<div>
								<Button className={classes.followButton}>
									Number of Followers
								</Button>
								<Button className={classes.followButton}>
									Number of Following
								</Button>
							</div>
							<Typography>Number of connections</Typography>
						</div>
						<Fab
							onClick={openEdit}
							className={classes.fab}
							variant="extended"
							size="medium">
							Edit Profile
						</Fab>
					</Box>
				</Box>

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
								style={{ color: "black", fontSize: "17px", fontWeight: "bold" }}
								label="Posts"
								{...a11yProps(0)}
							/>
							<Tab
								style={{ color: "black", fontSize: "17px", fontWeight: "bold" }}
								label="Posts & Comments"
								{...a11yProps(1)}
							/>
							<Tab
								style={{ color: "black", fontSize: "17px", fontWeight: "bold" }}
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
		</div>
	);
};

export default Profile;
