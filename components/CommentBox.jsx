/* eslint-disable react/prop-types */
import React from "react";
import { TextareaAutosize, Avatar, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function CommentBox({ user, autofocus }) {
  const classes = useStyles();
  const [comment, setComment] = React.useState("");
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
          e.preventDefault();
          // addComment(tweet.id);
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
            //   onClick={() => addComment(tweet.id)}
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
    </Box>
  );
}
