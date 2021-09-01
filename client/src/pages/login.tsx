import type { NextPage } from "next";
import RegistrationForm from "../components/Forms";
import NavBar from "../components/Navbar";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
    },
  })
);

const Login: NextPage = () => {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Login;
