import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Typography,
  ListItemText,
  Grid,
  TextareaAutosize,
  Fab,
  Divider,
  AppBar,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CREATE_CHAT } from "../Apollo/queries";
import MessageList from "./MessageList";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  messageInput: {
    outline: "none",
    width: "95%",
    padding: "1.5em 1.5em",
    borderRadius: "30px",
    resize: "none",
    marginRight: "1em",
    lineHeight: "2em",
    // "&::-webkit-scrollbar": {
    //   width: "0.3em",
    // },
  },
  appbar: {
    height: "4em",
    backgorundColor: "white",
  },
  userProfilelink: {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
      color: "#32506D",
    },
  },
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function ChatBox() {
  const classes = useStyles();
  const selectedUser = useSelector((state) => state.chats.selectedUser);
  const [chatMessage, setChatMessage] = useState("");

  const [createChat] = useMutation(CREATE_CHAT, {
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleChatMessage = async () => {
    if (selectedUser === null || chatMessage.trim().length === 0) {
      return;
    }
    setChatMessage("");
    await createChat({
      variables: {
        receiverId: selectedUser.userId,
        friendshipId: selectedUser.friend.id,
        receiverName: `${selectedUser.firstName} ${selectedUser.lastName}`,
        message: chatMessage,
      },
    });
  };

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  }

  const SelectedUserComponent = () => (
    <List>
      <ListItem key={selectedUser?.userId}>
        <ListItemIcon>
          <Avatar
            alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
            src={selectedUser?.imgUrl}
          />
        </ListItemIcon>

        <Link href={`/${selectedUser?.username}`}>
          <a className={classes.userProfilelink}>
            <BootstrapTooltip
              title={`Open ${selectedUser?.firstName} ${selectedUser?.lastName}'s profile`}
            >
              <ListItemText className={classes.userProfilelink}>
                <Typography
                  style={{ fontWeight: "bold", fontSize: "17px" }}
                  variant="body2"
                >
                  {`${selectedUser?.firstName} ${selectedUser?.lastName}`}{" "}
                  <Typography
                    variant="body2"
                    component="span"
                    style={{ fontWeight: 600, fontSize: "13px" }}
                  >
                    {selectedUser?.headline
                      ? "(" + selectedUser?.headline + ")"
                      : ""}
                  </Typography>
                </Typography>
              </ListItemText>
            </BootstrapTooltip>
          </a>
        </Link>
      </ListItem>
    </List>
  );

  return (
    <Grid className={classes.root}>
      <AppBar
        style={{ backgroundColor: "white" }}
        className={classes.appbar}
        elevation={1}
        position="static"
      >
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{selectedUser ? <SelectedUserComponent /> : ""}</div>
          <div>
            <WhatsAppIcon color="primary" />
          </div>
        </Toolbar>
      </AppBar>
      <MessageList />
      <Divider />
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleChatMessage();
        }}
      >
        <Grid container style={{ padding: "10px", background: "#f2f2f2" }}>
          <Grid item xs={10}>
            <TextareaAutosize
              autoComplete="true"
              rowsMax={1}
              rowsMin={1}
              className={classes.messageInput}
              placeholder="Type a message . . ."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  e.preventDefault();
                  handleChatMessage();
                }
              }}
            />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab type="submit" color="primary" aria-label="add">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
