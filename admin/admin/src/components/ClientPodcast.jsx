import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getDatas } from "../api/post";
import { PodcastPersonal } from "./PodcastPersonal";
import { TitleItem } from "./TitleItem";
import { aleatorioText } from "../util/util";

export const ClientPodcast = () => {
  const [searchParams] = useSearchParams();
  const clientid = searchParams.get("clientid");
  const letters = aleatorioText();
  const letterTwo = aleatorioText();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const formdata = new FormData();
      formdata.append("action", "get_id_podcast");
      formdata.append("idcliente", clientid);
      const response = await getDatas(formdata);
      const { message, success } = response.data;
      if (!success) {
        navigate(-1);
        return;
      }
      setPodcast(message);
    };
    getUser();
  }, [clientid, navigate]);

  return (
    <div>
      <TitleItem pageName="Podcasts producidos" />

      {/* Your component logic here */}
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-3 sm:px-5 pb-3  pt-3 sm:pb-5 sm:pt-7.5 shadow-default   md:px-7.5 xl:col-span-7">
        <div className="mb-5.5 flex flex-wrap items-center justify-between gap-2">
          <div className="grid grid-cols-2 justify-between w-full items-center">
            <h4 className="text-xl font-bold text-black ">
              Episodios
            </h4>
            <Link
              to={`add-podcast?tupodcast=${letters}&q=${clientid}&obj=${letterTwo}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-4 text-center font-medium text-white hover:bg-opacity-90 "
            >
              Agregar nuevo
            </Link>
          </div>
        </div>
        <PodcastPersonal podcast={podcast} setPodcast={setPodcast} clientid={clientid} />
      </div>
    </div>
  );
};
