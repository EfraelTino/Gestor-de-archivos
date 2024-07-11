import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardBody from "react-bootstrap/esm/CardBody";
import Card from "react-bootstrap/esm/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CardText from "react-bootstrap/esm/CardText";

import { useEffect, useRef, useState } from "react";
import { deleteSugerencia, getSuggestion } from "../../api/podcast";
import { userAuth } from "../../hooks/AuthProvider";
import { MensajeComponent } from "./MensajeComponent";
export const SuggesstionComponent = ({ idpocast }) => {
  const { user } = userAuth();
  const [suggestion, setSuggestion] = useState([]);
  const [error, setError] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const suggestionContainerRef = useRef(null);

  const addSugerencia = (newSugerencia) => {
    setSuggestion([...suggestion, newSugerencia]);
  };
  // delete data
  const handleRemove = async (id) => {
    try {
      const formData = new FormData();
      formData.append("action", "deletesuggestion");
      formData.append("id", parseInt(id));
      const deletedata = await deleteSugerencia(formData);
    } catch (error) {
      setError(error);

    }
  };

  useEffect(() => {
    const getDatas = async () => {
      try {
        const formData = new FormData();
        formData.append("action", "get_suggestion");
        formData.append("idpodcast", parseInt(idpocast));
        const response = await getSuggestion(formData);
        const dataresult = response.data;
        if (dataresult.success === false) {
          setError(dataresult.message);
        } else {
          setSuggestion(dataresult.message);
          setError(null);
        }
      } catch (error) {
        setError(error);
      }
    };
    getDatas();
  }, [idpocast, suggestion]);

  useEffect(() => {
    if (suggestionContainerRef.current && !isScrolling) {
      suggestionContainerRef.current.scrollTop =
        suggestionContainerRef.current.scrollHeight;
    }
  }, [suggestion, isScrolling]);

  const handleScroll = () => {
    setIsScrolling(true);
  };

  return (
    <Row style={{ minHeight: "50px" }}>
      <h4 className="text-white fw-bold">Sugerencias</h4>

      <div className="container">
        {error ? (
          <p className="text-danger fw-bold">No se encontraron sugestioness</p>
        ) : (
          <>
            <Row
              className="height_sugestion"
              ref={suggestionContainerRef}
              onScroll={handleScroll}
            >
              <Col className="position-relative">
                <ul className="list-unstyled">
                  {suggestion.map((item) => (
                    <li
                      className="d-flex justify-content-between mb-4 "
                      key={item.id}
                    >
                      <Card className="bg-warning w-100">
                        <CardHeader className="d-flex justify-content-between align-items-center">
                          <p className="fw-bold mb-0">{user.result.nombre}</p>{" "}
                          <div className="d-flex justify-content-between align-items-center gap-2">
                            <p className="text-muted small mb-0">
                              <i className="far fa-clock"></i> {item.fecha}
                            </p>
                            <button
                              type="button"
                              className="btn-close bg-success"
                              aria-label="Close"
                              onClick={() => handleRemove(item.id)}
                            ></button>
                          </div>
                        </CardHeader>
                        <CardBody className="bg-black rounded-bottom">
                          <CardText className="text-warning">
                            {item.suggestion}
                          </CardText>
                        </CardBody>
                      </Card>
                      <img
                        src={`http://localhost/tupodcast/backend/assets/${user.result.profile}`}
                        alt="avatar"
                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                        style={{ width: "60px" }}
                      />
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <MensajeComponent addSugerencia={addSugerencia} idpocast={idpocast} />
        </Row>
      </div>
    </Row>
  );
};
