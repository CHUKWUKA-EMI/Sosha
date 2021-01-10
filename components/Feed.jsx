import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
	Box,
	Typography,
	TextareaAutosize,
	Button,
	Divider,
	IconButton,
	Fab,
	Avatar,
	Badge,
	Snackbar,
} from "@material-ui/core";
import {
	EmojiEmotionsOutlined,
	PhotoCamera,
	AddAPhoto,
	ImageOutlined,
	MoreHoriz,
	ThumbUpOutlined,
	ThumbUp,
	Favorite,
	FavoriteBorder,
	ChatBubbleOutline,
	Share,
} from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Resizer from "react-image-file-resizer";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Webcam from "react-webcam";
import Popper from "../libs/Popper";
import { useRouter } from "next/router";
import { GET_TWEETS } from "../Apollo/queries";
import { formatDate } from "../libs/dates";
import Comment from "./Comments";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		marginBottom: "2em",
	},
	feedbox: {
		padding: "1em",
		background: "#fff",
		marginTop: "1em",
		borderRadius: "1.5em",
		width: "95%",
		marginRight: "auto",
		marginLeft: "auto",
		marginBottom: "5em",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			borderRadius: 0,
			marginTop: 0,
			marginBottom: "2em",
		},
	},
	textarea: {
		outlineStyle: "none",
		border: "none",
		resize: "none",
		width: "100%",
		paddingTop: "1em",
		fontSize: "20px",
		fontWeight: "bold",
	},
	imgArea: {
		height: "5rem",
		width: "5rem",
		marginRight: "1rem",
		borderRadius: "3rem",
		[theme.breakpoints.down("xs")]: {
			height: "4rem",
			width: "4rem",
			borderRadius: "3rem",
		},
	},
	feedButton: {
		height: "2.5rem",
		width: "5rem",
		borderRadius: "1rem",
		background: "#32506D",
		color: "#fff",
		fontSize: "17px",
		fontWeight: "bold",
		"&:hover": {
			background: "#32506D",
			color: "#fff",
		},
	},
	tweetContainer: {
		padding: "1em",
		background: "#fff",
		marginTop: "1em",
		borderRadius: "1.5em",
		width: "95%",
		marginRight: "auto",
		marginLeft: "auto",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			borderRadius: 0,
			marginTop: "0.3em",
		},
	},
}));

const StyledBadge = withStyles((theme) => ({
	badge: {
		top: "4rem",
		left: "4.8em",
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
		borderRadius: "50%",
		background: "green",
		height: "1rem",
		width: "1rem",
	},
}))(Badge);

const initialState = {
	content: "",
	imgUrl: "",
};

