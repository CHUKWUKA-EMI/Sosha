/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@material-ui/core/Box";
import Popper from "@material-ui/core/Popper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: "1em",
    //box shadow
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: "1em",
  },
}));

export default function DropDown({ anchorEl, id, open, user }) {
  const classes = useStyles();
  return (
    <Paper elevation={6} className={classes.root}>
      <Popper
        style={{
          backgroundColor: "inherit",
          marginTop: "0.5em",
          paddingBottom: "1em",
          borderRadius: "1em",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: "0.5em",
            }}
          >
            <Avatar
              style={{ width: "5em", height: "5em" }}
              alt={user?.firstName}
              src={user?.imgUrl}
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.5em",
              }}
            >
              <Typography
                style={{ fontSize: "1.5em", fontWeight: "bold" }}
                variant="body1"
              >{`${user?.firstName} ${user?.lastName}`}</Typography>
              <Typography
                style={{ fontSize: "1em", fontWeight: 500 }}
                variant="body1"
              >
                {user?.headline}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link href="/profile">
              <Button
                style={{
                  marginTop: "1em",
                  color: "white",
                  borderRadius: "1em",
                  textTransform: "none",
                  width: "80%",
                }}
                variant="contained"
                size="medium"
                color="primary"
              >
                View Profile
              </Button>
            </Link>
            <Button
              style={{
                marginTop: "1em",
                color: "white",
                borderRadius: "1em",
                width: "80%",
                textTransform: "none",
              }}
              variant="contained"
              color="primary"
              size="medium"
            >
              Sign Out
            </Button>
            {user?.user_role === "admin" && (
              <Button
                style={{
                  marginTop: "1em",
                  color: "white",
                  borderRadius: "1em",
                  textTransform: "none",
                  width: "80%",
                }}
                variant="contained"
                color="primary"
                size="medium"
              >
                Admin Dashboard
              </Button>
            )}
          </Box>
        </Box>
      </Popper>
    </Paper>
  );
}
