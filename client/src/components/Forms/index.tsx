import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme, Typography } from "@material-ui/core";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import BackButton from "../Buttons/BackButton";
import { useEffect } from "react";
import { isLogin } from "../../utils/isLogin";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: "60vw",
      background: "var(--nav-bg)",
      [theme.breakpoints.down("sm")]: {
        width: "90vw",
      },
      color: "black",
    },
    title: {
      margin: "3vh",
      fontWeight: "bold",
      fontSize: "1.4rem",
    },
    flexbox: {
      paddingLeft: "2vh",
      display: "flex",
      alignItems: "center",
    },
    or: {
      margin: "2vh",
    },
    icon: {
      color: "black",
    },
  })
);

const RegistrationForm: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await isLogin();
      if (res) {
        setPage(1);
        setIsUpdate(true);
      }
    })();
  }, []);
  const heading = ["Login", "Sign Up", "Reset Password"];
  const component = [
    <Login key={1} setPage={setPage} />,
    <Signup key={2} setPage={setPage} />,
    <ResetPassword key={3} setPage={setPage} />,
  ];

  return (
    <div className={classes.main}>
      <div className={classes.flexbox}>
        <BackButton className={classes.icon} />
        <Typography className={classes.title} align="center">
          {page == 1 && isUpdate ? "Update Profile" : heading[page]}
        </Typography>
      </div>
      {component[page]}
    </div>
  );
};

export default RegistrationForm;
