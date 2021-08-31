/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../libs/dates";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // marginTop: theme.spacing(2),
  },
  comment: {
    justifyContent: "left",
    backgroundColor: "gainsboro",
    marginRight: "1em",
    marginTop: "0.5em",
    marginBottom: "1em",
    borderRadius: "1em",
    fontWeight: "0.2em",
  },
}));
const Comments = (props) => {
  const classes = useStyles();
  const { comment, key } = props;

  return (
    <div key={key} className={classes.root}>
      <Grid style={{ marginTop: "0.5em" }} container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="comment's owner" src={comment.User.imgUrl} />
        </Grid>
        <Grid className={classes.comment} item xs zeroMinWidth>
          <h4
            style={{
              margin: 0,
              textAlign: "left",
            }}
          >
            {`${comment.User.firstName} ${comment.User.lastName}`}
          </h4>
          <div style={{ textAlign: "left" }}>{comment.comment}</div>
          <span
            style={{
              textAlign: "left",
              fontStyle: "italics",
              fontWeight: 500,
              color: "crimson",
              fontSize: "12px",
              marginTop: "0.5em",
            }}
          >
            {formatDate(comment.createdAt)}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comments;
