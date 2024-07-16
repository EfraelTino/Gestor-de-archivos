import React from "react";
import {Link}  from 'react-router-dom'
export const LinkComponent = ({redirectItem, content, iconitem}) => {
  return (
    <Link to={redirectItem}
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      <span>
        {iconitem}
      </span>
      {content}
    </Link>
  );
};
