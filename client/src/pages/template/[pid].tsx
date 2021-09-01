import { Button, makeStyles, createStyles } from "@material-ui/core";
import type { NextPage } from "next";
import NavBar from "../../components/Navbar";
import { useRouter } from "next/router";
import { server } from "../../global/server";
import { useEffect } from "react";
import { isLogin } from "../../utils/isLogin";
import { linkTemplateToUser } from "../../utils/linkTemplateToUser";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "90vh",
    },
    frame: {
      marginTop: "4vh",
      width: "99%",
      height: "75vh",
      border: "2px solid #8c7566",
    },
    btn: {
      marginTop: "5vh",
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
  })
);

const TemplatePage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await isLogin();
      if (!res) {
        router.push("/login");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleThis = async () => {
    const res = await linkTemplateToUser(router.query.pid as string);
    if (res.done) {
      router.push("/profile");
    }
  };

  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <iframe
          className={classes.frame}
          src={`${server}/web/template/${router.query.pid}`}
        ></iframe>
        <Button onClick={handleThis} className={classes.btn} variant="outlined">
          Use This Template
        </Button>
      </div>
    </div>
  );
};

export default TemplatePage;
