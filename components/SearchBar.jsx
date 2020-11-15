import React from "react";
import {
	Paper,
	InputBase,
	InputAdornment,
	Typography,
	Snackbar,
	Divider,
	Box,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { formatDate } from "../libs/dates";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: "0.5em",
	},
	textfield: {
		borderRadius: "3px",
		height: "3rem",
		width: "100%",
		border: "1px solid #32506D",
		paddingLeft: "5px",
		paddingRight: "0.5em",
	},
	newslink: {
		textDecoration: "none",
		fontWeight: "bold",
		"&:hover": {
			textDecoration: "underline",
		},
	},
}));

const SearchBar = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState("");
	const [results, setResults] = React.useState([]);
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(true);

	const search = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://bing-news-search1.p.rapidapi.com/news/search?q=${
					query ? query : "react.js"
				}&mkt=en-US&freshness=Day&textFormat=Raw&safeSearch=Strict`,
				{
					method: "GET",
					headers: {
						"x-bingapis-sdk": "true",
						"accept-language": "en",
						"x-rapidapi-key": process.env.RAPID_API_KEY,
						"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
					},
				}
			);

			if (response.status === 429) {
				setError("Too many requests. Try again in a minute time");
			}
			const data = await response.json();
			setResults(data.value);
			setQuery("");
			setLoading(false);
		} catch (e) {
			if (e) {
				setError("Sorry your request could not be processed at this time");
			}
		}
	};

	React.useEffect(() => {
		search();
	}, []);

	return (
		<div className={classes.root}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					search();
				}}>
				<div>
					<InputBase
						className={classes.textfield}
						id="input-with-icon-textfield"
						placeholder="Search for people, topics or keywords"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						style={{ borderRadius: "2rem" }}
						onClick={() => setOpen(!open)}
						startAdornment={
							<InputAdornment>
								<Search
									color="primary"
									style={{ height: "1.5em", width: "1.5em" }}
								/>
							</InputAdornment>
						}
					/>
				</div>
			</form>

			{!loading ? (
				results.length ? (
					<Paper
						style={{
							marginTop: "1.5em",
							borderTopLeftRadius: "2em",
							borderTopRightRadius: "2em",
						}}>
						<div
							style={{
								width: "100%",
								background: "#32506D",
								padding: "0.4em",
								borderTopLeftRadius: "2em",
								borderTopRightRadius: "2em",
							}}>
							<Typography
								style={{ color: "#fff", fontWeight: "bold", fontSize: "17px" }}>
								Keep abreast with opportunities and sensitive information
							</Typography>
						</div>
						<div
							style={{
								padding: "1em",
								background: "white-smoke",
							}}>
							{results.map((news, index) => {
								return (
									<Box
										boxShadow={3}
										style={{
											background: "#fff",
											marginTop: "1.5em",
											padding: "1.5em",
											borderRadius: "1em",
										}}
										key={index}>
										<Box style={{ display: "flex" }}>
											<div
												style={{
													height: "4rem",
													width: "4rem",
													color: "#fff",
													padding: "1em",
													fontSize: "17px",
													borderRadius: "2rem",
													background: "#32506D",
													backgroundRepeat: "no-repeat",
													marginRight: "1em",
												}}>
												{news.provider[0].name.slice(0, 3)}
											</div>
											<div style={{ display: "flex", flexDirection: "column" }}>
												<Typography>{news.provider[0].name}</Typography>
												<Typography>
													{formatDate(news.datePublished)}
												</Typography>
											</div>
										</Box>
										<Box>
											<Box style={{ display: "flex", flexDirection: "column" }}>
												<Typography
													style={{ fontWeight: "bold" }}
													variant="body1">
													{news.name}
												</Typography>
												<Typography variant="body1">
													{news.description.slice(0, 60)}...
													<a
														className={classes.newslink}
														target="_blank"
														href={news.url}>
														Read more
													</a>
												</Typography>
											</Box>
											{news.image ? (
												<Box style={{ height: "6rem" }}>
													<img
														style={{ width: "100%", height: "100%" }}
														src={news.image?.thumbnail.contentUrl}
														alt="news image"
													/>
												</Box>
											) : (
												""
											)}
										</Box>
									</Box>
								);
							})}
						</div>
					</Paper>
				) : (
					<Typography>No result found</Typography>
				)
			) : (
				[1, 2, 3, 4].map((item, index) => (
					<div style={{ paddingLeft: "2em", paddingRight: "2em" }} key={index}>
						<Skeleton
							style={{
								background: props.comp !== "explore" ? "#c2d6d6" : "#fff",
							}}
							variant="text"
						/>
						<Skeleton
							style={{
								background: props.comp !== "explore" ? "#c2d6d6" : "#fff",
							}}
							variant="circle"
							width={40}
							height={40}
						/>
						<Skeleton
							style={{
								background: props.comp !== "explore" ? "#c2d6d6" : "#fff",
							}}
							variant="rect"
							width={`${50}%`}
							height={118}
						/>
					</div>
				))
			)}
		</div>
	);
};

export default SearchBar;
