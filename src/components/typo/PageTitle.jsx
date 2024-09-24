import React from "react";

/* This ready-made Component can be re-used for all our PageTitles */

const PageTitle = ({ pagetitle }) => {
  return (
    <h1 className="font-primary font-bold text-lg leading-20 pt-5">
      {pagetitle}
    </h1>
  );
};

export default PageTitle;
