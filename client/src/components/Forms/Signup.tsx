import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import {
  Button,
  createStyles,
  Link,
  makeStyles,
  Radio,
  Typography,
} from "@material-ui/core";
import { useSignupLoginStyles } from "./signupLoginStyle";
import FormikTextField from "../FormikTextField";
import * as yup from "yup";
import { fetchRegister } from "../../utils/auth/fetchRegister";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { isLogin } from "../../utils/isLogin";
import { fetchInitialVal } from "../../utils/auth/fetchInitialVal";
import { useRouter } from "next/dist/client/router";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "80%",
    },
    input: {
      marginBottom: "2vh",
      width: "100%",
    },
    optBtn: {
      padding: "0.1vh",
    },
    flexbox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    simple: {
      fontWeight: "bold",
      margin: "2vh 0",
    },
  })
);

interface SignupProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const validSchema = yup.object({
  username: yup.string().required().min(2),
  email: yup
    .string()
    .required()
    .max(64)
    .matches(/^[a-zA-Z0-9]+(@[a-zA-Z0-9]+\.[a-z]+)$/, "Invalid Email"),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(/[0-9]/, "Password must include atleast 1 digit"),
});

const Signup: React.FC<SignupProps> = ({ setPage }) => {
  const classes = useSignupLoginStyles();
  const classes2 = useStyles();
  const router = useRouter();
  const [openError, setOpenError] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [initialVal, setInitialVal] = React.useState({
    username: "",
    email: "",
    password: "",
    website_name: "",
    profile_image: undefined,
    about: "",
    education: [],
    projects: [],
    info: [],
    linkedin_profile: "",
    github_profile: "",
    codeforces_profile: "",
    codechef_profile: "",
  });

  React.useEffect(() => {
    (async () => {
      const res = await isLogin();
      if (res) {
        setIsUpdate(true);
      }
      const val = await fetchInitialVal();
      setInitialVal(val);
    })();
  });

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };
  return (
    <div>
      <Formik
        initialValues={initialVal}
        validationSchema={validSchema}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const res = await fetchRegister(data);
          if (!res.done) {
            console.log("ERROR FROM BACKEND");
            setOpenError(true);
          } else {
            resetForm();
            router.push("/");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className={classes.root} noValidate autoComplete="off">
            <FormikTextField
              name="username"
              label="Name"
              className={classes.input}
            />
            <FormikTextField
              name="email"
              label="Email"
              className={classes.input}
            />
            {isUpdate ? null : (
              <FormikTextField
                name="password"
                type="password"
                label="Password"
                className={classes.input}
              />
            )}
            <FormikTextField
              name="website_name"
              label="Website Name"
              className={classes.input}
            />
            <FormikTextField
              name="linkedin_profile"
              label="LinkedIn"
              className={classes.input}
            />
            <FormikTextField
              name="github_profile"
              label="Github"
              className={classes.input}
            />
            <FormikTextField
              name="codeforces_profile"
              label="Codeforces profile"
              className={classes.input}
            />
            <FormikTextField
              name="codechef_profile"
              label="Codechef profile"
              className={classes.input}
            />
            <FieldArray name="education">
              {(arr) => (
                <div className={classes2.root}>
                  <Button
                    className={classes2.simple}
                    onClick={() =>
                      arr.push({
                        degree: "",
                        title: "",
                        score: "",
                        graduation_year: "",
                      })
                    }
                    variant="outlined"
                  >
                    Add Education
                  </Button>
                  {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                  {values.education.map((_e: any, key: number) => (
                    <div key={key}>
                      <FormikTextField
                        label={`Degree`}
                        className={classes2.input}
                        name={`education.${key}.degree`}
                      />
                      <FormikTextField
                        label={`Title`}
                        className={classes2.input}
                        name={`education.${key}.title`}
                      />
                      <FormikTextField
                        label={`Result/Grade`}
                        className={classes2.input}
                        name={`education.${key}.score`}
                      />
                      <FormikTextField
                        label={`Graduation Year`}
                        className={classes2.input}
                        name={`education.${key}.graduation_year`}
                      />
                      <div className={classes2.flexbox}>
                        <Button
                          className={classes2.optBtn}
                          onClick={() => arr.remove(key)}
                          variant="outlined"
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <FieldArray name="info">
              {(arr) => (
                <div className={classes2.root}>
                  {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                  {values.info.map((_e: any, key: number) => (
                    <div key={key}>
                      <FormikTextField
                        label={`Title`}
                        className={classes2.input}
                        name={`info.${key}.title`}
                      />
                      <FormikTextField
                        label={`Description`}
                        className={classes2.input}
                        name={`info.${key}.description`}
                      />
                      <FormikTextField
                        label={`Date`}
                        className={classes2.input}
                        name={`info.${key}.year`}
                      />
                      <Field
                        name={`info.${key}.infoType`}
                        type="radio"
                        value="achievement"
                        as={Radio}
                      />
                      <span>Achievement</span>
                      <Field
                        name={`info.${key}.infoType`}
                        type="radio"
                        value="contribution"
                        as={Radio}
                      />
                      <span>Contribution</span>
                      <Field
                        name={`info.${key}.infoType`}
                        type="radio"
                        value="experience"
                        as={Radio}
                      />
                      <span>Experience</span>
                      <Button
                        className={classes2.optBtn}
                        onClick={() => arr.remove(key)}
                        variant="outlined"
                      >
                        X
                      </Button>
                    </div>
                  ))}
                  <Button
                    className={classes2.simple}
                    onClick={() =>
                      arr.push({
                        title: "",
                        description: "",
                        date: "",
                        infoType: "",
                      })
                    }
                    variant="outlined"
                  >
                    Add More
                  </Button>
                </div>
              )}
            </FieldArray>
            <FieldArray name="projects">
              {(arr) => (
                <div className={classes2.root}>
                  {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                  {values.projects.map((_e: any, key: number) => (
                    <div key={key}>
                      <FormikTextField
                        label={`Title`}
                        className={classes2.input}
                        name={`projects.${key}.title`}
                      />
                      <FormikTextField
                        label={`Description`}
                        className={classes2.input}
                        name={`projects.${key}.description`}
                      />
                      <FormikTextField
                        label={`Date`}
                        className={classes2.input}
                        name={`projects.${key}.date`}
                      />
                      <Button
                        className={classes2.optBtn}
                        onClick={() => arr.remove(key)}
                        variant="outlined"
                      >
                        X
                      </Button>
                    </div>
                  ))}
                  <Button
                    className={classes2.simple}
                    onClick={() =>
                      arr.push({
                        title: "",
                        description: "",
                        date: "",
                      })
                    }
                    variant="outlined"
                  >
                    Add Project
                  </Button>
                </div>
              )}
            </FieldArray>
            <Button
              disabled={isSubmitting}
              color="inherit"
              variant="contained"
              type="submit"
              className={classes.btn}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Typography align="center" className={classes.footer}>
        Already have an account?{" "}
        <Link className={classes.link} onClick={() => setPage(0)}>
          Login
        </Link>
      </Typography>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Email already taken
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
