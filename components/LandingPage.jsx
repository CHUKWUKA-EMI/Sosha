import React from "react";
import { Container, Grid, Typography, Box, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflowX: "hidden",
		paddingTop: "5rem",
		paddingBottom: "4rem",
		justifyContent: "space-evenly",
		paddingLeft: "9em",
		paddingRight: "9em",
		"@media screen and (max-width: 960px)": {
			paddingLeft: "4em",
			paddingRight: "4em",
		},
	},
	intro: {
		width: "100%",
	},
	subtitle: {
		padding: "0.5em 0",
		fontSize: "1.5rem",
		fontWeight: "bold",
	},
	title: {
		"@media screen and (max-width: 960px)": {
			fontSize: "2.6rem !important",
		},
	},
	option: {
		fontSize: 15,
		"& > span": {
			marginRight: 10,
			fontSize: 18,
		},
	},
	textfield: {
		"& .MuiInputLabel-outlined": {
			fontWeight: "bold",
			overflowWrap: "break-word",
			width: "80%",
		},
	},
}));

const LandingPage = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid className={classes.intro} justify="center" container>
				<Grid
					style={{ display: "flex", flexWrap: "wrap", marginBottom: "2rem" }}
					item
					xs={10}
					sm={6}>
					<Box pd={2}>
						<Typography
							className={classes.title}
							style={{ marginRight: "5%" }}
							variant="h2"
							color="primary">
							Welcome to your professional community
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box style={{ display: "flex" }}>
						<img
							style={{
								width: "80%",
								alignSelf: "flex-end",
							}}
							src="/career.svg"
							alt="career"
						/>
					</Box>
				</Grid>
				<Grid
					style={{
						marginTop: "4rem",
						marginBottom: "2rem",
					}}
					spacing={5}
					container>
					<Grid item xs={12} sm={6}>
						<Box style={{ display: "flex" }}>
							<img
								style={{ width: "80%", alignSelf: "flex-end" }}
								src="/connect.svg"
								alt="connect"
							/>
						</Box>
						<Box py={2}>
							<Typography className={classes.subtitle} color="primary">
								Connect with people that can help you
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box style={{ display: "flex" }}>
							<img
								style={{ width: "80%", alignSelf: "flex-end" }}
								src="/public_discussion.svg"
								alt="public discussions"
							/>
						</Box>
						<Box py={2}>
							<Typography className={classes.subtitle} color="primary">
								Hear what people are talking about
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Grid
					style={{
						marginTop: "2rem",
						marginBottom: "2rem",
					}}
					spacing={5}
					container>
					<Grid item xs={12} sm={6}>
						<Box style={{ display: "flex" }}>
							<img
								style={{ width: "80%", alignSelf: "flex-end" }}
								src="/personal_opinion.svg"
								alt="opinion"
							/>
						</Box>
						<Box py={2}>
							<Typography className={classes.subtitle} color="primary">
								Express yourself and share your thoughts
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box style={{ display: "flex" }}>
							<img
								style={{ width: "80%", alignSelf: "flex-end" }}
								src="/learn_skill.svg"
								alt="learn"
							/>
						</Box>
						<Box py={2}>
							<Typography className={classes.subtitle} color="primary">
								Learn the skills that can help you now, and upgrade your
								knowledge base by subscribing to learning channels
							</Typography>
							<Autocomplete
								id="topic-select-demo"
								options={topics}
								classes={{
									option: classes.option,
								}}
								autoHighlight
								getOptionLabel={(option) => option.name}
								renderOption={(option) => (
									<React.Fragment>{option.name}</React.Fragment>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Choose a topic to learn about"
										variant="outlined"
										className={classes.textfield}
										inputProps={{
											...params.inputProps,
											autoComplete: "new-password",
											// disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default LandingPage;

const topics = [
	{ id: 1, name: "Web Development" },
	{ id: 2, name: "Cloud Computing" },
	{ id: 3, name: "Training and Management" },
	{ id: 4, name: "Software Engineering" },
	{ id: 5, name: "Project Management" },
	{ id: 6, name: "Mobile Development" },
	{ id: 7, name: "Career Development" },
	{ id: 8, name: "Animation and Illustration" },
	{ id: 9, name: "Data Science" },
	{ id: 10, name: "IT Help Desk" },
	{ id: 11, name: "Database Management" },
	{ id: 12, name: "DevOps" },
	{ id: 13, name: "Graphic Design" },
	{ id: 14, name: "User Experience" },
	{ id: 15, name: "Accounting and Finance" },
	{ id: 16, name: "Network and System Administration" },
];
