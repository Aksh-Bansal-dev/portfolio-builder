import type { NextPage } from "next";
import Link from "next/link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0.5vh 0.5vh",
      width: 352,
      height: 198,
      [theme.breakpoints.between("sm", "md")]: {
        width: 400,
        height: 225,
      },
    },
    img: {
      width: 352,
      height: 198,
      [theme.breakpoints.between("sm", "md")]: {
        width: 400,
        height: 225,
      },
    },
  })
);

interface TemplateCardInterface {
  link: string;
  name: string;
}

const TemplateCard: NextPage<TemplateCardInterface> = ({ link, name }) => {
  const classes = useStyles();
  return (
    <Link href={`/template/${name}`}>
      <a className={classes.root} title={name}>
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img className={classes.img} src={link} alt={name} />
      </a>
    </Link>
  );
};

export default TemplateCard;
