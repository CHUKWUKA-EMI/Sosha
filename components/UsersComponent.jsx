import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS, SEND_FRIEND_REQUEST } from "../Apollo/queries";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, connectwithFriend } from "../redux/usersReducer";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  info: {
    display: "flex",
    marginTop: "1em",
  },
  connectButton: {
    border: "2px solid darkgrey",
    borderRadius: "1em",
    fontWeight: 600,
    textTransform: "none",
    color: "darkgrey",
    fontSize: "15px",
  },
  userProfilelink: {
    textDecoration: "none",
    cursor: "pointer",
  },
}));

export default function UsersComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [messages, setMessages] = React.useState({ success: "", failure: "" });
  // const [data, setData] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState({});
  const userRef = React.useRef(null);

  const { loading, data: usersData } = useQuery(GET_ALL_USERS, {
    onCompleted: () => {
      // setData(usersData);
      console.log("usersData", usersData);
      dispatch(getUsers(usersData.getAllUsers));
    },
  });

  const [sendFriendRequest, { loading: sendFriendRequestLoading }] =
    useMutation(SEND_FRIEND_REQUEST, {
      onError: () => {
        setMessages({ failure: "Something went wrong" });
        setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
      },
      onCompleted: () => {
        setMessages({ success: "Friend request sent!" });
        dispatch(connectwithFriend(selectedUser.id));
        setTimeout(() => setMessages({ success: "", failure: "" }), 3000);
      },
    });
  const sendRequest = async (friendId) => {
    try {
      await sendFriendRequest({ variables: { friendId } });
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
          {users && users.length > 0 && (
            <Typography
              style={{ fontWeight: 600, textAlign: "center", color: "black" }}
            >
              People you can connect with
            </Typography>
          )}
          {users &&
            users?.length > 0 &&
            users?.map((user) => (
              <div id={user.id} ref={userRef} key={user.id}>
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
                    onClick={(e) => {
                      setSelectedUser(user);
                      e.stopPropagation();
                      sendRequest(user.id);
                    }}
                    className={classes.connectButton}
                    size="small"
                    variant="outlined"
                    disabled={
                      sendFriendRequestLoading && selectedUser.id === user.id
                    }
                    startIcon={<AddIcon fontSize="large" />}
                  >
                    {sendFriendRequestLoading && selectedUser.id === user.id
                      ? "Connecting..."
                      : "Connect"}
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
