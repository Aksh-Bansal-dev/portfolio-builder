import type { NextPage } from "next";
import TemplateCard from "./TemplateCard";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { fetchTemplates } from "../../utils/fetchTemplates";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "2vh",
      minHeight: "90vh",
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
  })
);

const Templates: NextPage = () => {
  const classes = useStyles();
  const [templates, setTemplates] = useState<
    [
      {
        id: number;
        display_picture: string;
        creator: string;
        template_name: string;
      }
    ]
  >();
  useEffect(() => {
    (async () => {
      const res = await fetchTemplates();
      if (res.done) {
        setTemplates(res.data);
      }
    })();
  }, []);

  if (!templates) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className={classes.root}>
      {templates.map((e, key) => (
        <TemplateCard
          key={key}
          name={e.template_name}
          link={e.display_picture}
        />
      ))}
    </div>
  );
};

export default Templates;
