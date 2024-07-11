import { useEffect, useState } from "react";

import { userAuth } from "../hooks/AuthProvider";
import { LoginUser } from "../api/auth";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet";
import { Notify } from "../components/user/Notify";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/util";
import { validateLength } from "../utils/util";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errordata, setErrorData] = useState({ emaildata: "", passdata: "" });
  const { login } = userAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("action", "login");
      formData.append("email", email);
      formData.append("pass", password);
      const response = await LoginUser(formData);
      const result = response.data;

      if (result.success === true) {
        const { token } = result;

        if (token) {
          console.log("token: ", result);
          await login({ result });
          navigate("/dashboard");
        } else {
          setError(toast.error("Error inesperado intent de nuevo"));
        }
      } else {
        setError(toast.error(result.message));
      }
    } catch (error) {
      setError(toast.error(error));
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | TU PODCAST</title>
      </Helmet>
      {error && <Notify error={error} />}
      <section className="overflow-hidden bg-course">
        <div className="px-0 py-0 px-sm-04 py-sm-5  background-radial-gradient d-flex justify-content-center align-items-center">
          <div className="container my-5  ">
            <Row className="gx-lg-5 align-items-center mb-5 ">
              <div
                className="col-lg-7 mb-5 mb-lg-0 order-2 order-md-1"
                style={{ zIndex: "10" }}
              >
                <h1 className="my-1 my-sm-3 display-5 fw-bold ls-tight text-light">
                  Bienvenido al gestor de <br />
                  <span className="text-secondarys">
                    Archivos de Tu Podcast
                  </span>
                  <br />
                  para clientes.
                </h1>
                <p className="mb-4 opacity-60 text-light font-weight-normal fs-6">
                  Nuestra plataforma ha sido diseñada especialmente para
                  facilitar la gestión y organización de todos los archivos
                  relacionados con tus producciones de podcast. Con Tu Podcast,
                  puedes descargar fácilmente tus archivos de audio, imágenes,
                  guiones, notas y cualquier otro material relevante para tus
                  episodios.
                </p>
              </div>

              <div className="col-lg-5 mb-5 mb-lg-0 position-relative order-1 order-md-2">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                ></div>
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                ></div>

                <div className="card bg-principal-s border border-dark">
                  <div className="card-body px-3 py-3 px-sm-5  py-md-5 px-md-5">
                    <h2 className="text-center fw-bold fs-2 text-primarys mb-4 text-light">
                      Inicia Sesión
                    </h2>
                    <form className="m-0 p-0" onSubmit={handleLogin}>
                      <div className="row">
                        <div className="form-outline mb-2">
                          <label
                            className="form-label text-light"
                            htmlFor="email"
                          >
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            autoComplete=""
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (!validateEmail(e.target.value)) {
                                setErrorData((prevErrors) => ({
                                  ...prevErrors,
                                  emaildata: "Correo electrónico no válido",
                                }));
                              } else {
                                setErrorData((prevErrors) => ({
                                  ...prevErrors,
                                  emaildata: "",
                                }));
                              }
                            }}
                            placeholder="Escribe tu correo electrónico"
                            className="form-control"
                          />
                          {
                            <p className="error-container">
                              {errordata.emaildata && (
                                <small
                                  className="error"
                                  style={{ color: "red" }}
                                >
                                  {errordata.emaildata}
                                </small>
                              )}
                            </p>
                          }
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label text-light"
                            htmlFor="password"
                          >
                            Contraseña
                          </label>
                          <input
                            type="password"
                            value={password}
                            id="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (!validateLength(e.target.value, 5)) {
                                setErrorData((prevErrors) => ({
                                  ...prevErrors,
                                  passdata:
                                    "La contraseña debe ser mayor a 6 caracteres",
                                }));
                              } else {
                                setErrorData((prevErrors) => ({
                                  ...prevErrors,
                                  passdata: "",
                                }));
                              }
                            }}
                            placeholder="Escribe una contraseña"
                            className="form-control"
                          />
                          <p className="error-container">
                            {errordata.passdata && (
                              <small className="error" style={{ color: "red" }}>
                                {errordata.passdata}
                              </small>
                            )}
                          </p>
                        </div>

                        <div className="d-flex justify-content-center text-light">
                          <button className="btn btn-primary btn-block mb-4 py-1 px-4 fs-5 fw-normal text-black">
                            Ingresar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </section>
    </>
  );
};
