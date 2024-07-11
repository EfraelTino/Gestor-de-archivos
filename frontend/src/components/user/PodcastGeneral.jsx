
import { TittleComponent } from "./TittleComponent";
import { Link } from "react-router-dom";
import { userAuth } from "../../hooks/AuthProvider";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/esm/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardSubtitle from "react-bootstrap/esm/CardSubtitle";
import CardText from "react-bootstrap/esm/CardText";
export const PodcastGeneral = () => {
  const { podcasts } = userAuth();
  const [errors, setErrors] = useState(null);
  const [ps, setPs] = useState([]);

  useEffect(() => {
    if (!Array.isArray(podcasts) || podcasts.length === 0) {
      setErrors(podcasts);
    } else {
      setPs(podcasts);
      setErrors(null);
    }
  }, [podcasts]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | TU PODCAST</title>
      </Helmet>
      <div className="p-5 bg-principal">
      <Container>
        <TittleComponent> Tus podcasts producidos </TittleComponent>

        <Row className="mt-3 g-3">
          {errors ? (
            <p className="text-white text-left fw-bold">{errors}</p>
          ) : (
            ps.map((podcast, index) => (
              <Col xs="12" sm="6" md="4" lg="3"  key={index}>
                <Card className="border border-warning bg-black border-yellow bg-card-alt">
                  <img
                    alt={podcast.titulo}
                    className="rounded rounded rounded-t-0"
                    src={`http://localhost/tupodcast/backend/assets/${podcast.foto}`}
                  />
                  <CardBody>
                    <CardTitle tag="h4" className="text-white">
                      {podcast.titulo}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-white" tag="h6">
                     Producido: <small className="text-white">{podcast.fecha_produccion}</small>
                    </CardSubtitle>
                    <CardText>{podcast.descripcion}</CardText>
                    <Link
                      className="btn btn-warning text-black fw-semibold"
                      to={`podcast/${podcast.orden}`}
                    >
                      Ver Ahora
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
    </>
    
  );
};