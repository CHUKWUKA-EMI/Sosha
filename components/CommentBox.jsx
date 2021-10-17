/* eslint-disable react/prop-types */
import React from "react";
import { TextareaAutosize, Avatar, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { ADD_COMMENT, COMMENTS_SUBSCRIPTION } from "../Apollo/queries";
import { useMutation, useSubscription } from "@apollo/client";
import { addAComment, setSelectedPost } from "../redux/postsReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginBottom: "2em",
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

export default function CommentBox({ user, tweet, autofocus }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");

  //COMMENT SUBSCRIPTION
  useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: { TweetId: tweet?.id },
    onSubscriptionData: ({ subscriptionData }) => {
      const { newComment } = subscriptionData.data;
      dispatch(addAComment(newComment));
    },
  });

  //ADD COMMENT
  const [createComment, { loading: addingComment }] = useMutation(ADD_COMMENT, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
    },
    onCompleted: () => {
      setComment("");
    },
  });

  const addComment = async () => {
    if (comment.trim().length == 0) {
      return;
    }

    try {
      await createComment({
        variables: {
          TweetId: tweet.id,
          comment: comment,
        },
      });
    } catch (error) {
      console.log("comment error", error.message);
    }
  };

  return (
    <Box
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
          dispatch(setSelectedPost(tweet));
          e.preventDefault();
          addComment();
        }}
      >
        <TextareaAutosize
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          autoFocus={autofocus}
          name="comment"
          placeholder="Write a comment"
          className={classes.commentBox}
          rowsMin={1}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              // addComment(tweet.id);
            }
          }}
        />
        {comment.trim().length > 0 && (
          <Button
            type="submit"
            style={{
              borderRadius: "1em",
              backgroundColor: "#32506D",
              color: "white",
              textTransform: "lowercase",
              marginLeft: "1em",
            }}
            disabled={addingComment}
            size="small"
            variant="contained"
          >
            {addingComment ? "..." : "Send"}
          </Button>
        )}
      </form>
    </Box>
  );
}
