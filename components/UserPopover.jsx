/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  userProfilelink: {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: "0.2em",
  },
}));

export default function UserPopover({
  //   anchorEl,
  top,
  left,
  handleClose,
  user,
  open,
}) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      //   anchorEl={anchorEl}
      anchorReference="anchorPosition"
      anchorPosition={{ top: top, left: left }}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disableRestoreFocus
    >
      <List>
        <ListItem button key={user.username}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <ListItemAvatar style={{ marginRight: "0.5em" }}>
              <Avatar
                style={{ width: "3em", height: "3em" }}
                alt={`${user.firstName} ${user.lastName}`}
                src={user?.imgUrl}
              />
            </ListItemAvatar>
            <Box
              style={{ width: "100%" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <ListItemText
                style={{ fontWeight: "bold" }}
                color="primary"
                primary={
                  <Box>
                    <Link href={`/${user.username}`}>
                      <a className={classes.userProfilelink}>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.block}
                          color="primary"
                          style={{ fontWeight: "bold" }}
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </Typography>
                      </a>
                    </Link>
                    <Typography variant="body2">
                      {user.headline ? user.headline : ""}
                    </Typography>
                  </Box>
                }
              />

              <Button
                color="primary"
                onClick={() => router.push(`/${user.username}`)}
                size="small"
                variant="contained"
              >
                View Profile
              </Button>
            </Box>
          </Box>
        </ListItem>
      </List>
    </Popover>
  );
}
