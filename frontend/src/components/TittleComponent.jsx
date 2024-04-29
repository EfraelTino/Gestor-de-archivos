import React from "react";

export const TittleComponent = ({ children, addclass }) => {
  return <h2 className={`text-white ${addclass}`}>{children}</h2>;
};
