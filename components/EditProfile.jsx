/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Typography,
  Input,
  IconButton,
  InputAdornment,
  Dialog,
  Button,
} from "@material-ui/core";
import { PhotoCamera, Close, DateRange } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginBottom: "2rem",
    // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
  },
  submit: {
    fontWeight: "bold",
    marginTop: "1rem",
    marginBottom: "1rem",
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
}));

const EditProfile = (props) => {
  const {
    open,
    handleClose,
    handleChange,
    validateField,
    firstName,
    lastName,
    birthdate,
    setBirthdate,
    email,
    phone,
    imageUrl,
    headline,
    bio,
    country,
    state,
    sex,
    website,
    data,
    handleSubmit,
    update,
    noErrors,
  } = props;

  const classes = useStyles();

  const editForm = (
    <Box className={classes.dialogRoot}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton color="primary" component="span" onClick={handleClose}>
          <Close
            style={{
              height: "2rem",
              width: "2rem",
            }}
          />
        </IconButton>
        <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Edit profile
        </Typography>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={classes.form}
      >
        <Box
          style={{
            marginBottom: "2rem",
            background: "#c2d6d6",
            height: "8rem",
          }}
        >
          <div
            style={
              imageUrl
                ? {
                    backgroundImage: "url(" + imageUrl + ")",
                    backgroundSize: "contain",
                  }
                : data
                ? {
                    backgroundImage: "url(" + data.user.imgUrl + ")",
                    backgroundSize: "contain",
                  }
                : { background: "#32506D" }
            }
            className={classes.imgArea}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file2"
              name="imageUrl"
              onChange={handleChange}
              onKeyUp={validateField}
              type="file"
            />
            <label htmlFor="contained-button-file2">
              <IconButton
                aria-label="upload picture"
                style={{ color: "#fff" }}
                component="span"
              >
                <PhotoCamera
                  style={{
                    height: "2rem",
                    width: "2rem",
                  }}
                />
              </IconButton>
            </label>
          </div>
        </Box>
        <Box style={{ marginTop: "5rem" }}>
          <Typography color="primary">First Name</Typography>
          <Input
            className={classes.profileInfo}
            name="firstName"
            value={firstName}
            onChange={handleChange}
            onKeyUp={validateField}
            disableUnderline={true}
            fullWidth
            id="firstName"
            autoFocus
          />
          <Typography color="primary">Last Name</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="lastName"
          />
          <Typography color="primary">Date of Birth</Typography>
          <DatePicker
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            isClearable
            name="birthdate"
            showMonthDropdown
            showYearDropdown
            customInput={
              <Input
                className={classes.profileInfo}
                fullWidth
                disableUnderline={true}
                id="dateOfBirth"
                name="birthdate"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton color="primary">
                      <DateRange />
                    </IconButton>
                  </InputAdornment>
                }
              />
            }
            dateFormat="dd/MM/yyyy"
          />
          <Typography color="primary">Email Address</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="email"
          />

          <Typography color="primary">Phone Number</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="phone"
          />
          <Typography color="primary">Headline</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            placeholder="e.g Software Developer at Facebook"
            disableUnderline={true}
            id="headline"
            name="headline"
            value={headline}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="headline"
          />
          <Typography color="primary">Bio</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="bio"
            name="bio"
            value={bio}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="bio"
          />
          <Typography color="primary">Country</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="country"
            name="country"
            value={country}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="country"
          />
          <Typography color="primary">State</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="state"
            name="state"
            value={state}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="state"
          />
          <Typography color="primary">Sex</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="sex"
            name="sex"
            value={sex}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="sex"
          />
          <Typography color="primary">Website Url</Typography>
          <Input
            className={classes.profileInfo}
            fullWidth
            disableUnderline={true}
            id="websiteurl"
            name="website"
            value={website}
            onChange={handleChange}
            onKeyUp={validateField}
            autoComplete="websiteurl"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={update || !noErrors ? true : false}
            className={classes.submit}
          >
            {update ? "LOADING..." : "SAVE"}
          </Button>
        </Box>
      </form>
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
      </Dialog>
    </div>
  );
};

export default EditProfile;
