import React from "react";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../libs/dates";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));
const Comments = (props) => {
	const classes = useStyles();
	const { comment } = props;
	return (
		<div className={classes.root}>
			<Grid container wrap="nowrap" spacing={2}>
				<Grid item>
					<Avatar alt="comment's owner" src={comment.User.imgUrl} />
				</Grid>
				<Grid justifyContent="left" item xs zeroMinWidth>
					<h4
						style={{
							margin: 0,
							textAlign: "left",
						}}>{`${comment.User.firstName} ${comment.User.lastName}`}</h4>
					<p style={{ textAlign: "left" }}>{comment.comment}</p>
					<p style={{ textAlign: "left" }}>{formatDate(comment.createdAt)}</p>
				</Grid>
			</Grid>
		</div>
	);
};

export default Comments;
