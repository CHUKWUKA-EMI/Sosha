import React, { useState, useEffect } from "react";
import {
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Hidden,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu, Home, People } from "@material-ui/icons";
import Cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "fixed",
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
    // "@media screen and (max-width: 760px)": {
    // 	justifyContent: "space-between",
    // },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
    },
    fontFamily: "Source Sans Pro, sans-serif !important",
    alignItems: "center",
    background: "#fff",
    padding: "0.3em 0",
  },
  navbutton: {
    textTransform: "capitalize",
    fontSize: "1.10em",
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
  loginbutton: {
    background: "blue",
    color: "white",
    border: "1px solid #32506D",
    fontWeight: "bold",
    marginRight: "0.5em",
  },
  signupbutton: {
    background: "#32506D",
    fontWeight: "bold",
    color: "#ffff",
    marginRight: "0.5em",
    "&:hover": {
      background: "#ffff",
      color: "#32506D",
    },
  },
  list: {
    width: 250,
  },
  hamburger: {
    color: "#32506D",
    borderRadius: "5px",
    border: 0,
    padding: "0.1em 0.4em",
    marginRight: 0,
    "@media screen and (max-width: 760px)": {
      marginRight: "1em",
    },
  },
  drawer: {
    background: "#32506D",
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "2rem",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [state, setState] = useState({ right: false });
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // const authData = JSON.parse(localStorage.getItem("authData"));
    // if (authData) {
    // 	setAuth(authData);
    // }
    if (Cookie.get("sosha_token")) {
      setAuth(Cookie.get("sosha_token"));
    }
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: <Home style={{ color: "#32506D" }} />,
    },
    {
      name: "My Community",
      href: auth !== null ? "/feeds" : "/login",
      icon: <People style={{ color: "#32506D" }} />,
    },
  ];

  const SideNav = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        style={{
          background: "#32506D",
          paddingLeft: "1.5em",
          paddingRight: "1.5em",
        }}
      >
        {navLinks.map((nav, index) => (
          <ListItem
            style={{
              background: "#fff",
              color: "primary",
              fontWeight: "bold",
              marginTop: "1.5em",
              borderRadius: "0.5em",
            }}
            button
            key={index}
          >
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{
                    color: "primary",
                    fontWeight: "bold",
                    fontSize: "16px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {nav.name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.logo} style={{ marginLeft: "1em" }}>
        <a
          style={{
            cursor: "pointer",
            textDecoration: "none",
          }}
          href="/"
        >
          <img
            height="40"
            src="https://ik.imagekit.io/chukwuka1991/Component_4ZAw9YtQAa.png?updatedAt=1635083451062"
            alt="Logo"
          />
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Hidden xsDown>
          {navLinks.map((nav, index) => (
            <Button href={nav.href} className={classes.navbutton} key={index}>
              {nav.name}
            </Button>
          ))}
        </Hidden>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "1rem",
          }}
        >
          <Hidden xsDown>
            {auth != null ? (
              <Button
                disableElevation
                variant="contained"
                size="small"
                onClick={() => {
                  Cookie.remove("sosha_token");
                  setAuth(null);
                }}
                className={classes.signupbutton}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  href="/login"
                  variant="contained"
                  disableElevation
                  size="small"
                  style={{ background: "#ffff", color: "#32506D" }}
                  className={classes.loginbutton}
                >
                  Login
                </Button>
                <Button
                  href="/signup"
                  disableElevation
                  variant="contained"
                  size="small"
                  className={classes.signupbutton}
                >
                  Sign up
                </Button>
              </>
            )}
          </Hidden>
          <Hidden smUp>
            <IconButton
              className={classes.hamburger}
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer("right", true)}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <SwipeableDrawer
            classes={{
              paper: classes.drawer,
            }}
            anchor="right"
            open={state.right}
            style={{ width: "80%" }}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {SideNav("right")}
            <div style={{ marginTop: "5rem" }}>
              <Button
                href="/signup"
                style={{
                  background: "#ffff",
                  color: "#293d3d",
                  width: "80%",
                  fontWeight: "bold",
                  marginLeft: "10%",
                }}
                variant="outlined"
                size="large"
              >
                Sign up
              </Button>
              <p
                style={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 500,
                  marginLeft: "10%",
                }}
              >
                Already have an account?{" "}
                <a
                  style={{
                    textDecoration: "underline",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  href="/login"
                >
                  Log in
                </a>
              </p>
            </div>
          </SwipeableDrawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