const videoConstraints = {
	width: 500,
	height: 200,
	facingMode: "user",
};
const Feed = () => {
	const classes = useStyles();
	const router = useRouter();
	const [user, setUser] = React.useState({});
	const [allTweets, setAllTweets] = React.useState([]);
	const [emojiPicker, setEmojiPicker] = React.useState(false);
	const [post, setPost] = React.useState(initialState);
	const [messages, setMessages] = React.useState({ success: "", failure: "" });
	const [image, setImage] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [showCamera, setShowCamera] = React.useState(false);
	const [posting, setPosting] = React.useState(false);
	const [openSnack, setOpenSnack] = React.useState(false);
	const webcamRef = React.useRef(null);

	const { loading, error, data, refetch } = useQuery(GET_TWEETS, {
		onError: () => {
			console.log("loading error", error);
		},
		onCompleted: () => {
			console.log("all tweets", data.tweets);
			setAllTweets(data.tweets);
		},
		errorPolicy: "all",
	});

	//  const handleClick = () => {
	// 		setOpen(true);
	// 	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnack(false);
	};

	React.useEffect(() => {
		refetch();
		const localUser = JSON.parse(localStorage.getItem("user"));
		const authData = JSON.parse(localStorage.getItem("authData"));
		if (!authData) {
			router.push("/login");
		}
		setUser(localUser);
	}, []);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImage(imageSrc);
	}, [webcamRef]);

	const onEmojiClick = (emoji) => {
		setPost({
			content: post.content ? post.content + emoji : emoji,
		});
	};

	const imageReg = /\.(gif|jpe?g|tiff|png|webp|bmp)$/i;

	const handleImageUpload = (e) => {
		if (e.target.name === "imgUrl") {
			if (imageReg.test(e.target.files[0].name)) {
				const type = e.target.files[0].type.split("/")[1];

				Resizer.imageFileResizer(
					e.target.files[0],
					300,
					400,
					type,
					300,
					0,
					(uri) => {
						console.log("imgurl", uri);
						setPost({ ...post, imgUrl: uri });
					},
					"base64"
				);
				e.target.value = "";
			} else {
				e.target.value = "";
				setPost({ ...post, failure: "Please upload a valid photo" });
			}
		} else {
			setPost({ ...post, [e.target.name]: e.target.value });
		}
	};

	const CREATE_TWEET = gql`
		mutation createTweet($content: String, $imgUrl: String) {
			createTweet(content: $content, imgUrl: $imgUrl) {
				id
				content
				imgUrl
			}
		}
	`;

	const [createTweet] = useMutation(CREATE_TWEET, {
		ignoreResults: false,
		onError: (error) => {
			setMessages({
				failure: "Sorry, something went wrong ",
			});
		},
		onCompleted: () => {
			setMessages({ success: "Post successfully created" });
			setPost(initialState);
		},
		refetchQueries: [
			{
				query: GET_TWEETS,
			},
		],
	});

	const handleSubmit = async () => {
		if (post.content.trim().length == 0 && post.imgUrl == "") {
			setMessages({ failure: "Please create a content" });
			return;
		}
		setPosting(true);
		await createTweet({
			variables: {
				content: post.content,
				imgUrl: post.imgUrl || image,
			},
		});
		refetch();
		setPosting(false);
	};

	return (
		<div className={classes.root}>
			{messages.failure ? (
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(messages.failure)}
					autoHideDuration={6000}
					message={messages.failure}
				/>
			) : (
				""
			)}
			{messages.success ? (
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={Boolean(messages.success)}
					autoHideDuration={6000}
					message={messages.success}
				/>
			) : (
				""
			)}

			<Box className={classes.feedbox}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}>
					<Box style={{ display: "flex", marginBottom: "1em", width: "100%" }}>
						<StyledBadge
							style={{ color: "green" }}
							overlap="circle"
							badgeContent=" "
							variant="dot">
							{
								<Avatar
									src={user ? user.imgUrl : ""}
									className={classes.imgArea}
								/>
							}
						</StyledBadge>
						<div style={{ width: "80%" }}>
							<TextareaAutosize
								value={post.content}
								onChange={(e) => setPost({ content: e.target.value })}
								autoFocus
								disabled={posting}
								name="content"
								placeholder="What do you want share?"
								className={classes.textarea}
								rowsMin={1}
							/>
							{image || post.imgUrl ? (
								<img
									src={image ? image : post.imgUrl}
									alt="screen shot"
									style={{ width: "100%" }}
								/>
							) : (
								""
							)}
						</div>
					</Box>
					<Divider />
					<Box
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							paddingTop: "1rem",
							paddingLeft: "3rem",
						}}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<div style={{ marginLeft: "1rem" }}>
								<Popper anchorEl={anchorEl} open={open}>
									<input
										accept="image/*"
										style={{ display: "none" }}
										onChange={handleImageUpload}
										name="imgUrl"
										multiple
										id="icon-button-file"
										type="file"
									/>
									<label
										style={{ paddingRight: "0.5rem" }}
										htmlFor="icon-button-file">
										<Typography style={{ fontWeight: 600 }}>
											Upload photo
										</Typography>
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="span">
											<ImageOutlined
												style={{ height: "2rem", width: "2rem" }}
											/>
										</IconButton>
									</label>
									<div
										style={{
											borderLeft: "1px solid black",
											paddingLeft: "1rem",
										}}>
										<label>
											<Typography style={{ fontWeight: 600 }}>
												{!showCamera ? "Use Camera" : "Close Camera"}
											</Typography>
											<IconButton
												onClick={() => setShowCamera(!showCamera)}
												color="primary"
												aria-label="upload picture"
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
								</Popper>
								<IconButton
									onClick={handleClick}
									color="primary"
									aria-label="upload picture"
									component="span">
									<AddAPhoto
										style={{
											height: "2rem",
											width: "2rem",
										}}
									/>
								</IconButton>
							</div>
							<IconButton onClick={() => setEmojiPicker(!emojiPicker)}>
								<EmojiEmotionsOutlined
									style={{ height: "2rem", width: "2rem", color: "#32506D" }}
								/>
							</IconButton>
						</div>
						<div>
							<Button
								disabled={posting}
								style={{ background: posting ? "white" : "" }}
								type="submit"
								className={classes.feedButton}>
								{posting ? "POSTING" : "POST"}
							</Button>
						</div>
					</Box>
				</form>
			</Box>
			{emojiPicker ? (
				<div style={{ position: "absolute", zIndex: 1 }}>
					<Picker
						style={{ position: "absolute", zIndex: 1 }}
						title="Pick your emoji…"
						emoji="point_up"
						emojiTooltip={true}
						onSelect={(emoji) => onEmojiClick(emoji.native)}
					/>
				</div>
			) : (
				""
			)}
			{showCamera ? (
				<>
					<Webcam
						audio={false}
						height={`${30}%`}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={`${100}%`}
						videoConstraints={videoConstraints}
					/>
					<Fab
						type="button"
						variant="extended"
						color="primary"
						size="medium"
						style={{ marginLeft: "4rem" }}
						onClick={capture}>
						Capture Photo
					</Fab>
				</>
			) : (
				""
			)}
			{!loading ? (
				allTweets ? (
					allTweets.map((tweet) => (
						<Box key={tweet.id} className={classes.tweetContainer}>
							<Box
								style={{
									display: "flex",
									marginBottom: "1em",
									width: "100%",
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<Box style={{ display: "flex" }}>
									<StyledBadge
										style={{ color: "green" }}
										overlap="circle"
										badgeContent=" "
										variant="dot">
										{
											<Avatar
												src={tweet.User.imgUrl}
												className={classes.imgArea}
											/>
										}
									</StyledBadge>
									<Box
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "flex-start",
											paddingLeft: "1em",
										}}>
										<Typography
											style={{
												color: "#32506D",
												fontWeight: "bold",
												fontSize: "18px",
											}}>{`${tweet.User.firstName} ${tweet.User.lastName}`}</Typography>
										<Typography>{formatDate(tweet.createdAt)}</Typography>
									</Box>
								</Box>
								<IconButton aria-label="settings">
									<MoreHoriz />
								</IconButton>
							</Box>
							<Box
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
								}}>
								{tweet.content ? (
									<Box>
										<Typography>{tweet.content}</Typography>
									</Box>
								) : (
									""
								)}
								{tweet.imgUrl ? (
									<Box>
										<img width="100%" src={tweet.imgUrl} />
									</Box>
								) : (
									""
								)}
								<Box
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}>
									<span>{tweet.Likes.length ? tweet.Likes.length : ""}</span>
									<span>
										{tweet.Comments.length
											? tweet.Comments.length + " comments"
											: ""}
									</span>
								</Box>
							</Box>
							<Divider variant="fullWidth" />
							<Box
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-around",
								}}>
								<IconButton>
									<ThumbUpOutlined />
								</IconButton>
								<IconButton>
									<ChatBubbleOutline />
								</IconButton>
								<IconButton>
									<Share />
								</IconButton>
							</Box>
							<Divider variant="fullWidth" />
							{tweet.Comments || tweet.Comments.length
								? tweet.Comments.map((comment) => (
										<Box
											key={comment.id}
											style={{ width: "100%", paddingLeft: "1em" }}>
											<Comment comment={comment} />
										</Box>
								  ))
								: ""}
						</Box>
					))
				) : (
					""
				)
			) : (
				<div>
					<Skeleton style={{ background: "white" }} variant="text" />
					<Skeleton
						style={{ background: "white" }}
						variant="circle"
						width={80}
						height={80}
					/>
					<Skeleton
						style={{ background: "white" }}
						variant="rect"
						width={`${100}%`}
						height={118}
					/>
				</div>
			)}
		</div>
	);
};

export default Feed;
