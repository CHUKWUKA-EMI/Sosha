import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Typography,
	Link as MuiLink,
	Box,
	IconButton,
	Button,
} from "@material-ui/core";
import { Facebook, Twitter, LinkedIn, Instagram } from "@material-ui/icons";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		background: "#32506D",
		paddingTop: "2rem",
		paddingBottom: "2rem",
		overflowY: "hidden",
		overflowX: "hidden",
		color: "#fff",
		"@media screen and (max-width: 959px)": {
			paddingLeft: "25%",
		},
		"@media screen and (max-width: 760px)": {
			paddingLeft: "15%",
			paddingRight: "10%",
		},
	},
	navbutton: {
		textTransform: "capitalize",
		fontSize: "1.10em",
		color: "#fff",
		width: "35%",
		fontWeight: 600,
		// padding: "0 1em",
		"&:hover": {
			background: "none",
			textDecoration: "underline",
		},
		"&:active": {
			background: "none",
			textDecoration: "underline",
		},
		"@media screen and (max-width: 959px)": {
			// padding: "0 1em",
			fontSize: "1em",
			textAlign: "right",
		},
		"@media screen and (max-width: 760px)": {
			textAlign: "left",
		},
	},
	iconButton: {
		marginRight: "0.5em",
	},
	grid: {
		"@media screen and (max-width: 959px)": {
			alignItems: "center",
		},
	},
	iconBox: {
		"@media screen and (max-width: 400px)": {
			marginRight: "10%",
		},
	},
}));
const Footer = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid justify="center" container>
				<Grid item xs={6} sm={6} md={2}>
					<Box>
						<img src="/myLogo.png" alt="app logo" />
					</Box>
					<Box style={{ marginBottom: "1.5rem" }}>
						<Typography style={{ fontWeight: "bold" }}>
							Daniel Makinde Street,
							<br />
							Ketu, Lagos state,
							<br />
							Nigeria
						</Typography>
					</Box>
				</Grid>
				<Grid className={classes.grid} item xs={6} sm={6} md={2}>
					<Typography style={{ color: "#c2d6d6" }} variant="h6">
						General
					</Typography>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							color: "#fff",
							marginBottom: "1.5rem",
						}}>
						<Button size="small" className={classes.navbutton} href="/signup">
							Sign Up
						</Button>
						<Button size="small" className={classes.navbutton} href="/about">
							About
						</Button>
						<Button size="small" className={classes.navbutton} href="/articles">
							Blog
						</Button>
						<Button size="small" className={classes.navbutton} href="/careers">
							Careers
						</Button>
					</div>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<Typography style={{ color: "#c2d6d6" }} variant="h6">
						Browse
					</Typography>
					<Box
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							color: "#fff",
							marginBottom: "1.5rem",
						}}>
						<Button className={classes.navbutton} href="/">
							Learning
						</Button>
						<Button className={classes.navbutton} href="/">
							Jobs
						</Button>
						<Button className={classes.navbutton} href="/">
							Articles
						</Button>
						<Button className={classes.navbutton} href="/">
							News
						</Button>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<Typography style={{ color: "#c2d6d6" }} variant="h6">
						Contact us
					</Typography>
					<Box
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							color: "#fff",
							marginBottom: "1.5rem",
						}}>
						<Button className={classes.navbutton} href="/contact-us">
							Contact
						</Button>
					</Box>
				</Grid>
				<Grid style={{ maxWidth: "100%" }} item xs={6} sm={6} md={2}>
					<Typography style={{ color: "#c2d6d6" }} variant="h6">
						Connect with us
					</Typography>
					<Box className={classes.iconBox} style={{ display: "flex" }}>
						<IconButton className={classes.iconButton}>
							<Facebook style={{ color: "blue", fill: "white" }} />
						</IconButton>
						<IconButton>
							<Twitter style={{ fill: "rgba(29,161,242,1.00)" }} />
						</IconButton>
						<IconButton>
							<LinkedIn style={{ fill: "#fff" }} />
						</IconButton>
						<IconButton>
							<Instagram style={{ fill: "#fff" }} />
						</IconButton>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default Footer;
