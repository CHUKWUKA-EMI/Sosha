/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  InputBase,
  InputAdornment,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import Connections from "./Connections";
import ChatBox from "./ChatBox";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setChats, addChat } from "../redux/chatsReducer";
import { GET_CHATS, NEW_MESSAGE } from "../Apollo/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  headerMessage: {
    padding: "0.3em",
  },
  friendsDiv: {
    // paddingLeft: "1em",
    // paddingRight: "1em",
    backgroundColor: "white",
    height: "100%",
    borderRight: "1px solid #e0e0e0",
    overflowY: "scroll",
    scrollbarWidth: "none" /* Firefox */,
    "&::-webkit-scrollbar": {
      display: "none",
    } /* Chrome */,
  },
  container: {
    height: "80vh",
    width: "100%",
  },
  chatArea: {
    height: "100%",
    overflowY: "auto",
    width: "100%",
  },
  appbar: {
    height: "4em",
  },
  textfield: {
    height: "3rem",
    width: "100%",
    border: "2px solid #32506D",
    paddingLeft: "5px",
    paddingRight: "0.5em",
  },
}));

const Messaging = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const selectedUser = useSelector((state) => state.chats.selectedUser);

  const [getChats, { data, loading, error }] = useLazyQuery(GET_CHATS, {
    onError: () => {
      console.log("error", error);
    },
    onCompleted: () => {
      console.log("data", data);
      dispatch(setChats(data.chats));
    },
  });

  const { data: newMessageData, error: newMessageError } = useSubscription(
    NEW_MESSAGE,
    {
      variables: { friendshipId: selectedUser?.friend.id },
    }
  );

  useEffect(() => {
    if (newMessageError) console.log("newMessageError", newMessageError);
    if (newMessageData && selectedUser) {
      console.log("newMessageData", newMessageData);
      dispatch(addChat(newMessageData.newChat));
    }
  }, [newMessageError, newMessageData]);

  useEffect(() => {
    if (selectedUser !== null) {
      getChats({ variables: { friendshipId: selectedUser?.friend.id } });
    }
  }, [selectedUser]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = cookies.get("token");
    if (!token) {
      router.push("/login?previousPage=/messaging");
    }
    setUser(localUser);
  }, []);

  return (
    <div className={classes.root}>
      <Grid style={{ width: "100%", minWidth: "100%" }} container>
        <Grid item xs={12} className={classes.headerMessage}>
          <Typography color="primary" variant="h5">
            Chats
          </Typography>
        </Grid>
      </Grid>
      <Grid component={Paper} className={classes.container} container>
        <Grid className={classes.friendsDiv} item xs={12} sm={3}>
          <List>
            <ListItem button key={user?.id}>
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src={user?.imgUrl} />
              </ListItemIcon>
              <ListItemText
                style={{ fontWeight: "bold" }}
                color="primary"
                // primary={`${user?.firstName} ${user?.lastName}`}
              >
                <Typography
                  style={{ fontWeight: 600 }}
                  color="primary"
                  variant="body2"
                >{`${user?.firstName} ${user?.lastName}`}</Typography>
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <InputBase
              className={classes.textfield}
              id="input-with-icon-textfield"
              placeholder="Search for friends"
              style={{ borderRadius: "2rem" }}
              startAdornment={
                <InputAdornment>
                  <Search
                    color="primary"
                    style={{ height: "1em", width: "1em" }}
                  />
                </InputAdornment>
              }
            />
          </Grid>
          <Divider />
          <Connections />
        </Grid>
        <Grid className={classes.chatArea} item sm={9}>
          <ChatBox />
        </Grid>
      </Grid>
    </div>
  );
};

export default Messaging;
