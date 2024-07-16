import React from "react";

export const Button = ({handleEvent, content, iconitem}) => {
  return (
    <button onClick={handleEvent}
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      href="/ui/buttons"
    >
      <span>
        {iconitem}
      </span>
      {content}
    </button>
  );
};
