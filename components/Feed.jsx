/* eslint-disable no-unused-vars */
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  Divider,
  IconButton,
  Avatar,
  Badge,
  Snackbar,
  Grid,
  Paper,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import {
  EmojiEmotionsOutlined,
  AddAPhoto,
  MoreHoriz,
  ThumbUp,
  ThumbUpOutlined,
  Close as CloseIcon,
  ChatBubbleOutline,
  Share,
  Favorite,
  ArrowForward,
} from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useRouter } from "next/router";
import {
  CREATE_TWEET,
  UPDATE_TWEET,
  DELETE_TWEET,
  GET_TWEETS,
  ADD_COMMENT,
  LIKE_POST,
} from "../Apollo/queries";
import { formatDate } from "../libs/dates";
import EditPost from "./EditPost";
import axios from "axios";
import Link from "next/link";
import ShareHeader from "./SocialShareHeader";
import ShareComponent from "./SocialShareComponent";

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
    marginBottom: "2em",
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

  commentAvatar: {
    height: "3rem",
    width: "3rem",
    marginRight: "1rem",
    borderRadius: "50%",
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
      width: "2rem",
      borderRadius: "50%",
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
  dialogbox: {
    "& .MuiDialog-paperWidthSm": {
      width: "60%",
    },
  },
  snackbarOnline: {
    "& .MuiSnackbarContent-message": {
      color: "green",
      fontSize: "1.5em",
    },
  },
  snackbarOffline: {
    "& .MuiSnackbarContent-message": {
      fontSize: "1.2em",
    },
  },
  commentBox: {
    outlineStyle: "none",
    border: "none",
    resize: "none",
    marginLeft: "0.5em",
    width: "100%",
    fontSize: "16px",
    fontWeight: 700,
    backgroundColor: "#e4e6eb",
    borderRadius: "2em",
    padding: "0.5em",
  },
  commentsView: {
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      color: "blue",
      textDecoration: "underline",
    },
  },
  tweetBodyLink: {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    "&:visited": {
      textDecoration: "none",
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

const Feed = () => {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = React.useState({});
  const [allTweets, setAllTweets] = React.useState([]);
  const [emojiPicker, setEmojiPicker] = React.useState(false);
  const [post, setPost] = React.useState({ content: "", imgUrl: "" });
  const [comment, setComment] = React.useState("");
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  const [imgPreview, setImgPreview] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [posting, setPosting] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openFeedForm, setOpenFeedForm] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [showOnline, setShowOnline] = React.useState(false);
  const [selectedTweet, setSelectedTweet] = React.useState({});
  const [selectedTweetId, setSelectedTweetId] = React.useState("");
  const [openSetting, setOpenSetting] = React.useState({
    state: false,
    id: "",
  });
  const [isUpdating, setIsUpdating] = React.useState(false);

  const { loading, error, data, refetch } = useQuery(GET_TWEETS, {
    onError: () => {
      console.log("loading error", error);
    },
    onCompleted: () => {
      setAllTweets(data.tweets);
    },
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  const handleConnection = () => {
    const status = navigator.onLine ? "online" : "offline";
    if (status === "online") {
      setIsConnected(true);
      setShowOnline(true);
    } else {
      setIsConnected(false);
      setShowOnline(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("online", handleConnection);
    window.addEventListener("offline", handleConnection);
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handlePopper = (event) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl2);

  React.useEffect(() => {
    refetch();
    const localUser = JSON.parse(localStorage.getItem("user"));
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData || !localUser) {
      router.push("/login");
    }
    setUser(localUser);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const onEmojiClick = (emoji) => {
    setPost({
      content: post.content ? post.content + emoji : emoji,
    });
  };

  const clearError = (value) => {
    setMessages({ success: "", failure: "" });
  };

  const clearMessages = () => {
    const timer = setTimeout(() => {
      clearError();
    }, 1000 * 3);
    return () => clearTimeout(timer);
  };

  const uploadToCloudinary = async (image) => {
    const url = "https://api.cloudinary.com/v1_1/chukwuka/auto/upload";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blog_cover_images");

    try {
      const response = await axios.post(url, formData);
      return response;
    } catch (err) {
      return err.message;
    }
  };

  const imageReg = /\.(gif|jpe?g|tiff|png|webp|bmp)$/i;

  const handleImageUpload = (e) => {
    setEmojiPicker(false);
    if (e.target.name === "imgUrl") {
      if (imageReg.test(e.target.files[0].name)) {
        console.log(e.target.files[0]);
        setPost({ ...post, imgUrl: e.target.files[0] });
        setImgPreview(URL.createObjectURL(e.target.files[0]));
      } else {
        e.target.value = "";
        setPost({ ...post, failure: "Please upload a valid photo" });
      }
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  //GRAPHQL MUTATIONS

  //CREATE TWEET FUNCTION
  const [createTweet] = useMutation(CREATE_TWEET, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
      setMessages({
        failure: "Sorry, something went wrong ",
      });
      clearMessages();
    },
    onCompleted: () => {
      setMessages({ success: "Post successfully created" });
      setPost({ content: "", imgUrl: "" });
      setImgPreview("");
      clearMessages();
    },
    update(cache, { data: { createTweet } }) {
      const data = cache.readQuery({ query: GET_TWEETS });
      cache.writeQuery({
        query: GET_TWEETS,
        data: { tweets: [...data.tweets, createTweet] },
      });
    },
  });

  //HANDLE TWEET CREATION
  const handleSubmit = async () => {
    if (post.content.trim().length == 0 && post.imgUrl == "") {
      setMessages({ failure: "Please create a content" });
      clearMessages();
      return;
    }
    setEmojiPicker(false);
    try {
      setPosting(true);
      //upload image to cloudinary
      if (post.imgUrl != undefined) {
        const cloudRes = await uploadToCloudinary(post.imgUrl);
        console.log("cloud res", cloudRes);
        if (cloudRes.status == 200) {
          await createTweet({
            variables: {
              content: post.content,
              imgUrl: cloudRes.data.secure_url,
            },
          });

          setPosting(false);
        } else {
          setMessages({
            failure:
              "Sorry you cannot upload images at this time due to technical glitches. However you can post texts without images. Thanks.",
          });
        }
      } else {
        await createTweet({
          variables: {
            content: post.content,
            imgUrl: post.imgUrl,
          },
        });

        setPosting(false);
      }
    } catch (e) {
      setPosting(false);
      console.log(e);
    }
  };

  //UPDATE FUNCTION
  const [updateTweet] = useMutation(UPDATE_TWEET, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
      setMessages({
        failure: "Sorry, something went wrong ",
      });
      clearMessages();
    },
    onCompleted: () => {
      setMessages({ success: "Post successfully updated" });
      setPost({ content: "", imgUrl: "" });
      setImgPreview("");
      clearMessages();
    },
  });

  const handleUpdate = async () => {
    if (
      selectedTweet.content.trim().length == 0 &&
      selectedTweet.imgUrl == "" &&
      post.content.trim().length == 0 &&
      post.imgUrl == ""
    ) {
      setMessages({ failure: "Please create a content" });
      clearMessages();
      return;
    }
    setEmojiPicker(false);
    try {
      setPosting(true);
      //upload image to cloudinary
      if (selectedTweet.imgUrl == "" && post.imgUrl != undefined) {
        const cloudRes = await uploadToCloudinary(post.imgUrl);
        console.log("cloud res", cloudRes);
        if (cloudRes.status == 200) {
          await updateTweet({
            variables: {
              id: selectedTweet.id,
              content: selectedTweet.content || post.content,
              imgUrl: selectedTweet.imgUrl || cloudRes.data.secure_url,
            },
          });

          setPosting(false);
        } else {
          setMessages({
            failure:
              "Sorry you cannot upload images at this time due to technical glitches. However you can post texts without images. Thanks.",
          });
        }
      } else {
        await updateTweet({
          variables: {
            id: selectedTweet.id,
            content: selectedTweet.content || post.content,
            imgUrl: post.imgUrl,
          },
        });

        setPosting(false);
      }
    } catch (e) {
      setPosting(false);
      console.log(e);
    }
  };

  //DELETE TWEET
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
      setMessages({
        failure: "Sorry, something went wrong ",
      });
      clearMessages();
    },
    onCompleted: () => {
      setMessages({ success: "Post deleted" });
      clearMessages();
    },
    update(cache, { data: { deleteTweet } }) {
      const data = cache.readQuery({ query: GET_TWEETS });
      cache.writeQuery({
        query: GET_TWEETS,
        data: { tweets: [...data.tweets, deleteTweet] },
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteTweet({
        variables: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  //ADD COMMENT
  const [createComment, cdata] = useMutation(ADD_COMMENT, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
      setMessages({
        failure: "Sorry, something went wrong ",
      });
      clearMessages();
    },
    onCompleted: () => {
      clearMessages();
      setComment("");
    },
  });

  const addComment = async (tweetId) => {
    if (comment.trim().length == 0) {
      return;
    }

    try {
      await createComment({
        variables: {
          TweetId: tweetId,
          comment: comment,
        },
      });
    } catch (error) {
      console.log("comment error", error.message);
    }
  };

  const removeImage = () => {
    setPost({ ...post, imgUrl: "" });
    setImgPreview("");
  };

  const breakText = (str) => {
    if (str.length > 140) {
      return `${str.slice(0, 140)}...`;
    }
    return str;
  };

  return (
    <Grid className={classes.root} container justify="center">
      <EditPost
        post={selectedTweet}
        setPost={(e) => setPost({ ...post, content: e.target.value })}
        posting={posting}
        imgPreview={imgPreview}
        removeImage={removeImage}
        handleClick={handleClick}
        handleImageUpload={handleImageUpload}
        handleClose={handleClose}
        open={isUpdating}
      />
      {isConnected ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          autoHideDuration={6000}
          open={showOnline}
          className={classes.snackbarOnline}
          message="You are online"
          key={"bottom" + "left"}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setShowOnline(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      ) : (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          autoHideDuration={6000}
          open={showOnline}
          className={classes.snackbarOffline}
          message="Your are offline. Check your internet connection"
          key={"bottom" + "left"}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setShowOnline(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      )}
      {messages.failure ? (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          style={{ color: "red" }}
          color="red"
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

      <Grid style={{ paddingRight: "1em", paddingLeft: "1em" }} item sm={3}>
        <Box
          style={{
            backgroundColor: "white",
            borderRadius: "1.5em",
            padding: "1em",
            marginTop: "1em",
          }}
        >
          <Box style={{ display: "flex", marginBottom: "1em" }}>
            <Avatar
              style={{
                width: "3rem",
                height: "3rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src={user ? user.imgUrl : ""}
              className={classes.imgArea}
            />
          </Box>
          <Box style={{ textAlign: "center" }}>
            <Typography
              style={{
                color: "#32506D",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography>{user.headline}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} sm={6} item>
        {!openFeedForm && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2em",
            }}
            className={classes.feedbox}
          >
            <Box style={{ display: "flex", marginBottom: "1em" }}>
              <Avatar
                style={{ width: "3rem", height: "3rem" }}
                src={user ? user.imgUrl : ""}
                className={classes.imgArea}
              />
            </Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOpenFeedForm(true)}
              style={{
                borderRadius: "0.5em",
                textTransform: "none",
              }}
            >
              Start a post
            </Button>
          </Box>
        )}
        {openFeedForm && (
          <Box className={classes.feedbox}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Box
                style={{ display: "flex", marginBottom: "1em", width: "100%" }}
              >
                <StyledBadge
                  style={{ color: "green" }}
                  overlap="circle"
                  badgeContent=" "
                  variant="dot"
                >
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
                    onChange={(e) => {
                      setPost({ ...post, content: e.target.value });
                      setEmojiPicker(false);
                    }}
                    autoFocus
                    onFocus={() => setEmojiPicker(false)}
                    disabled={posting}
                    name="content"
                    placeholder="What do you want share?"
                    className={classes.textarea}
                    rowsMin={1}
                  />
                  {imgPreview ? (
                    <>
                      <img
                        src={imgPreview}
                        alt="screen shot"
                        style={{ width: "100%" }}
                      />
                      {post.imgUrl != undefined &&
                        post.imgUrl != "" &&
                        imgPreview != null && (
                          <Chip
                            label="Remove image"
                            onDelete={removeImage}
                            color="primary"
                          />
                        )}
                    </>
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginLeft: "1rem" }}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                      name="imgUrl"
                      multiple
                      id="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        onClick={handleClick}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddAPhoto
                          style={{
                            height: "2rem",
                            width: "2rem",
                          }}
                        />
                      </IconButton>
                    </label>
                  </div>
                  <IconButton onClick={() => setEmojiPicker(!emojiPicker)}>
                    <EmojiEmotionsOutlined
                      style={{
                        height: "2rem",
                        width: "2rem",
                        color: "#32506D",
                      }}
                    />
                  </IconButton>
                </div>
                <div>
                  <Button
                    disabled={posting}
                    style={{
                      background: posting ? "white" : "",
                      color: posting ? "#32506D" : "",
                    }}
                    type="submit"
                    className={classes.feedButton}
                  >
                    {posting ? "POSTING..." : "POST"}
                  </Button>
                </div>
              </Box>
            </form>
          </Box>
        )}
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

        {!loading ? (
          allTweets ? (
            allTweets.map((tweet, index) => (
              <Box key={index} className={classes.tweetContainer}>
                <Box
                  style={{
                    display: "flex",
                    marginBottom: "1em",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box style={{ display: "flex" }}>
                    <StyledBadge
                      style={{ color: "green" }}
                      overlap="circle"
                      badgeContent=" "
                      variant="dot"
                    >
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
                      }}
                    >
                      <Typography
                        style={{
                          color: "#32506D",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >{`${tweet.User.firstName} ${tweet.User.lastName}`}</Typography>
                      <Typography>{formatDate(tweet.createdAt)}</Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => {
                      setOpenSetting({
                        state: !openSetting.state,
                        id: tweet.id,
                      });
                    }}
                  >
                    <MoreHoriz />
                  </IconButton>
                  {openSetting.state && tweet.id == openSetting.id && (
                    <Paper
                      style={{
                        width: "fit-content",
                        zIndex: 9,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* <Button onClick={()=>{
										setSelectedTweet(tweet)
										setIsUpdating(true)
									}}>Edit</Button> */}
                      <Button onClick={() => handleDelete(tweet.id)}>
                        Delete
                      </Button>
                    </Paper>
                  )}
                </Box>

                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {tweet.content ? (
                    <Box>
                      <Link href={`/feed/${tweet.id}`}>
                        <a className={classes.tweetBodyLink}>
                          <Typography
                            style={{
                              fontSize: "1.3em",
                              fontWeight: 600,
                              color: "black",
                            }}
                          >
                            {breakText(tweet.content)}
                          </Typography>
                        </a>
                      </Link>
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
                    }}
                  >
                    {tweet.Likes.length > 0 ? (
                      <span>
                        <Favorite style={{ color: "red", fontSize: "12px" }} />
                        <b>{tweet.Likes.length}</b>
                      </span>
                    ) : (
                      ""
                    )}
                    <a
                      className={classes.commentsView}
                      onClick={() => {
                        router.push(`/feed/${tweet.id}`);
                      }}
                    >
                      {tweet.Comments.length > 0
                        ? tweet.Comments.length > 1
                          ? tweet.Comments.length + " comments"
                          : tweet.Comments.length + " comment"
                        : ""}
                    </a>
                  </Box>
                </Box>
                <Divider variant="fullWidth" />
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.5em",
                    paddingBottom: "0.5em",
                    paddingRight: "1em",
                    paddingLeft: "1em",
                  }}
                >
                  <Button
                    size="medium"
                    variant="text"
                    href={`/feed/${tweet.id}`}
                    style={{ backgroundColor: "lightgrey", fontWeight: 600 }}
                    // onClick={() => router.push(`/feed/${tweet.id}`)}
                    endIcon={<ArrowForward color="primary" />}
                  >
                    View more
                  </Button>
                  {/* <Button>
                    <ChatBubbleOutline />
                  </Button> */}
                  <Button
                    size="medium"
                    variant="text"
                    style={{ backgroundColor: "lightgrey", fontWeight: 600 }}
                    onClick={handlePopper}
                    endIcon={<Share color="primary" />}
                  >
                    Share
                  </Button>
                  <ShareComponent
                    article={tweet}
                    anchorEl={anchorEl2}
                    openPopper={openPopper}
                  />
                  <ShareHeader
                    description={tweet.content + " - " + tweet.User.firstName}
                    image={tweet.imgUrl}
                    title="Sosha Feeds"
                  />
                </Box>
                <Divider variant="fullWidth" />
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
      </Grid>
      <Grid style={{ paddingRight: "1em", paddingLeft: "1em" }} item sm={3}>
        <Box
          style={{
            backgroundColor: "white",
            borderRadius: "1.5em",
            padding: "1em",
            marginTop: "1em",
          }}
        >
          <Typography style={{ fontWeight: "bold", textAlign: "center" }}>
            People you can follow
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Feed;
