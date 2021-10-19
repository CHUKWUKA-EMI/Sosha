/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { initializeApollo, addApolloState } from "../../Apollo/client";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Avatar,
  Badge,
  Grid,
} from "@material-ui/core";
import {
  ThumbUpOutlined,
  ThumbUp,
  Share,
  ArrowBack,
  Favorite,
} from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { GET_SINGLE_TWEET, LIKE_POST } from "../../Apollo/queries";
import { useRouter } from "next/router";
import { formatDate } from "../../libs/dates";
import Community from "../community";
import Container from "@material-ui/core/Container";
import ShareHeader from "../../components/SocialShareHeader";
import ShareComponent from "../../components/SocialShareComponent";
// import Comment from "../../components/Comments";

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

function Feed({ tweet }) {
  const classes = useStyles();
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    if (user != null) {
      const userLike = tweet.Likes?.find((c) => c.UserId == user.id);
      if (userLike) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [likeCount]);

  useEffect(() => {
    setLikeCount(tweet.Likes.length);
  }, []);

  const handlePopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl);

  const clearError = () => {
    setMessages({ success: "", failure: "" });
  };

  const clearMessages = () => {
    const timer = setTimeout(() => {
      clearError();
    }, 1000 * 3);
    return () => clearTimeout(timer);
  };

  const [create_like] = useMutation(LIKE_POST, {
    ignoreResults: false,
    onError: () => {
      setLiked(!liked);
      setMessages({
        failure: "Sorry, something went wrong ",
      });
      clearMessages();
    },
    onCompleted: () => {
      clearMessages();
      if (liked) {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
    },
  });

  const likePost = async () => {
    setLiked(!liked);

    try {
      await create_like({
        variables: {
          TweetId: tweet.id,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //ADD COMMENT
  // const [createComment] = useMutation(ADD_COMMENT, {
  //   ignoreResults: false,
  //   onError: (error) => {
  //     console.log("error", error);
  //     setMessages({
  //       failure: "Sorry, something went wrong ",
  //     });
  //     clearMessages();
  //   },
  //   onCompleted: () => {
  //     clearMessages();
  //     setComment("");
  //   },
  // });

  // const addComment = async (tweetId) => {
  //   if (comment.trim().length == 0) {
  //     return;
  //   }

  //   try {
  //     await createComment({
  //       variables: {
  //         TweetId: tweetId,
  //         comment: comment,
  //       },
  //     });
  //   } catch (error) {
  //     console.log("comment error", error.message);
  //   }
  // };

  return (
    <Community>
      <ShareHeader />
      <Container maxWidth="lg">
        <Grid className={classes.root} container justify="center">
          <Grid
            style={{ paddingRight: "1em", paddingLeft: "1em" }}
            item
            sm={3}
          ></Grid>
          <Grid xs={12} sm={6} item>
            <Button
              size="large"
              variant="text"
              style={{
                backgroundColor: "white",
                color: "#32506D",
                fontWeight: "bold",
                marginTop: "1em",
                marginLeft: "1em",
                marginBottom: "1em",
              }}
              onClick={() => router.back()}
              startIcon={<ArrowBack color="primary" />}
            >
              BACK TO FEEDS
            </Button>
            <Box className={classes.tweetContainer}>
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
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      paddingLeft: "1em",
                    }}
                  >
                    <Typography style={{ fontWeight: 700 }}>
                      {formatDate(tweet.createdAt)}
                    </Typography>
                  </Box>
                </Box>
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
                      style={{
                        fontSize: "1.3em",
                        fontWeight: 600,
                        color: "black",
                      }}
                    >
                      {tweet.content}
                    </Typography>
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
                  {likeCount > 0 ? (
                    <span>
                      <Favorite style={{ color: "red", fontSize: "15px" }} />
                      <b>{likeCount}</b>
                    </span>
                  ) : (
                    ""
                  )}

                  {/* <a
                    onClick={() => setShowComments(!showComments)}
                    className={classes.commentsView}
                  >
                    {tweet.Comments.length > 0
                      ? tweet.Comments.length > 1
                        ? tweet.Comments.length + " comments"
                        : tweet.Comments.length + " comment"
                      : ""}
                  </a> */}
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
                <IconButton
                  onClick={likePost}
                  style={{ backgroundColor: "lightgrey" }}
                >
                  {liked ? (
                    <ThumbUp style={{ color: "blue" }} />
                  ) : (
                    <ThumbUpOutlined />
                  )}
                </IconButton>
                {/* <IconButton>
                  <ChatBubbleOutline />
                </IconButton> */}
                <IconButton
                  onClick={handlePopper}
                  style={{ backgroundColor: "lightgrey" }}
                >
                  <Share />
                </IconButton>
                <ShareComponent
                  article={tweet}
                  anchorEl={anchorEl}
                  openPopper={openPopper}
                />
                <ShareHeader
                  description={tweet.content + " - " + tweet.User.firstName}
                  image={tweet.imgUrl}
                  title="Sosha Feeds"
                />
              </Box>
              <Divider variant="fullWidth" />
              {/* {showComments && (
                <Box>
                  {comments?.length > 0 &&
                    comments.map((comment, index) => (
                      <Box
                        key={index}
                        style={{
                          width: "100%",
                          paddingLeft: "1em",
                        }}
                      >
                        <Comment comment={comment} />
                      </Box>
                    ))}
                </Box>
              )} */}
              {/* <Box
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginTop: "0.5em",
                }}
              >
                <Avatar src={user?.imgUrl} className={classes.commentAvatar} />
                <form
                  style={{ width: "80%" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addComment(tweet.id);
                  }}
                >
                  <TextareaAutosize
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    autoFocus
                    name="comment"
                    placeholder="Write a comment"
                    className={classes.commentBox}
                    rowsMin={1}
                    onKeyUp={(e) => {
                      if (e.key == "Enter") {
                        addComment(tweet.id);
                      }
                    }}
                  />
                  {comment.trim().length > 0 && (
                    <Button
                      onClick={() => addComment(tweet.id)}
                      style={{
                        borderRadius: "1em",
                        backgroundColor: "#32506D",
                        color: "white",
                        textTransform: "lowercase",
                        marginLeft: "1em",
                      }}
                      size="small"
                      type="submit"
                      variant="contained"
                    >
                      Send
                    </Button>
                  )}
                </form>
              </Box> */}
            </Box>
          </Grid>
          <Grid style={{ paddingRight: "1em", paddingLeft: "1em" }} item sm={3}>
            <Typography
              style={{
                marginTop: "5em",
                color: "#32506D",
                fontWeight: "bold",
                fontSize: "17px",
                backgroundColor: "white",
                padding: "0.2em",
                textAlign: "center",
              }}
            >
              Author
            </Typography>
            <Box
              style={{
                display: "flex",
                backgroundColor: "white",
                borderRadius: "1em",
                marginTop: "1em",
                padding: "1em",
                cursor: "pointer",
              }}
            >
              <StyledBadge
                style={{ color: "green" }}
                overlap="circle"
                badgeContent=" "
                variant="dot"
              >
                {<Avatar src={tweet.User.imgUrl} className={classes.imgArea} />}
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
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  {`${tweet.User.headline ? tweet.User.headline : ""}`}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Community>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_SINGLE_TWEET,
    variables: { TweetId: params.TweetId },
  });

  return addApolloState(apolloClient, {
    props: {
      tweet: data.tweet,
    },
  });
}

export default Feed;
