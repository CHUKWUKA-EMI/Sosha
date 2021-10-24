/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  Button,
  Divider,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginBottom: "2rem",
    height: "80%",
    // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
  },
  submit: {
    fontWeight: "bold",
    marginTop: "6rem",
    marginBottom: "1rem",
    backgroundColor: "#32506D",
    width: "70%",
    marginLeft: "3em",
    textTransform: "none",
    color: "white",
    "&:hover": {
      backgroundColor: "#32506D",
      color: "white",
    },
  },
  profileInfo: {
    border: "1px solid #32506D",
    padding: "0.3em 1em",
    borderRadius: "5px",
  },
  imgArea: {
    height: "9rem",
    width: "9rem",
    background: "#32506D",
    marginLeft: "1rem",
    marginTop: "1rem",
    borderRadius: "4.5rem",
    border: "4px solid #fff",
    position: "absolute",
    zIndex: 1,
    padding: "2.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "1rem",
      height: "6rem",
      width: "6rem",
      padding: "1rem",
      borderRadius: "3rem",
    },
  },
  dialogRoot: {
    width: "100%",
    paddingLeft: "2em",
    paddingRight: "2em",
    marginBottom: "2em",
    borderRadius: "2em",
  },
  dialogbox: {
    "& .MuiDialog-paperWidthSm": {
      width: "50%",
      borderRadius: "2em",
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
}));

const UploadPhoto = ({
  handleClose,
  open,
  handlePhotoUpload,
  imgPreview,
  uploadPhoto,
  loading,
  onChange,
  content,
}) => {
  const classes = useStyles();
  const [done, setDone] = React.useState(false);
  const editForm = (
    <Box className={classes.dialogRoot}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Select your photo
        </Typography>
        <IconButton
          onClick={(e) => {
            setDone(false);
            handleClose(e);
          }}
          color="primary"
          component="span"
        >
          <Close
            style={{
              height: "2rem",
              width: "2rem",
            }}
          />
        </IconButton>
      </div>
      <Divider />
      {done && (
        <TextareaAutosize
          value={content}
          onChange={onChange}
          autoFocus
          disabled={loading}
          name="content"
          placeholder="What do you want share?"
          className={classes.textarea}
          rowsMin={2}
        />
      )}
      {imgPreview ? (
        <img src={imgPreview} alt="screen shot" style={{ width: "100%" }} />
      ) : (
        <div className={classes.form}>
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
              multiple
              name="imgUrl"
              id="contained-button-file"
              type="file"
            />
            <Button
              variant="contained"
              className={classes.submit}
              component="span"
            >
              Select images to share
            </Button>
          </label>
        </div>
      )}
    </Box>
  );

  return (
    <div>
      <Dialog
        className={classes.dialogbox}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        aria-describedby="simple-dialog-description"
      >
        {editForm}
        <div
          style={{
            marginTop: "1em",
            display: "flex",
            alignItems: "center",
            padding: "0.5em",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{
              border: "1px solid #32506D",
              borderRadius: "1em",
              textTransform: "none",
              fontWeight: "bold",
              marginRight: "1em",
            }}
            onClick={(e) => {
              setDone(false);
              handleClose(e);
            }}
          >
            Cancel
          </Button>
          {!done && (
            <Button
              style={{
                border: "1px solid #32506D",
                borderRadius: "1em",
                textTransform: "none",
                fontWeight: "bold",
                marginRight: "1em",
                backgroundColor: imgPreview ? "rgb(29, 161, 242)" : "grey",
                color: imgPreview ? "white" : "black",
              }}
              disabled={!imgPreview}
              onClick={() => setDone(true)}
            >
              Done
            </Button>
          )}
          {done && (
            <Button
              style={{
                border: "1px solid #32506D",
                borderRadius: "1em",
                textTransform: "none",
                fontWeight: "bold",
                marginRight: "1em",
                backgroundColor: "rgb(29, 161, 242)",
                color: "white",
              }}
              disabled={loading}
              onClick={uploadPhoto}
            >
              {loading ? "Loading..." : "Post"}
            </Button>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UploadPhoto;
