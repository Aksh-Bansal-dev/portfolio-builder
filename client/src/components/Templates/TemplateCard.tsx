import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "0.5vh 0",
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
        <Image width={352} height={198} src={link} alt={name} />
      </a>
    </Link>
  );
};

export default TemplateCard;
