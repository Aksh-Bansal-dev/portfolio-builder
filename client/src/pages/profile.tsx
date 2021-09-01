import type { NextPage } from "next";
import NavBar from "../components/Navbar";
import { makeStyles, createStyles, Button } from "@material-ui/core";
import { server } from "../global/server";
import { useState } from "react";
import { useEffect } from "react";
import { getWebsiteName } from "../utils/getWebsiteName";
import { useRouter } from "next/router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
      flexDirection: "column",
    },
    btn: {
      marginTop: "5vh",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    link: {
      color: "blue",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

const Profile: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [websiteName, setWebsiteName] = useState("");
  useEffect(() => {
    (async () => {
      const res = await getWebsiteName();
      if (res.done) {
        setWebsiteName(res.data?.website_name ? res.data.website_name : "");
      } else {
        router.push("/login");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    router.push("/login");
  };
  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <div>
          <strong>Your portfolio website: &emsp;</strong>
          <a
            target="_blank"
            rel="noreferrer"
            className={classes.link}
            href={server + "/web/" + websiteName}
          >
            {server + "/web/" + websiteName}
          </a>
        </div>
        <div>
          <Button
            onClick={handleClick}
            className={classes.btn}
            variant="outlined"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
