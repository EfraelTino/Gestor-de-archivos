import React, { useState } from "react";
import { insertSugerencia } from "../../api/podcast";
import { Notify } from "./Notify";
import {  toast } from 'react-toastify';

export const MensajeComponent = ({ addSugerencia, idpocast }) => {
    // export const MensajeComponent = ({ addSugerencia, idpocast }) => {
  const [sugerencia, setSsugerencia] = useState("");
  const [error, setError] = useState("");
  const handleSugerencia =  async (e) => {
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
        }else{
          setError(toast.error(response.message)) 
        }
    } catch (error) {
        setError(toast.error(error)) 
    }
  };
  return (
    <>
     {error && (
        <Notify error={error}/>
      )}
      <form onSubmit={handleSugerencia} className="form_sugerencia pt-4">
        <div data-mdb-input-init className="form-outline mb-3 bg-black">
          <input
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
