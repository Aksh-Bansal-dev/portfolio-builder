import type { NextPage } from "next";
import Link from "next/link";
import {
  AppBar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { logout } from "../../utils/logout";
import React from "react";
import { linklist } from "./linklist";
import { useEffect } from "react";
import { isLogin } from "../../utils/isLogin";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bg: {
      background: "var(--primary-bg)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    flexbox: {
      display: "none",
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
      marginLeft: "40vh",
      [theme.breakpoints.up("xl")]: {
        marginLeft: "60vh",
      },
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    menuButton: {
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
      color: "var(--primary-text)",
      marginRight: theme.spacing(2),
    },
    title: {
      [theme.breakpoints.up("lg")]: {
        width: "12vw",
      },
      fontWeight: "bold",
      fontSize: "1.3rem",
      fontFamily: "serif",
      color: "var(--primary-text)",
    },
    other: {
      color: "var(--primary-text)",
      paddingLeft: "10vh",
    },
    drawerList: {
      width: 300,
      background: "var(--mob-nav)",
      height: "100vh",
      color: "var(--primary-text)",
    },
    pseudolink: {
      cursor: "pointer",
    },
  })
);

const NavBar: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [drawerOpen, setdrawerOpen] = React.useState(false);
  const [validToken, setValidToken] = React.useState(false);

  useEffect(() => {
    (async () => {
      const res = await isLogin();
      if (res === true) {
        setValidToken(true);
      }
      return res;
    })();
  }, []);

  const toggleDrawer = () => {
    setdrawerOpen(!drawerOpen);
    return undefined;
  };

  const handleLogout = async (url: string) => {
    if (url === "/logout") {
      logout();
      router.push("/");
    } else {
      router.push(url);
    }
  };

  const drawerList = () => (
    <div
      className={classes.drawerList}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        {linklist.map((e, key) => {
          if (e.loginReq) {
            if (validToken)
              return (
                <div
                  className={classes.pseudolink}
                  onClick={async () => handleLogout(e.url)}
                  key={key}
                >
                  <ListItem button>
                    <Typography className={classes.other}>{e.name}</Typography>
                  </ListItem>
                </div>
              );
            else return null;
          } else {
            if (!validToken)
              return (
                <Link href={e.url} key={key}>
                  <a>
                    <ListItem button>
                      <Typography className={classes.other}>
                        {e.name}
                      </Typography>
                    </ListItem>
                  </a>
                </Link>
              );
            else return null;
          }
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.bg} position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <a>
              <Typography className={classes.title} align="center">
                Portfolio Builder
              </Typography>
            </a>
          </Link>
          <div className={classes.flexbox}>
            {linklist.map((e, key) => {
              if (e.loginReq) {
                if (validToken) {
                  return (
                    <div
                      onClick={async () => await handleLogout(e.url)}
                      className={classes.pseudolink}
                      key={key}
                    >
                      <Typography className={classes.other}>
                        {e.name}
                      </Typography>
                    </div>
                  );
                } else {
                  return null;
                }
              } else {
                if (!validToken) {
                  return (
                    <Link href={e.url} key={key}>
                      <a>
                        <Typography className={classes.other}>
                          {e.name}
                        </Typography>
                      </a>
                    </Link>
                  );
                } else {
                  return null;
                }
              }
            })}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer}>
        {drawerList()}
      </Drawer>
    </div>
  );
};

export default NavBar;
