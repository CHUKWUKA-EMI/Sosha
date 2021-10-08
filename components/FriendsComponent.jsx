/* eslint-disable react/prop-types */
import React from "react";
import { useMutation } from "@apollo/client";
import { ACCEPT_FRIEND_REQUEST } from "../Apollo/queries";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  info: {
    display: "flex",
    marginTop: "1em",
  },
  connectButton: {
    borderRadius: "0.5em",
    fontWeight: 600,
    textTransform: "none",
    color: "white",
    backgroundColor: "#32506D",
    height: "2em",
    marginBottom: "0.2em",
    fontSize: "15px",
    "&:hover": {
      color: "white",
      backgroundColor: "#32506D",
    },
  },
  userProfilelink: {
    textDecoration: "none",
    cursor: "pointer",
  },
}));

export default function FriendsComponent({ loading }) {
  const classes = useStyles();
  const friends = useSelector((state) => state.friends.friends);
  const [user, setUser] = React.useState({});
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  const [friendRequests, setFriendRequests] = React.useState([]);
  const [connectedFriends, setConnectedFriends] = React.useState([]);
  const [yourRequests, setYourRequests] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState({});

  // const { loading, data: friendsData } = useQuery(GET_FRIENDS, {
  //   onCompleted: () => {
  //     console.log("friends data", friendsData);
  //     dispatch(getFriends(friendsData.friends));
  //   },
  // });

  React.useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("sosha_user"));
    setUser(localUser);
  }, []);

  React.useEffect(() => {
    const friendReqs = [];
    const yourReqs = [];
    const connections = [];
    console.log("friends", friends);

    friends?.map((friend) => {
      if (
        friend.friend.requesterId !== user.id &&
        friend.friend.requeststatus === "pending" &&
        friend.friend.friendship === false
      ) {
        friendReqs.push(friend);
      } else if (
        friend.friend.requesterId === user.id &&
        friend.friend.requeststatus === "pending" &&
        friend.friend.friendship === false
      ) {
        yourReqs.push(friend);
      } else if (
        //   friend.friend.requeststatus === "accepted" &&
        friend.friend.friendship === true
      ) {
        connections.push(friend);
      }
    });
    setFriendRequests(friendReqs);
    setConnectedFriends(connections);
    setYourRequests(yourReqs);
  }, [friends]);

  const [acceptFriendRequest, { loading: acceptFriendRequestLoading }] =
    useMutation(ACCEPT_FRIEND_REQUEST, {
      onError: () => {
        setMessages({ failure: "Something went wrong" });
        setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
      },
      onCompleted: () => {
        setMessages({ success: "Friend request accepted!" });
        const remainingReqs = friendRequests.filter(
          (f) => f.id !== selectedUser.id
        );
        setFriendRequests(remainingReqs);
        setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
        window.location.href = `/${selectedUser.username}`;
      },
    });

  const acceptRequest = async (requesterId) => {
    try {
      await acceptFriendRequest({ variables: { requesterId } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.root}>
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
          {friendRequests.length > 0 && (
            <Typography
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              Friend requests
            </Typography>
          )}
          {friendRequests &&
            friendRequests?.length > 0 &&
            friendRequests?.map((user, i) => (
              <div key={i}>
                <Box className={classes.info}>
                  <Avatar src={user.imgUrl} />
                  <Box style={{ marginLeft: "0.5em" }}>
                    <Link shallow href={`/${user.username}`}>
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
                    onClick={(e) => {
                      setSelectedUser(user);
                      e.stopPropagation();
                      acceptRequest(user.friend.requesterId);
                    }}
                    className={classes.connectButton}
                    size="medium"
                    variant="text"
                    disabled={
                      acceptFriendRequestLoading && selectedUser.id === user.id
                    }
                  >
                    {acceptFriendRequestLoading && selectedUser.id === user.id
                      ? "---"
                      : "Accept"}
                  </Button>
                </Box>
              </div>
            ))}
          <Divider />
          {connectedFriends.length > 0 ||
            (yourRequests.length > 0 && (
              <Typography
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "black",
                }}
              >
                Friends
              </Typography>
            ))}
          {yourRequests.length > 0 &&
            yourRequests.map((user, i) => (
              <div key={i}>
                <Box className={classes.info}>
                  <Avatar src={user.imgUrl} />
                  <Box style={{ marginLeft: "0.5em" }}>
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
                  <Typography
                    style={{
                      background: "blueviolet",
                      color: "white",
                      paddingLeft: "0.5em",
                      paddingRight: "0.5em",
                      marginRight: "auto",
                      marginLeft: "auto",
                      width: "fit-content",
                      borderRadius: "0.5em",
                      fontSize: "13px",
                    }}
                    variant="body1"
                  >
                    Pending
                  </Typography>
                </Box>
              </div>
            ))}
          {connectedFriends.length > 0 &&
            connectedFriends.map((user, i) => (
              <div key={i}>
                <Box className={classes.info}>
                  <Avatar src={user.imgUrl} />
                  <Box style={{ marginLeft: "0.5em" }}>
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
                    className={classes.connectButton}
                    size="medium"
                    variant="text"
                  >
                    Message
                  </Button>
                </Box>
              </div>
            ))}
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
