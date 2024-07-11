import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { TittleComponent } from "./TittleComponent";
import { useNavigate, useParams } from "react-router-dom";
import { userAuth } from "../../hooks/AuthProvider";
import { FilePodcas } from "./FilePodcas";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet";

export const PodcastComponent = () => {
  const { number } = useParams();
  const { podcasts, user } = userAuth();
  const idUsuario = user.result.id;


  const navigate = useNavigate();
  const podcastItems = podcasts.map((item) => {
    return {
      idPodcast: item.id,
      orden: item.orden,
      titulo: item.titulo,
      id_usuario: item.id_usuario,
      podcast_id: item.id,
      fecha: item.fecha_produccion,
    };
  });
  const filterData = podcastItems.filter(
    (data) => data.orden === parseInt(number)
  );
  const podcastUsuario = podcastItems
    .filter((item) => item.orden === parseInt(number))
    .map((item) => item.id_usuario);

  const titles = podcastItems
    .filter((item) => item.orden === parseInt(number))
    .map((item) => item.titulo);

  const fecha = podcastItems
    .filter((item) => item.orden === parseInt(number))
    .map((item) => item.fecha);
  const id_podcast = podcastItems
    .filter((item) => item.orden === parseInt(number))
    .map((item) => item.idPodcast);

  useEffect(() => {
    if (filterData.length === 0) {
      navigate("/dashboard");
    } else if (parseInt(podcastUsuario) !== parseInt(idUsuario)) {
      return navigate("/dashboard");
    }
  }, [filterData, number]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Podcast {number} | TU PODCAST</title>
      </Helmet>
      <div className="p-5 bg-principal">
        <Container>
          <TittleComponent addclass="fw-bold">
            {" "}
            {titles.join(", ")}{" "}
          </TittleComponent>
          <p>
            <small>
              <strong className="text-white">Fecha de producción: </strong>
            </small>{" "}
            <span className="text-white">{fecha}</span>
          </p>
          <Row>
            <Col>
              <FilePodcas idpocast={id_podcast} number={number} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
