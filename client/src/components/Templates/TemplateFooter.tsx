import type { NextPage } from "next";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "2vh",
      minHeight: "10vh",
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      background: "var(--secondary-bg)",
    },
  })
);

const TemplateFooter: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="https://forms.gle/ebmx8U5VfmNL7rbWA" target="_blank">
        Contribute Template
      </Link>
    </div>
  );
};

export default TemplateFooter;
