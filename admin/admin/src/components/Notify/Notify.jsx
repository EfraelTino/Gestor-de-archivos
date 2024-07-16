import React, { useEffect, useState } from "react";
import { BsCheck2Circle, BsXLg } from "react-icons/bs";

export const Notify = ({ status = 200, message = "Hola, ¿cómo estás?" }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`flex transition-transform transform ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } right-2 left-1 sm:left-auto md:right-6 md:top-6 rounded-md w-full sm:w-[40vw] md:w-[25vw] border-l-6 fixed top-1 z-9999 px-7 py-8 shadow-md md:p-9 ${
          status === 200 ? "border-teal-500 bg-teal-100" : "border-red-400 bg-red-100"
        }`}
        style={{ transition: "transform 0.5s ease-in-out" }}
      >
        <div
          className={`mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg ${
            status === 200 ? "bg-[#34D399]" : "bg-[#F87171]"
          }`}
        >
          {status === 200 ? (
            <BsCheck2Circle className="text-white text-2xl font-bold" />
          ) : (
            <BsXLg className="text-white text-2xl font-bold" />
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <h5
            className={`font-bold text-[14px] md:text-base ${
              status === 200 ? "text-black" : "text-[#B45454]"
            }`}
          >
            {message}
          </h5>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 bg-transparent border-0 text-black"
          >
            <BsXLg className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};
