import { useState } from "react";

import { userAuth } from "../hooks/AuthProvider";
import { LoginUser } from "../api/auth";
import { Toasts } from "../components/Toasts";

export const Login =()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const {login}  = userAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("action", "login");
      formData.append("email", email);
      formData.append("pass", password);
      const response = await LoginUser(formData);
      const result = response.data;
      console.log(response)
      if (result.success === true) {
        console.log("Entro a true: ", result);
        const { token } = result;
        console.log(result)
        if (token) {
          await login ({result});
          console.log(token)
        }else{
          console.log("token no generado")
        }
      } else {
      //   Toastify({
      //     text: 
      //     duration: 3000,
      //     backgroundColor: "#ff4d4d"
      // }).showToast();

        console.log("entró al false: ", result.message);
      }
    } catch (error) {
      console.error(error);
      // Toastify({
      //     text: "Error, inténtelo más tarde",
      //     duration: 3000,
      //     backgroundColor: "#ff4d4d"
      // }).showToast();
    }
  };

  return (
    <>
   
      <section className="overflow-hidden bg-course">
        <div className="px-0 py-0 px-sm-04 py-sm-5  background-radial-gradient d-flex justify-content-center align-items-center">
          <div className="container my-5  ">
            <div className="row gx-lg-5 align-items-center mb-5 ">
              <div
                className="col-lg-7 mb-5 mb-lg-0 order-2 order-md-1"
                style={{zIndex: "10"}}
              >
                <h1 className="my-1 my-sm-3 display-5 fw-bold ls-tight text-light">
                  Bienvenido al gestor de <br />
                  <span className="text-secondarys">Archivos de Tu Podcast</span>
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
                        <div className="form-outline mb-4">
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
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Escribe tu correo electrónico"
                            className="form-control"
                          />
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
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Escribe una contraseña"
                            className="form-control"
                          />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
