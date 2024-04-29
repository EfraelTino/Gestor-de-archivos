import { Navigate } from "react-router-dom";
import { userAuth } from "../hooks/AuthProvider";
import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import { useEffect } from "react";
import { getPodcastUserGeneral } from "../api/podcast";

export default function NavBar() {
  const { user, updatePodcasts, podcasts } = userAuth();
  const [data, setData] = useState([]);
  const { id } = user.result;
  const [errors, setErrors] = useState(null);
  console.log("podcasssstss : ", podcasts);
  console.log("user: ", user);
  const profileuser = user.result.nombre;
  const userid = user.result.id;
  console.log("user id: ", userid);
  useEffect(() => {
    const getData = async () => {
      try {
        const formData = new FormData();
        formData.append("action", "getpodcasts");
        formData.append("userid", id);
        const response = await getPodcastUserGeneral(formData);
        const dataresult = response.data;
        console.log("data result: ", response)
        if (response.status === 200 && dataresult.success) {
          const mensaje = dataresult.message;
  
          const filtrado = mensaje.filter(podcast => podcast.estado === 1);
          filtrado.length >= 1 ? setData(filtrado) : setErrors("No tienes podcasts activos debido a una deuda");
         await updatePodcasts( filtrado );
        } else {
          setErrors(dataresult.message || "Error al obtener los datos");
          updatePodcasts( dataresult.message )
        }
      } catch (error) {
        setErrors("Error al procesar datos");
      }
    };

    getData();
  }, [id]);
 

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar expand="lg" className="bg-black shadow" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/dashboard">
            <img
              // src="https://tupodcast.pe/wp-content/uploads/2023/11/cropped-tupodcast-200x67.webp"
              alt="Tu podcast logo"
              style={{ width: "180px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" aria-current="page" to="/dashboard">
                Principal
              </Link>
              <Link className="nav-link" to="formulario">
                Formulario Invitados
              </Link>
              <NavDropdown title="Podcasts" id="basic-nav-dropdown">
                {errors ? <NavDropdown.Item className="dropdown-item" href="#">
                    Sin Podcastss
                  </NavDropdown.Item> :  (data.map((item, index) => {
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
                }))}
        
              </NavDropdown>
              <Nav.Link href="#link">Ajustes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="">
              <NavDropdown title={profileuser} id="basic-nav-dropdown">
       
                  <Link className="nav-link" to="profile">
                    Cuenta
                  </Link>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Salir</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
