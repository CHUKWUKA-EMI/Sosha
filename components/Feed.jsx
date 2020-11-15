import React from "react";
import {
	Box,
	Typography,
	TextareaAutosize,
	Button,
	Divider,
	IconButton,
	Fab,
} from "@material-ui/core";
import {
	EmojiEmotionsOutlined,
	PhotoCamera,
	AddAPhoto,
	ImageOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Webcam from "react-webcam";
import Popper from "../libs/Popper";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
	},
	feedbox: {
		padding: "1em",
		background: "#fff",
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
		background: "#32506D",
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
}));

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
	const [emojiPicker, setEmojiPicker] = React.useState(false);
	const [post, setPost] = React.useState(initialState);
	const [image, setImage] = React.useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [showCamera, setShowCamera] = React.useState(false);
	const webcamRef = React.useRef(null);

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
	return (
		<div className={classes.root}>
			<Box className={classes.feedbox}>
				<form>
					<Box style={{ display: "flex", marginBottom: "1em", width: "100%" }}>
						<div className={classes.imgArea}></div>
						<div style={{ width: "80%" }}>
							<TextareaAutosize
								value={post.content}
								onChange={(e) => setPost({ content: e.target.value })}
								autoFocus
								placeholder="What do you want share?"
								className={classes.textarea}
								rowsMin={1}
							/>
							{image ? (
								<img src={image} alt="screen shot" style={{ width: "100%" }} />
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
							<Button type="submit" className={classes.feedButton}>
								Post
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
		</div>
	);
};

export default Feed;
