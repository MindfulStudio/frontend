import React from "react";

/* This ready-made component can be used for Highlighttext: Appname, Welcometext amd Emotionfamilies*/

const HighlightText = ({ highlighttext, fontsize }) => {
  return (
    <h2 className={`font-display ${fontsize} leading-30 tracking-tight`}>
      {highlighttext}
    </h2>
  );
};

export default HighlightText;
