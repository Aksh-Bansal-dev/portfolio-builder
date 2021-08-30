import type { NextPage } from "next";
import TemplateCard from "./TemplateCard";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "90vh",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
    },
  })
);

const Templates: NextPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TemplateCard />
      <TemplateCard />
      <TemplateCard />
      <TemplateCard />
      <TemplateCard />
    </div>
  );
};

export default Templates;
