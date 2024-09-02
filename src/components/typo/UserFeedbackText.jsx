import React from "react";

/* This ready-made component can be used for UserFeedbackText: Info, Validation, Tooltip and Error messages */

/* default styles, that we can change later on: */
const feedbackStyles = {
  info: "text-blue-500 bg-blue-100 border-blue-300",
  validation: "text-yellow-500 bg-yellow-100 border-yellow-300",
  error: "text-red-500 bg-red-100 border-red-300",
  tooltip: "text-green-500 bg-green-100 border-green-300",
};

function UserFeedbackText({ content, type }) {
  return (
    <p
      className={`font-primary text-xs leading-16 border p-2 rounded ${feedbackStyles[type]}`}
    >
      {content}
    </p>
  );
}

export default UserFeedbackText;
