/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Avatar,
  Badge,
  Snackbar,
} from "@material-ui/core";
import {
  MoreHoriz,
  ThumbUp,
  ThumbUpOutlined,
  ChatBubbleOutline,
  Share,
  Favorite,
} from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";
import { useRouter } from "next/router";
import { UPDATE_TWEET, DELETE_TWEET } from "../Apollo/queries";
import { formatDate } from "../libs/dates";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ShareHeader from "./SocialShareHeader";
import ShareComponent from "./SocialShareComponent";
import { deletePost } from "../redux/postsReducer";
import PostSettingsPopover from "./PostSettingsPopover";
import CommentsComponent from "./Comments";
import CommentBox from "./CommentBox";
import { IKImage } from "imagekitio-react";

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
  ctas: {
    backgroundColor: "white",
    textTransform: "none",
    color: "grey",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "lightgrey",
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

export default function PostsList({ user }) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.posts.posts);
  const [shareAnchor, setShareAnchor] = React.useState(null);
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [messages, setMessages] = React.useState({
    success: "",
    failure: "",
  });
  const [editMode, setEditMode] = React.useState(false);
  const [emojiPicker, setEmojiPicker] = React.useState(false);
  const [posting, setPosting] = React.useState(false);
  const [selectedTweet, setSelectedTweet] = React.useState({});
  const [post, setPost] = React.useState({
    content: "",
    imgUrl: "",
    imagekit_fileId: "",
  });
  const [openComments, setOpenComments] = React.useState(false);
  const [autofocus, setAutoFocus] = React.useState(false);

  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const authenticationEndpoint = process.env.BACKEND_URL + "imagekitAuth";

  const handleSharePopper = (event) => {
    setShareAnchor(shareAnchor ? null : event.currentTarget);
  };

  const openSharePopper = Boolean(shareAnchor);

  const handleSettingsPopover = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const closeSettingsPopover = () => {
    setSettingsAnchor(null);
  };

  const openSettingsPopover = Boolean(settingsAnchor);
  const settingsPopoverId = openSettingsPopover ? "simple-popover" : undefined;

  const breakText = (str) => {
    if (str.length > 140) {
      return `${str.slice(0, 140)}...`;
    }
    return str;
  };

  const clearError = () => {
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

  const [deleteTweet, { loading: deleteLoading }] = useMutation(DELETE_TWEET, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
      setMessages({
        failure: "Sorry, something went wrong ",
      });
      clearMessages();
    },
    onCompleted: (data) => {
      setSettingsAnchor(null);
      dispatch(deletePost(data.deleteTweet));
      setMessages({ success: "Post deleted" });
      clearMessages();
    },
  });

  const handleDelete = async () => {
    if (selectedTweet.User.id !== user.id) {
      setMessages({ failure: "You can only delete your own posts" });
      clearMessages();
      return;
    }
    try {
      await deleteTweet({
        variables: {
          id: selectedTweet.id,
        },
      });
    } catch (e) {
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
      //   setImgPreview("");
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
      //upload image to imagekit
      if (selectedTweet.imgUrl == "" && post.imgUrl != undefined) {
        const cloudRes = await uploadToImageKit(post.imgUrl);
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
            failure: "Image could not be uploaded",
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

  return (
    <div>
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
      {tweets
        ? tweets.map((tweet, index) => (
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
                        src={tweet.User?.imgUrl}
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
                  style={{
                    display: tweet.User.id === user.id ? "block" : "none",
                  }}
                  aria-describedby={settingsPopoverId}
                  onClick={(e) => {
                    handleSettingsPopover(e);
                    setSelectedTweet(tweet);
                  }}
                >
                  <MoreHoriz />
                </IconButton>
                <PostSettingsPopover
                  anchorEl={settingsAnchor}
                  open={openSettingsPopover}
                  handleDelete={() => handleDelete(tweet.id)}
                  setToEdit={() => setEditMode(true)}
                  handleClose={closeSettingsPopover}
                  deleteLoading={deleteLoading}
                />
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
                    <Typography
                      onChange={(e) =>
                        setPost({ ...post, content: e.target.value })
                      }
                      style={{
                        fontSize: "1.3em",
                        fontWeight: 600,
                        color: "black",
                      }}
                    >
                      {breakText(tweet.content)}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
                {tweet.imgUrl ? (
                  <Box>
                    <IKImage
                      urlEndpoint={urlEndpoint}
                      src={tweet.imgUrl}
                      width="100%"
                      transformation={[{ quality: 90 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
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
                  {tweet.Likes?.length > 0 ? (
                    <span>
                      <Favorite style={{ color: "red", fontSize: "12px" }} />
                      <b>{tweet.Likes.length}</b>
                    </span>
                  ) : (
                    ""
                  )}
                  <a
                    className={classes.commentsView}
                    onClick={() => setOpenComments(!openComments)}
                  >
                    {tweet.Comments?.length > 0
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
                  // href={`/feed/${tweet.id}`}
                  className={classes.ctas}
                  startIcon={<ThumbUpOutlined style={{ color: "grey" }} />}
                >
                  Like
                </Button>
                <Button
                  onClick={() => setAutoFocus(true)}
                  startIcon={<ChatBubbleOutline style={{ color: "grey" }} />}
                  size="medium"
                  variant="text"
                  className={classes.ctas}
                >
                  Comment
                </Button>
                <Button
                  size="medium"
                  variant="text"
                  startIcon={<Share style={{ color: "grey" }} />}
                  className={classes.ctas}
                  onClick={handleSharePopper}
                >
                  Share
                </Button>
                <ShareComponent
                  article={tweet}
                  anchorEl={shareAnchor}
                  openPopper={openSharePopper}
                />
                <ShareHeader
                  description={
                    tweet ? tweet.content + " - " + tweet.User.firstName : ""
                  }
                  image={tweet ? tweet.imgUrl : ""}
                  title="Sosha Feeds"
                />
              </Box>
              <Divider variant="fullWidth" />
              <CommentBox user={user} autofocus={autofocus} />
              {openComments && (
                <React.Fragment>
                  {tweet.Comments?.length > 0 &&
                    tweet.Comments.map((comment, index) => (
                      <CommentsComponent key={index} comment={comment} />
                    ))}
                </React.Fragment>
              )}
            </Box>
          ))
        : ""}
    </div>
  );
}
