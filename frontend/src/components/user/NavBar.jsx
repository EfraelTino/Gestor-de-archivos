import { Navigate, useNavigate } from "react-router-dom";
import { userAuth } from "../../hooks/AuthProvider";
import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import { useEffect } from "react";
import { getFormulario, getPodcastUserGeneral } from "../../api/podcast";
import { sessionDestroy } from "../../api/auth";
import { encryptId } from "../../utils/util";
import { Notify } from "./Notify";
import { toast } from "react-toastify";

export default function NavBar() {
  const { user, updatePodcasts, podcasts, setFormIdData, logout } = userAuth();
  const [data, setData] = useState([]);
  const { id } = user.result;
  const [errors, setErrors] = useState(null);
  const [formestado, setFormEstado] = useState(false);
  const [datapodcast, setDataPodcast] = useState([]);
  const navigate = useNavigate();
  console.log("users: ", user);
  const profileuser = user.result.nombre;
  const userid = user.result.id;
  const estado = user.result.estado;
  const iduserenc = encryptId(id);

  useEffect(() => {
    const getData = async () => {
      try {
        const formData = new FormData();
        formData.append("action", "getpodcasts");
        formData.append("userid", id);
        const response = await getPodcastUserGeneral(formData);
        const dataresult = response.data;
        if (response.status === 200 && dataresult.success) {
          const mensaje = dataresult.message;
          const filtrado = mensaje.filter((podcast) => podcast.estado === 1);
          filtrado.length >= 1 ? setData(filtrado) : navigate("/deuda");
          await updatePodcasts(filtrado);
        } else {
          setErrors(dataresult.message || "Error al obtener los datos");
          updatePodcasts(dataresult.message);
        }
      } catch (error) {
        setErrors(toast.error("Error al procesar datos"));
      }
    };
    const getForm = async () => {
      try {
        const formData = new FormData();
        formData.append("action", "getformulariouser");
        formData.append("id_usuario", id);
        const response = await getFormulario(formData);
        const datas = response.data;

        if (datas.success == false) {
          navigate("/dashboard");
          setFormEstado(false);
        } else {
          const activo = datas.message[0].activo;
          if (activo) {
            await setFormIdData(datas.message[0].id);
            setDataPodcast(datas);
            setFormEstado(true);
          } else {
            setFormEstado("");
            navigate("/dashboard");
          }
        }
      } catch (error) {
        setErrors(toast.error("Error al procesar datos"));
      }
    };
    getForm();
    getData();
  }, [id, estado, errors]);
  if (!user) {
    return <Navigate to="/" />;
  }
  const handleCloseSession = async () => {
    const formData = new FormData();
    formData.append("action", "sessionDestroy");
    const response = await sessionDestroy(formData);
    await logout();
  };
  return (
    <>
      {errors && <Notify>{errors}</Notify>}
      <Navbar
        expand="lg"
        className="bg-black shadow position-sticky"
        style={{ top: "0", zIndex: "99" }}
        data-bs-theme="dark"
      >
        <Container>
          <Link to="/dashboard">
            <img
              src="https://tupodcast.pe/wp-content/uploads/2023/11/cropped-tupodcast-200x67.webp"
              alt="Tu podcast logo"
              className="text-white"
              style={{ width: "180px" }}
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" aria-current="page" to="/dashboard">
                Principal
              </Link>
              {formestado && (
                <Link
                  className="nav-link"
                  to={`formulario/${iduserenc}/${datapodcast.message[0].id}`}
                >
                  Formulario Invitados
                </Link>
              )}
              <NavDropdown title="Podcasts" id="basic-nav-dropdown">
                {errors ? (
                  <NavDropdown.Item className="dropdown-item" href="#">
                    Sin Podcastss
                  </NavDropdown.Item>
                ) : (
                  data.map((item, index) => {
                    if (parseInt(item.id_usuario) === parseInt(userid)) {
                      return (
                        <Link
                          data-rr-ui-dropdown-item
                          className="  dropdown-item"
                          to={`podcast/${item.orden}`}
                          key={index}
                        >
                          Podcast {item.orden}
                        </Link>
                      );
                    }
                    return null;
                  })
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="">
              <NavDropdown title={profileuser} id="basic-nav-dropdown">
                {/* <Link className="nav-link" to="profile">
                  Cuenta
                </Link> */}

                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={handleCloseSession}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
