import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "25%",
      [theme.breakpoints.up("lg")]: {
        width: "80%",
      },
    },
  })
);

interface TemplateCardInterface {
  link: string;
}

const TemplateCard: NextPage<TemplateCardInterface> = ({ link }) => {
  const classes = useStyles();
  return (
    <Link href={"/"}>
      <a>
        <Image className={classes.root} src={link} alt="screenshot" />
      </a>
    </Link>
  );
};

export default TemplateCard;
