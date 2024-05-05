import React, { useEffect, useState } from "react";
import { getPodcastUsuario } from "../api/podcast";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { SuggesstionComponent } from "./SuggesstionComponent";
import { TittleComponent } from "./TittleComponent";
import { LoadingComponent } from "./LoadingComponent";

export const FilePodcas = ({ idpocast, number }) => {
  const [error, setError] = useState(null);
  const [podcastItem, setPodcastItem] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [archivos, setArchivo] = useState([]);
  useEffect(() => {
    const getPodcast = async () => {
      try {
        const formData = new FormData();
        formData.append("action", "getpodcast_user");
        formData.append("idpodcast", parseInt(idpocast));
        const response = await getPodcastUsuario(formData);
        const dataresult = response.data;
        if (response.status === 200 && dataresult.success) {
          // console.log("podcasts : ", response);

          const podcasts = dataresult.message.filter((data) => data.tipo === 0);
          const short = dataresult.message.filter((data) => data.tipo === 1);
          const archivo = dataresult.message.filter((data) => data.tipo === 2);
          setPodcastItem(podcasts);
          setShorts(short);
          setArchivo(archivo);
          setError(null);
        } else {
          setError(dataresult.message || "Error al obtener datos");
        }
      } catch (error) {
        console.log("entro al catch: ", error);
      }
    };
    getPodcast();
  }, [number, error, idpocast]); // Agrega number a las dependencias

  return (
    <>
      {/* <LoadingComponent /> */}
      <Row>
        <Col>
          <div className="mb-5">
          <h4 className="text-white fw-bold">Podcast</h4>
            <Row>
              <Col >
                {error !== null ? (
                  <p className="text-white">{error}</p>
                ) : (
                  podcastItem.map((item, key) => (
                    <div
                      key={key}
                      className="embed-responsive embed-responsive-16by9 position-relative"
                    >
                      <iframe
                        className="embed-responsive-item"
                        src={item.files}
                        style={{ width: "100%", height: "480px" }}
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))
                )}
              </Col>
            </Row>
          </div>
          <div className="my-5">
          <h4 className="text-white fw-bold">Shorts</h4>
            <Row>
              <Col>
                {shorts.length === 0 ? (
                  <p className="text-white">Shorts no disponibles</p>
                ) : (
                  shorts.map((item, key) => (
                    <iframe key={key} src={item.files}>
                      {" "}
                    </iframe>
                  ))
                )}
              </Col>
            </Row>
          </div>
          <div className="my-5">
          <h4 className="text-white fw-bold">Fotos</h4>
            <Row>
              <Col>
                {archivos.length === 0 ? (
                  <p className="text-white">Fotos no disponibles</p>
                ) : (
                  archivos.map((item, key) => <p>Hola</p>)
                )}
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm="12" md="6">
            <SuggesstionComponent idpocast={idpocast}/>
          </Col>
      </Row>
    </>
  );
};
