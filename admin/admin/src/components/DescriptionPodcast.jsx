import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TitleItem } from "./TitleItem";
import { PodcastCompleto } from "./PodcastCompleto";
import { Shorts } from "./Shorts";
import { Photos } from "./Photos";
import { getDatas } from "../api/post";
import { Suggestions } from "./Suggestions";
import { ToastContainer } from "react-toastify";

export const DescriptionPodcast = () => {
  const [searchParams] = useSearchParams();
  const detallepodcast = searchParams.get("detallepodcast");
  const [podcastFile, setPodcastFile] = useState([]);
  const [urlFiles, setUrlFiles] = useState([]);
  const [shortFiles, setShortFiles] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getPodcasts = async () => {
      const formdata = new FormData();
      formdata.append("action", "getFiles");
      formdata.append("idpocast", detallepodcast);
      const response = await getDatas(formdata);
      const { message, success } = response.data;
      if (!success) {
        navigate(-1);
        return;
      }
      setPodcastFile(message);
      setUrlFiles(message.filter((item) => item.tipo === 0));
      setShortFiles(message.filter((item) => item.tipo === 1));
      setPhotoFiles(message.filter((item) => item.tipo === 2));
    };
    getPodcasts();
  }, [detallepodcast, navigate]); // Añade urlFiles a las dependencias

  //   console.log("files: ", urlFiles)
  //   console.log("shorst: ", shortFiles)
  //   console.log("photos: ", photoFiles)
  return (
    <>
      <TitleItem pageName="Archivos del podcast" />
      <ToastContainer />
      <div className="grid grid-cols-1 gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default ">
          <div className="p-3 sm:p-6.5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="border p-2 sm:p-3 border-stroke">
                <h3 className="font-bold text-primary ">
                  Podcast completo
                </h3>
                <PodcastCompleto
                  urlFiles={urlFiles}
                  idpocast={detallepodcast}
                  setUrlFiles={setUrlFiles}
                />
              </div>
              <div className="mt-4 border p-3 border-stroke">
                <h3 className="font-bold text-primary ">Shorts</h3>
                <Shorts
                  shortFiles={shortFiles}
                  idpocast={detallepodcast}
                  setShortFiles={setShortFiles}
                />
              </div>
              <div className="mt-4 border p-3 border-stroke">
                <h3 className="font-bold text-primary ">
                  Fotografías
                </h3>
                <Photos
                  photoFiles={photoFiles}
                  idpocast={detallepodcast}
                  setPhotoFiles={setPhotoFiles}
                />
              </div>
            </div>
            <div className="p-3 border  border-stroke max-h-[50vh] overflow-y-scroll">
              <h3 className="font-bold text-primary ">
                Sugerencias
              </h3>
              <Suggestions detallepodcast ={detallepodcast}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
