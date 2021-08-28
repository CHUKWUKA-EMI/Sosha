/* eslint-disable react/prop-types */
import React from "react";
import Community from "../pages/community";
import { useMutation } from "@apollo/client";
import { initializeApollo, addApolloState } from "../Apollo/client";
import {
  Box,
  Typography,
  Button,
  Link,
  Badge,
  Avatar,
  Container,
  Snackbar,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { formatDate } from "../libs/dates";
import { GET_USER_BY_NAME, SEND_FRIEND_REQUEST } from "../Apollo/queries";
import * as cookie from "cookie";
import { connectwithFriend } from "../redux/usersReducer";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  imgArea: {
    height: "9rem",
    width: "9rem",
    background: "#32506D",
    marginLeft: "1rem",
    marginTop: "4rem",
    borderRadius: "4.5rem",
    border: "4px solid #fff",
    position: "absolute",
    zIndex: 1,
    // [theme.breakpoints.down("xs")]: {
    // 	height: "4rem",
    // 	width: "4rem",
    // 	borderRadius: "3rem",
    // },
  },
  infobox: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "3.5rem",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
  },
  fab: {
    backgroundColor: "#fff",
    height: "2rem",
    borderRadius: "0.5rem",
    border: "1px solid #32506D",
    color: "#32506D",
    fontWeight: 800,
    textTransform: "capitalize",
    "&:hover": {
      background: "#c2d6d6",
    },
    "& .MuiButton-label": {
      lineHeight: "normal",
    },
  },
  followButton: {
    textTransform: "capitalize",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "0 1em",
    "&:hover": {
      background: "none",
      textDecoration: "underline",
    },
    "&:active": {
      background: "none",
      textDecoration: "underline",
    },
    "@media screen and (max-width: 959px)": {
      padding: "0 1em",
      fontSize: "1em",
      textAlign: "right",
    },
    "@media screen and (max-width: 760px)": {
      textAlign: "left",
    },
  },
  link: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "0.6em",
    textDecoration: "none",
    color: "#32506D",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  connectButton: {
    borderRadius: "0.5em",
    fontWeight: 600,
    textTransform: "none",
    color: "white",
    backgroundColor: "#32506D",
    height: "2em",
    fontSize: "15px",
    "&:hover": {
      color: "white",
      backgroundColor: "#32506D",
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: "-9.5rem",
    top: "10rem",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    borderRadius: "50%",
    background: "green",
    height: "1rem",
    width: "1rem",
  },
}))(Badge);

const User = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  const [connectButtonState, setConnectButtonState] = React.useState({
    disabled: false,
    text: user.requeststatus == "pending" ? "Pending" : "Connect",
  });

  const [sendFriendRequest, { loading }] = useMutation(SEND_FRIEND_REQUEST, {
    onError: () => {
      setMessages({ failure: "Something went wrong" });
      setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
    },
    onCompleted: () => {
      setMessages({ success: "Friend request sent!" });
      setConnectButtonState({ disabled: true, text: "Pending" });
      dispatch(connectwithFriend(user.id));
      setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
    },
  });
  const sendRequest = async () => {
    try {
      await sendFriendRequest({ variables: { friendId: user.id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Community>
      <Container maxWidth="md">
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
        <div className={classes.root}>
          <Box style={{ width: "100%" }}>
            <Box
              style={{
                marginBottom: "2rem",
                background: "#32506D",
                height: "8rem",
              }}
            >
              <StyledBadge
                style={{ color: "red" }}
                overlap="circle"
                badgeContent=" "
                variant="dot"
              >
                {
                  <Avatar
                    className={classes.imgArea}
                    src={user?.imgUrl ? user.imgUrl : ""}
                  />
                }
              </StyledBadge>
            </Box>
            <Box style={{ background: "#fff", paddingBottom: "2rem" }}>
              <Box className={classes.infobox}>
                <div style={{ width: "70%" }}>
                  <Typography
                    style={{ fontSize: "2em" }}
                    variant="h4"
                  >{`${user?.firstName} ${user?.lastName}`}</Typography>
                  <Typography
                    style={{ marginBottom: "0.6rem" }}
                    variant="body1"
                  >
                    @{`${user?.firstName.toLowerCase()}`}_
                    {`${user?.lastName.toLowerCase()}`}
                  </Typography>
                  <Typography style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                    {`${user?.headline ? `${user.headline}` : ""}`}
                  </Typography>
                  {user?.website ? (
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        className={classes.link}
                        href={user?.website}
                        target="_blank"
                      >{` ${user?.website}`}</Link>
                    </Typography>
                  ) : (
                    ""
                  )}
                  {user?.createdAt ? (
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1.2em",
                        marginBottom: "0.6em",
                        fontWeight: 600,
                      }}
                    >
                      <DateRangeIcon color="primary" /> Joined on{" "}
                      {formatDate(user?.createdAt)}
                    </Typography>
                  ) : (
                    ""
                  )}
                  {user?.state && user?.country ? (
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "1.2em",
                      }}
                    >
                      <LocationOnIcon color="primary" />{" "}
                      {` ${
                        user?.state
                          ? `${user?.state}, ${
                              user?.country ? user.country : ""
                            }`
                          : ""
                      }`}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.2em",
                    }}
                  >
                    {user?.friendship ? (
                      <Button
                        type="button"
                        className={classes.connectButton}
                        size="medium"
                        variant="text"
                        style={{ marginTop: "0.5em" }}
                      >
                        Message
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className={classes.connectButton}
                        size="medium"
                        variant="text"
                        disabled={
                          loading ||
                          connectButtonState.disabled ||
                          user?.requeststatus == "pending"
                        }
                        style={{ marginTop: "0.5em" }}
                        onClick={sendRequest}
                      >
                        {loading ? "Sending..." : connectButtonState.text}
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  className={classes.connectButton}
                  size="medium"
                  variant="text"
                >
                  Block
                </Button>
              </Box>
            </Box>
            {user?.bio ? (
              <Box
                style={{
                  marginBottom: "1rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1rem",
                  background: "white",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                }}
              >
                <Typography variant="h4">About</Typography>
                <Typography
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  {`${user?.bio}`}
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </div>
      </Container>
    </Community>
  );
};

export async function getServerSideProps({ params, req }) {
  const apolloClient = initializeApollo();
  const cookies = cookie.parse(req.headers.cookie);
  const { data } = await apolloClient.query({
    query: GET_USER_BY_NAME,
    variables: { username: params.username, token: cookies.token },
  });

  return addApolloState(apolloClient, {
    props: {
      user: data.getUserByName,
    },
  });
}

export default User;
