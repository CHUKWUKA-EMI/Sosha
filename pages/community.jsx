import React from "react";
import {
	AppBar,
	Toolbar,
	Drawer,
	Divider,
	Typography,
	Box,
	IconButton,
	Hidden,
	useMediaQuery,
	Avatar,
	Paper,
	Button,
} from "@material-ui/core";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, MoreHoriz } from "@material-ui/icons";
import CommunityNav from "../components/CommunityNav";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/router";
import { client } from "../Apollo/client";

let drawerWidth = 25;
let searchWidth = 25;
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		background: "#fff",
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth + searchWidth}%)`,
			marginLeft: `${drawerWidth}%`,
			marginRight: `${searchWidth}%`,
		},
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}%)`,
			marginLeft: `${drawerWidth}%`,
			paddingRight: "2rem",
		},
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			paddingRight: "4rem",
		},
	},
	menuButton: {
		backgroundColor: "#32506D",
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		backgroundColor: "#fff",
		width: `${drawerWidth}%`,
		paddingLeft: "2%",
		paddingRight: "2%",
		[theme.breakpoints.only("md")]: {
			paddingLeft: "0.5%",
		},
		[theme.breakpoints.down("xs")]: {
			width: 250,
		},
	},
	content: {
		flexGrow: 1,
		background: "#c2d6d6",
		height: "100%",
		minHeight: "100vh",
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - ${drawerWidth + searchWidth}%)`,
			marginLeft: `${drawerWidth}%`,
			marginRight: `${searchWidth}%`,
		},
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}%)`,
			marginLeft: `${drawerWidth}%`,
		},
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			maxWidth: "100%",
		},
	},
	searchDiv: {
		width: `${searchWidth}%`,
		paddingLeft: "1%",
		paddingRight: "1%",
		background: "#fff",
	},
	avatarDiv: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "90%",
		marginRight: "5%",
		alignItems: "center",
		cursor: "pointer",
		[theme.breakpoints.down("sm")]: {
			marginLeft: "60%",
		},
	},
	avatar: {
		height: "2rem",
		width: "2rem",
	},
}));

function Community(props) {
	const classes = useStyles();
	const router = useRouter();
	const medium = useMediaQuery("@media screen and (min-width: 959px)");
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [openLogout, setOpen] = React.useState(false);
	const [user, setUser] = React.useState({});

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	React.useEffect(() => {
		const authData = JSON.parse(localStorage.getItem("authData"));
		setUser(client.cache.data.data[`User:${authData.userId}`]);
		if (!authData) {
			router.push("/login");
		}
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		router.push("/login");
		client.resetStore();
	};
	return (
		<div className={classes.root}>
			<AppBar elevation={1} position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						aria-label="open drawer"
						edge="start"
						className={classes.menuButton}
						onClick={handleDrawerToggle}>
						<Menu style={{ color: "#fff" }} />
					</IconButton>
					<div className={classes.avatarDiv}>
						<div
							style={{ display: "flex", flexDirection: "column" }}
							onClick={() => setOpen(!openLogout)}>
							<Avatar
								src={user ? user.imgUrl : ""}
								className={classes.avatar}
							/>
							<ArrowDropDownSharpIcon
								style={{ cursor: "pointer" }}
								color="primary"
							/>
						</div>

						{openLogout && (
							<Paper
								style={{
									height: "fit-content",
									width: "9rem",
									zIndex: 9,
									position: "absolute",
									top: 60,
								}}>
								<Button
									onClick={() => router.push("/profile")}
									style={{
										background: "white",
										color: "#32506D",
										fontSize: "15px",
										fontWeight: "bold",
										width: "100%",
										border: "2px solid #32506D",
									}}>
									View Profile
								</Button>
								<Divider />
								<Button
									onClick={handleLogout}
									style={{
										background: "white",
										color: "#32506D",
										fontSize: "15px",
										fontWeight: "bold",
										width: "100%",
										border: "2px solid #32506D",
									}}>
									Logout
								</Button>
							</Paper>
						)}
					</div>
				</Toolbar>
			</AppBar>

			<nav aria-label="community nav">
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor="left"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						<div
							style={{
								marginLeft: "3rem",
								marginTop: "1rem",
								marginBottom: "1rem",
							}}>
							<Avatar
								src={user ? user.imgUrl : ""}
								style={{ height: "6rem", width: "6rem" }}
							/>
						</div>
						<Divider />
						{<CommunityNav />}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open>
						<div style={{ marginTop: "2em", marginLeft: "2em" }}>
							<img src="/myLogo.png" alt="my logo" />
						</div>
						{<CommunityNav />}
						<Divider variant="fullWidth" />
						<Box
							style={{
								background: "#fff",
								borderRadius: "1.5rem",
								marginTop: "18px",
								height: "5rem",
								padding: "1em",
							}}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<div style={{ display: "flex" }}>
									<div
										style={
											user
												? {
														backgroundImage: "url(" + user.imgUrl + ")",
														backgroundRepeat: "no-repeat",
														backgroundSize: "cover",
														backgroundPosition: "center",
														borderRadius: "2rem",
														width: "3rem",
														height: "3rem",
												  }
												: {
														borderRadius: "2rem",
														background: "#32506D",
														width: "3rem",
														height: "3rem",
												  }
										}></div>
									<Hidden mdDown>
										<div style={{ paddingLeft: "1em" }}>
											{user ? (
												<Typography style={{ fontWeight: "bold" }}>
													{user.firstName}
												</Typography>
											) : (
												""
											)}
										</div>
									</Hidden>
								</div>
								<div>
									<IconButton>
										<MoreHoriz />
									</IconButton>
								</div>
							</div>
						</Box>
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
			<Hidden smDown implementation="css">
				<Drawer
					anchor="right"
					classes={{
						paper: classes.searchDiv,
					}}
					variant="permanent"
					open>
					<SearchBar />
				</Drawer>
			</Hidden>
			<style global jsx>
				{`
					body,
					a,
					label,
					span,
					p,
					h {
						font-family: "Source Sans Pro", sans-serif !important;
					}
				`}
			</style>
		</div>
	);
}

export default Community;
