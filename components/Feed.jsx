/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
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
  Close as CloseIcon,
} from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import "emoji-mart/css/emoji-mart.css";
import emojidata from "emoji-mart/data/twitter.json";
import { NimblePicker } from "emoji-mart";
import { useRouter } from "next/router";
import {
  CREATE_TWEET,
  GET_TWEETS,
  NEW_TWEET,
  GET_FRIENDS,
} from "../Apollo/queries";
import EditPost from "./EditPost";
import axios from "axios";
import Link from "next/link";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { getFriends } from "../redux/friendsReducer";
import { setPosts, addPost } from "../redux/postsReducer";
import PostsList from "./PostsList";

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
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({});
  const [emojiPicker, setEmojiPicker] = React.useState(false);
  const [post, setPost] = React.useState({ content: "", imgUrl: "" });
  const [comment, setComment] = React.useState("");
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  const [imgPreview, setImgPreview] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [posting, setPosting] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openFeedForm, setOpenFeedForm] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [showOnline, setShowOnline] = React.useState(false);

  //IMAGE KIT PARAMS
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const authenticationEndpoint = process.env.BACKEND_URL + "imagekitAuth";

  const { loading, error, data, refetch } = useQuery(GET_TWEETS, {
    onError: () => {
      console.log("loading error", error);
    },
    onCompleted: () => {
      // setAllTweets(data.tweets);
      dispatch(setPosts(data.tweets));
    },
    errorPolicy: "all",
    // notifyOnNetworkStatusChange: true,
  });

  const { loading: friendsLoading, data: friendsData } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      console.log("friends data", friendsData);
      dispatch(getFriends(friendsData.friends));
    },
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

  React.useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("sosha_user"));
    if (!Cookie.get("sosha_token")) {
      window.location.href = "/login?previousPage=/feeds";
    }
    // if (!authData || !localUser) {
    //   router.push("/login");
    // }
    refetch();
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

  const uploadToImageKit = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("fileName", image.name);
    formData.append("publicKey", publicKey);
    formData.append("folder", "/social_media_posts");
    try {
      const authenticate = await axios.get(authenticationEndpoint);

      if (authenticate.status === 200) {
        formData.append("token", authenticate.data.token);
        formData.append("expire", authenticate.data.expire);
        formData.append("signature", authenticate.data.signature);
        try {
          const response = await axios.post(
            "https://upload.imagekit.io/api/v1/files/upload",
            formData
          );
          return response;
        } catch (error) {
          return error.message;
        }
      }
    } catch (error) {
      return error.message;
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
  });

  //TWEET SUBSCRIPTION
  const { error: newTweetError } = useSubscription(NEW_TWEET, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { newTweet } = subscriptionData.data;
      dispatch(addPost(newTweet));
    },
  });

  React.useEffect(() => {
    if (newTweetError) {
      console.log("tweet subscription error: ", newTweetError);
    }
  }, [newTweetError]);

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
      //upload image to imagekit
      if (post.imgUrl) {
        const cloudRes = await uploadToImageKit(post.imgUrl);
        if (cloudRes.status == 200) {
          // console.log("cloudRes", cloudRes);
          await createTweet({
            variables: {
              content: post.content,
              imgUrl: cloudRes.data.url,
              imagekit_fileId: cloudRes.data.fileId,
              userId: user.id,
            },
          });

          setPosting(false);
        } else {
          setMessages({
            failure: "Image upload failed",
          });
          setPosting(false);
        }
      } else {
        await createTweet({
          variables: {
            content: post.content,
            userId: user.id,
          },
        });

        setPosting(false);
      }
    } catch (e) {
      setPosting(false);
      console.log(e);
    }
  };

  const removeImage = () => {
    setPost({ ...post, imgUrl: "" });
    setImgPreview("");
  };

  return (
    <Grid className={classes.root} container justify="center">
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
                borderRadius: "2em",
                height: "4em",
                textTransform: "none",
                fontWeight: "bold",
                color: "darkslategrey",
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
                setEmojiPicker(false);
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
                  {emojiPicker ? (
                    <div
                      style={{ position: "absolute", zIndex: 1, top: "18em" }}
                    >
                      <NimblePicker
                        style={{ position: "absolute", zIndex: 1 }}
                        title="Pick your emoji…"
                        emoji="point_up"
                        theme="dark"
                        set="twitter"
                        data={emojidata}
                        emojiTooltip={true}
                        onSelect={(emoji) => onEmojiClick(emoji.native)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
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
                    {posting ? "Processing..." : "SUBMIT"}
                  </Button>
                </div>
              </Box>
            </form>
          </Box>
        )}

        {!loading ? (
          <PostsList user={user} />
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
      <Grid
        style={{ paddingRight: "1em", paddingLeft: "1em" }}
        item
        sm={3}
      ></Grid>
    </Grid>
  );
};

export default Feed;
