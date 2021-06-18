import React from "react";
import {
	Box,
	IconButton,
	Divider,
	Dialog,
	Button,
    TextareaAutosize
} from "@material-ui/core";
import {
	AddAPhoto,
	
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dialogRoot: {
		width: "100%",
		height: "50em",
		paddingLeft: "2em",
		paddingRight: "2em",
		marginBottom: "2em",
	},
	dialogbox: {
		"& .MuiDialog-paperWidthSm": {
			width: "60%",
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
    textarea: {
		outlineStyle: "none",
		border: "none",
		resize: "none",
		width: "100%",
		paddingTop: "1em",
		fontSize: "20px",
		fontWeight: "bold",
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
}))

export default function EditPost(props) {
    const classes = useStyles();

    const {post, setPost,posting,imgPreview,removeImage,handleClick,handleImageUpload,handleClose,open } = props

	const editForm = (
        <Box className={classes.feedbox}>
        <form style={{width:'100%'}}>
        <div style={{ width: "80%" }}>
            <TextareaAutosize
			value={post.content}
            onChange={setPost}
            autoFocus
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
        {post.imgUrl !=undefined && post.imgUrl !="" && imgPreview !=null &&<Chip label="Remove image" onDelete={removeImage} color="primary" />}
        </>
    ) : (
        ""
    )}
	</div>
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
            
                        htmlFor="icon-button-file">
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
                </label>
            </div>
        </div>
        <div>
            <Button
                disabled={posting}
                style={{ background: posting ? "white" : "",color:posting?'#32506D':"" }}
                type="submit"
                className={classes.feedButton}>
                {posting ? "UPDATING..." : "UPDATE"}
            </Button>
        </div>
    </Box>
    </form>
    </Box>
    )

    return (
        <div>
            <Dialog
				className={classes.dialogbox}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-dialog-title"
				aria-describedby="simple-dialog-description">
				{editForm}
			</Dialog>
        </div>
    )
}
