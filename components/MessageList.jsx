/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box } from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  messageList: {
    width: "100%",
    height: "72%",
    overflowY: "auto",
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingLeft: "2em",
    paddingRight: "2em",
    scrollbarWidth: "none" /* Firefox */,
    "&::-webkit-scrollbar": {
      display: "none",
    } /* Chrome */,
  },
  messageRight: {
    height: "fit-content",
    width: "40%",
    padding: "0.5em",
    borderBottomRightRadius: "1em",
    borderBottomLeftRadius: "0.5em",
    borderTopLeftRadius: "0.5em",
    backgroundColor: "rgb(29, 161, 242)",
    color: "white",
    fontWeight: 700,
  },
  messageLeft: {
    height: "fit-content",
    width: "40%",
    padding: "0.5em",
    borderBottomRightRadius: "0.5em",
    borderBottomLeftRadius: "1em",
    borderTopRightRadius: "0.5em",
    backgroundColor: "lightgrey",
    color: "black",
    fontWeight: 700,
  },
}));

export default function MessageList() {
  const classes = useStyles();
  const messages = useSelector((state) => state.chats.chats);

  const [user, setUser] = useState({});

  const scrollToBottom = () => {
    const box = document.getElementById("box");
    box.scrollIntoView({ behavior: "smooth" });
    // box.scrollTo(0, box.scrollHeight);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    console.log("messagesRef", document.getElementById("box"));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Grid container className={classes.messageList}>
      {messages &&
        messages.length > 0 &&
        messages.map((message, i) => (
          <Grid
            key={i}
            style={{ display: "flex", flexDirection: "column" }}
            item
            xs={12}
          >
            <Box
              alignSelf={
                message.senderId === user.id ? "flex-end" : "flex-start"
              }
              className={
                message.senderId === user.id
                  ? classes.messageRight
                  : classes.messageLeft
              }
            >
              <Typography>{message.message}</Typography>
            </Box>
            <Box
              alignSelf={
                message.senderId === user.id ? "flex-end" : "flex-start"
              }
            >
              <Typography
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "darkslategrey",
                  marginRight: message.senderId === user.id ? "3em" : "",
                  marginLeft: message.senderId === user.id ? "" : "3em",
                }}
                variant="body1"
                component="span"
              >
                {moment(message.createdAt).format("MMM DD, YYYY hh:mm")}
              </Typography>
            </Box>
          </Grid>
        ))}
      <span id="box"></span>
    </Grid>
  );
}
