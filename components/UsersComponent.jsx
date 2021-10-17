import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS, ADD_TO_CONNECTIONS } from "../Apollo/queries";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/usersReducer";
import { selectUser } from "../redux/chatsReducer";
import { MailOutline } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    paddingTop: "4rem",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "5rem",
  },
  info: {
    display: "flex",
    marginTop: "1em",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiAvatar-root": {
      width: "9em",
      height: "9em",
    },
  },
  userBox: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e0e0e0",
    marginTop: "1em",
    borderRadius: "1em",
    backgroundColor: "white",
  },
  connectButton: {
    border: "none",
    outline: "none",
    borderRadius: "1em",
    fontWeight: 600,
    textTransform: "none",
    color: "white",
    fontSize: "15px",
    backgroundColor: "rgb(29, 161, 242)",
    "&:hover": {
      backgroundColor: "rgb(29, 161, 242)",
    },
  },
  userProfilelink: {
    textDecoration: "none",
    cursor: "pointer",
  },
  imgUrl: {
    width: "9em",
    height: "9em",
  },
}));

export default function UsersComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const connectedFriends = useSelector((state) => state.chats.connectedFriends);
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  const [selectedUser, setSelectedUser] = React.useState({});
  const userRef = React.useRef(null);

  const { loading, data: usersData } = useQuery(GET_ALL_USERS, {
    onCompleted: () => {
      dispatch(getUsers(usersData.getAllUsers));
    },
  });

  const [addToChatConnections, { loading: sendFriendRequestLoading }] =
    useMutation(ADD_TO_CONNECTIONS, {
      onError: () => {
        setMessages({ failure: "Something went wrong. Please retry" });
        setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
      },
      onCompleted: () => {
        window.location.href = `/messaging`;
      },
    });

  const addToConnections = async (friendId) => {
    try {
      await addToChatConnections({ variables: { friendId } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirect = (friendId) => {
    const friend = connectedFriends?.find((fr) => fr.userId === friendId);
    if (friend) {
      dispatch(selectUser(friend));
      window.location.href = `/messaging`;
    } else {
      window.location.href = `/messaging`;
    }
  };

  return (
    <Grid container justify="space-evenly" spacing={6} className={classes.root}>
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
      {!loading ? (
        <>
          {users && users.length > 0 && (
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                  fontSize: "2em",
                  color: "darkslategray",
                  fontWeight: "bold",
                }}
              >
                People you may know
              </Typography>
            </Grid>
          )}
          {users &&
            users?.length > 0 &&
            users?.map((user) => (
              <Grid
                item
                xs={12}
                sm={5}
                md={3}
                className={classes.userBox}
                id={user.id}
                ref={userRef}
                key={user.id}
              >
                <Box className={classes.info}>
                  <Avatar src={user.imgUrl} />
                  <Box
                    style={{
                      marginLeft: "0.5em",
                      textAlign: "center",
                      marginTop: "0.5em",
                    }}
                  >
                    <Link href={`/${user.username}`}>
                      <a className={classes.userProfilelink}>
                        <Typography
                          draggable
                          style={{ fontWeight: 600 }}
                          color="primary"
                        >{`${user.firstName} ${user.lastName}`}</Typography>
                      </a>
                    </Link>
                    {user.headline ? (
                      <Typography style={{ fontSize: "12px" }}>
                        {user.headline}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                <Box
                  style={{
                    textAlign: "center",
                    width: "100%",
                    // marginTop: "0.5em",
                  }}
                >
                  <Button
                    type="button"
                    onClick={() => {
                      if (user.friendship) {
                        handleRedirect(user.id);
                      } else {
                        setSelectedUser(user);
                        addToConnections(user.id);
                      }
                    }}
                    style={{ marginTop: "0.5em" }}
                    className={classes.connectButton}
                    size="small"
                    fullWidth
                    variant="outlined"
                    disabled={
                      sendFriendRequestLoading && selectedUser.id === user.id
                    }
                    startIcon={<MailOutline fontSize="large" />}
                  >
                    {sendFriendRequestLoading && selectedUser.id === user.id
                      ? "Connecting..."
                      : "Message"}
                  </Button>
                </Box>
              </Grid>
            ))}
        </>
      ) : (
        ""
      )}
    </Grid>
  );
}
