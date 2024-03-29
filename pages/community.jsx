/* eslint-disable react/prop-types */
import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  IconButton,
  Hidden,
  Avatar,
  Button,
} from "@material-ui/core";
import {
  Toc,
  Chat,
  Notifications,
  // Person,
  Home,
  Menu,
  People,
  ArrowDropDown,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CommunityNav from "../components/CommunityNav";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import DropDown from "../components/DropDown";

let drawerWidth = 25;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "#fff",
    width: `100%`,
  },
  menuButton: {
    backgroundColor: "#32506D",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor: "#fff",
    width: `${drawerWidth}%`,
    paddingLeft: "2%",
    paddingRight: "2%",
    [theme.breakpoints.only("md")]: {
      paddingLeft: "0.5%",
    },
    [theme.breakpoints.down("xs")]: {
      width: 250,
    },
  },
  content: {
    flexGrow: 1,
    background: "aliceblue",
    height: "100%",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100%",
  },
  avatarDiv: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "90%",
    marginRight: "5%",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "60%",
    },
  },
  avatar: {
    height: "2rem",
    width: "2rem",
  },
  active: {
    background: "#c2d6d6",
    color: "rgb(29, 161, 242)",
  },
  icons: {
    height: "1em",
    width: "1em",
    color: "#32506D",
  },
  navbutton: {
    textTransform: "capitalize",
    fontSize: "1.10em",
    fontWeight: 800,
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
    "& .MuiButton-label": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

function Community(props) {
  const classes = useStyles();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: <Home className={classes.icons} />,
    },
    {
      title: "Feeds",
      href: "/feeds",
      icon: <Toc className={classes.icons} />,
    },
    {
      title: "My Network",
      href: "/network",
      icon: <People className={classes.icons} />,
    },
    // {
    // 	title: "Explore",
    // 	href: "/explore",
    // 	icon: <Explore className={classes.icons} />,
    // },
    {
      title: "Messaging",
      href: "/messaging",
      icon: <Chat className={classes.icons} />,
    },
    {
      title: "Notifications",
      href: "/notification",
      icon: <Notifications className={classes.icons} />,
    },
    // {
    //   title: "Profile",
    //   href: "/profile",
    //   icon: <Person className={classes.icons} />,
    // },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (!Cookie.get("sosha_token")) {
      window.location.href = "/login";
    }
    const user = JSON.parse(localStorage.getItem("sosha_user"));
    setUser(user);
  }, []);

  // const handleLogout = () => {
  //   Cookie.remove("signedin");
  //   window.location.href = "/login";
  // };
  return (
    <div className={classes.root}>
      <AppBar elevation={1} position="fixed" className={classes.appBar}>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          >
            <Menu style={{ color: "#fff" }} />
          </IconButton>
          <div></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Hidden xsDown>
              {navItems.map((nav, index) => (
                <Link href={nav.href} key={index}>
                  <Button
                    className={classes.navbutton}
                    style={{
                      color:
                        router.pathname === nav.href ? "rgb(29, 161, 242)" : "",
                      fontWeight: router.pathname === nav.href ? 900 : "",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    // startIcon={nav.icon}
                  >
                    {nav.icon}
                    {nav.title}
                  </Button>
                </Link>
              ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-describedby={id}
                onClick={handleClick}
              >
                <Avatar style={{ fontSize: "0.5em" }} src={user?.imgUrl} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ color: "#32506D", fontWeight: "bold" }}>Me</div>
                  <ArrowDropDown style={{ fontSize: "2em" }} color="primary" />
                </div>
              </div>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <DropDown anchorEl={anchorEl} user={user} open={open} id={id} />
      <nav aria-label="community nav">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div
              style={{
                marginLeft: "3rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Avatar
                src={user ? user?.imgUrl : ""}
                style={{ height: "6rem", width: "6rem" }}
              />
            </div>
            <Divider />
            {<CommunityNav />}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>

      <style global jsx>
        {`
          body,
          a,
          label,
          span,
          p,
          h {
            font-family: "Source Sans Pro", sans-serif !important;
          }
        `}
      </style>
    </div>
  );
}

export default Community;
