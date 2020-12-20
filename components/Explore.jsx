import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, AppBar, Tabs, Tab, Hidden } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../libs/dates";
import SearchComponent from "./SearchBar";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		paddingBottom: "2em",
	},
	newsbox: {
		display: "flex",
		background: "#fff",
		marginBottom: "2em",
		borderRadius: "2em",
		padding: "1.5em",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	imagebox: {
		marginRight: "1em",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	newsImg: {
		height: "8rem",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	newslink: {
		textDecoration: "none",
		fontWeight: "bold",
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
					<Box>{children}</Box>
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

const Explore = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [list, setList] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, "$& ").trim();

	const handleTabs = (event, newValue) => {
		setValue(newValue);
	};

	const getNews = async () => {
		setLoading(true);
		const response = await fetch(
			"https://bing-news-search1.p.rapidapi.com/news?mkt=en-US&safeSearch=Strict&category=ScienceAndTechnology&headlineCount=40&textFormat=Raw",
			{
				method: "GET",
				headers: {
					"accept-language": "en",
					"x-bingapis-sdk": "true",
					"x-rapidapi-key": process.env.RAPID_API_KEY,
					"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
				},
			}
		);

		const data = await response.json();
		setList(data.value);
		setLoading(false);
	};

	React.useEffect(() => {
		getNews();
	}, []);

	return (
		<div className={classes.root}>
			<Box>
				<AppBar
					elevation={0}
					style={{ background: "#fff", width: "100%" }}
					position="static">
					<Tabs
						indicatorColor="primary"
						variant="fullWidth"
						value={value}
						onChange={handleTabs}
						aria-label="simple tabs example">
						<Tab
							style={{ color: "black", fontSize: "17px", fontWeight: "bold" }}
							label="Latest News"
							{...a11yProps(0)}
						/>
						{/* <Hidden mdUp> */}
						<Tab
							style={{ color: "black", fontSize: "17px", fontWeight: "bold" }}
							label="Search the Globe"
							{...a11yProps(1)}
						/>
						{/* </Hidden> */}
						<Tab
							style={{ color: "black", fontSize: "17px", fontWeight: "bold" }}
							label="People"
							{...a11yProps(2)}
						/>
					</Tabs>
				</AppBar>
				{!loading ? (
					<TabPanel value={value} index={0}>
						{list.length
							? list.map((news, index) => {
									return (
										<Box className={classes.newsbox} key={index}>
											{news.image && (
												<Box className={classes.imagebox}>
													<img
														className={classes.newsImg}
														src={news.image.thumbnail.contentUrl}
														alt="image"
													/>
												</Box>
											)}
											<Box
												style={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "space-between",
												}}>
												<Typography
													color="primary"
													style={{ fontWeight: "bold" }}>
													{news.name}
												</Typography>
												<Typography>
													{news.description}{" "}
													<a
														className={classes.newslink}
														target="_blank"
														href={news.url}>
														Read more...
													</a>
												</Typography>
												<Box
													style={{
														display: "flex",
														justifyContent: "space-between",
														paddingRight: "2em",
														alignItems: "center",
														fontWeight: "bold",
													}}>
													<Typography
														style={{ fontWeight: "bold" }}
														component="span">
														{formatDate(news.datePublished)}
													</Typography>
													<Typography
														style={{ fontWeight: "bold" }}
														component="span">
														{(news.provider[0].image ||
															news.provider[0].image.thumbnail) && (
															<img
																style={{ marginRight: "0.5em" }}
																src={
																	news.provider[0].image.thumbnail.contentUrl +
																	"&w=25&h=25"
																}
															/>
														)}
														{news.provider[0].name}
													</Typography>
													{news.category && (
														<Typography
															style={{ fontWeight: "bold" }}
															component="span">
															{separateWords(news.category)}
														</Typography>
													)}
												</Box>
											</Box>
										</Box>
									);
							  })
							: ""}
					</TabPanel>
				) : (
					[1, 2, 3, 4].map((item, index) => (
						<div
							style={{ paddingLeft: "2em", paddingRight: "2em" }}
							key={index}>
							<Skeleton style={{ background: "#fff" }} variant="text" />
							<Skeleton
								style={{ background: "#fff" }}
								variant="circle"
								width={40}
								height={40}
							/>
							<Skeleton
								style={{ background: "#fff" }}
								variant="rect"
								width={`${80}%`}
								height={118}
							/>
						</div>
					))
				)}
				{/* <Hidden mdUp> */}
				<TabPanel value={value} index={1}>
					<SearchComponent comp={"explore"} />
				</TabPanel>
				{/* </Hidden> */}
				<TabPanel value={value} index={2}>
					People
				</TabPanel>
			</Box>
		</div>
	);
};

export default Explore;
