import React, { useState } from "react";
import { useEffect } from "react";
import { getDatas } from "../api/post";
import { Loader } from "./Complements/Loader";

export const Suggestions = ({ detallepodcast }) => {
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "get_suggestion");
      formData.append("idpodcast", parseInt(detallepodcast));
      const response = await getDatas(formData);
      const { success, message } = response.data;
      console.log(message);
      if (!success) {
        setError(message);
        setLoading(false);
        return;
      }
      setSuggestion(message);
      setError(null);
      setLoading(false);
    };
    getData();
  }, [detallepodcast]);
  return (
    <div>
      <div className="flex items-start gap-2.5 mt-4">
        {/* <img
          className="w-8 h-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Jese image"
        /> */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red font-bold">{error}</p>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {suggestion.map((item) => (
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900">
                    Comentario del cliente
                  </span>
                </div>
                <div
                  key={item.id}
                  className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 border rounded-e-xl rounded-es-xl bg-primary border-green-400"
                >
                  <p className="text-sm font-normal text-white">
                    {item.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
