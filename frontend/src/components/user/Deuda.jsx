import React from "react";
import { Link } from "react-router-dom";

export const Deuda = () => {
  return (
    <div
      className="bg-principal d-flex justify-content-center flex-column align-items-center "
      style={{ background: "black" }}
    >
      <div className="container  d-flex justify-content-center flex-column align-items-center">
        <img
          src="https://tupodcast.pe/wp-content/uploads/2023/11/cropped-tupodcast-200x67.webp"
          alt="Logo tu podcast"
          style={{ width: "300px" }}
        />
        <p className="text-white text-center fs-5">
          Esperamos que se encuentre bien. Queremos informarle que tenemos un
          pago pendiente por los servicios prestados. Para poder habilitar sus
          episodios grabados anteriormente, le agradeceríamos que pudiera
          realizar el pago correspondiente. Quedamos a su disposición para
          cualquier consulta o asistencia que pueda necesitar. Agradecemos su
          comprensión y cooperación. Saludos cordiales,{" "}
          <strong className="text-white text-center">
            Eddy Fuño Becerril - CEO.
          </strong>
        </p>
        <div className="d-flex gap-4">
          <Link to="/" className="btn btn-warning fw-semibold small">
            Regresar
          </Link>
          <Link to="/" className="btn btn-success fw-bold small">
            ¡Pagar ahora!
          </Link>
        </div>
      </div>
    </div>
  );
};
