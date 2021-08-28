import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONNECTED_FRIENDS } from "../Apollo/queries";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { selectUser, setConnectedFriends } from "../redux/chatsReducer";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    fontWeight: "bold",
  },
  userProfilelink: {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function Connections() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const connectedFriends = useSelector((state) => state.chats.connectedFriends);
  const selected = useSelector((state) => state.chats.selectedUser);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const { loading, error, data } = useQuery(GET_CONNECTED_FRIENDS, {
    onError: () => {
      console.log(error);
    },
    onCompleted: () => {
      dispatch(setConnectedFriends(data.connectedFriends));
    },
  });

  useEffect(() => {
    setSelectedUser(selected);
  }, [selected]);

  const handleUserSelect = (friend) => {
    dispatch(selectUser(friend));
  };

  return (
    <List className={classes.root}>
      {!loading ? (
        connectedFriends &&
        connectedFriends.length > 0 &&
        connectedFriends.map((friend, index) => (
          <React.Fragment key={index}>
            <ListItem
              onClick={() => handleUserSelect(friend)}
              alignItems="flex-start"
              button
              style={{
                backgroundColor:
                  friend.userId === selectedUser?.userId ? "lightgrey" : "",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={friend.firstName + " " + friend.lastName}
                  src={friend.imgUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.name}
                      color="primary"
                    >
                      {`${friend.firstName} ${friend.lastName}`}
                    </Typography>
                    <Typography variant="body2">
                      {friend.lastMessage
                        ? friend.lastMessage.length >= 15
                          ? friend.lastMessage.slice(0, 15) + "..."
                          : friend.lastMessage
                        : "connected!"}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </React.Fragment>
        ))
      ) : (
        <Box display="flex" alignItems="center">
          <Box margin={1}>
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
          </Box>
          <Box width="100%">
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
            <Skeleton width="50%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
        </Box>
      )}
    </List>
  );
}
