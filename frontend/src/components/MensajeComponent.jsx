import React, { useState } from "react";
import { insertSugerencia } from "../api/podcast";

export const MensajeComponent = ({ addSugerencia, idpocast }) => {
    // export const MensajeComponent = ({ addSugerencia, idpocast }) => {
  const [sugerencia, setSsugerencia] = useState("");
  const handleSugerencia = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("action", "updatesuggestion");
        formData.append("idpodcast", parseInt(idpocast));
        formData.append("datasugerencia", sugerencia);
        const insertdata = await insertSugerencia(formData);
        const response = insertdata.data;
        if(response.success){
            const newSugerencia  ={
                id: response.newId,
                suggestion: sugerencia,
                id_podcast: idpocast,
                fecha: new Date().toLocaleString()
            };
            addSugerencia(newSugerencia);
            setSsugerencia("");
            // sugerencia.push({
                
            // })
        }else{
            console.log(response.message)
        }

    } catch (error) {
        console.log("ERROR EN HANDLESUGERENCIA: ", error)
    }
  };
  return (
    <>
      <form onSubmit={handleSugerencia} className="form_sugerencia pt-4">
        <div data-mdb-input-init className="form-outline mb-3 bg-black">
          <textarea
            className="form-control bg-white   rounded text-black"
            id="sugerencia"
            value={sugerencia}
            onChange={(e) => setSsugerencia(e.target.value)}
            rows="2"
            placeholder="Mensaje"
          />
        </div>

        <button type="submit" className="btn btn-warning btn-rounded float-end">
          Enviar
        </button>
      </form>
    </>
  );
};
