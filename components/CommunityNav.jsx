import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  Toc,
  //   Explore,
  Chat,
  Notifications,
  Person,
  Home,
  People,
} from "@material-ui/icons";
import Link from "../src/Link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  nav: {
    marginTop: "2em",
  },
  navitem: {
    background: "#fff",
    color: "#32506D",
    marginBottom: "2em",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1em",
    },
    borderRadius: "1em",
    width: "80%",
    "&:hover": {
      background: "#c2d6d6",
      color: "rgb(29, 161, 242)",
    },
  },
  navtext: {
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
  active: {
    background: "#c2d6d6",
    color: "rgb(29, 161, 242)",
  },
  icons: {
    height: "1.2em",
    width: "1.2em",
    color: "#32506D",
  },
}));

const CommunityNav = () => {
  const classes = useStyles();
  const router = useRouter();
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
    {
      title: "Profile",
      href: "/profile",
      icon: <Person className={classes.icons} />,
    },
  ];
  return (
    <List className={classes.nav}>
      {navItems.map((nav, index) => (
        <Link activeClassName={classes.active} key={index} href={nav.href}>
          <ListItem
            style={{
              background: router.pathname === nav.href ? "#c2d6d6" : "",
              color: router.pathname === nav.href ? "rgb(29, 161, 242)" : "",
            }}
            className={classes.navitem}
            button
          >
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText
              className={classes.navtext}
              primary={
                <Typography
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {nav.title}
                </Typography>
              }
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default CommunityNav;
