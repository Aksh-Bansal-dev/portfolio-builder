import { IconButton, IconButtonProps } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
import React from "react";

type BackButtonProps = {
  //
} & IconButtonProps;
const BackButton: React.FC<BackButtonProps> = ({ ...props }) => {
  return (
    <>
      <Link href="/">
        <a>
          <IconButton {...props}>
            <ArrowBack />
          </IconButton>
        </a>
      </Link>
    </>
  );
};

export default BackButton;
