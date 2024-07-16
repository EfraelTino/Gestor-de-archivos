import React, { useEffect, useState } from "react";
import { Loader } from "./Complements/Loader";
import {
  AiFillSave,
  AiOutlinePlusSquare,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import {  toast } from "react-toastify";
import { getDatas } from "../api/post";

export const Photos = ({ photoFiles, setPhotoFiles, idpocast }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (photoFiles.length === 0) {
      setError("No hay archivos disponibles.");
    } else if (!photoFiles) {
      setLoading(true);
    } else {
      setLoading(false);
      setError("");
    }
  }, [photoFiles]);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    // console.log(e.target.files[0])
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Por favor, seleccione un archivo");
      return;
    }
    
    const formdata = new FormData();
    formdata.append("action", "addfile");
    formdata.append("file", selectedFile);
    formdata.append("tipo", 2);
    formdata.append("idpocast", parseInt(idpocast));
    // console.log(typeof selectedFile)
    try {
      setLoading(true);
      const response = await getDatas(formdata);
      const { success, message, fileUrl, fileId } = response.data;
      // console.log(response)
      if (!success) {
        toast.error(message);
        return;
      }
      
      location.reload();
    } catch (error) {
      toast.error("Error inesperado, intente más tarde");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setAdd(false);
    setSelectedFile(null);
  };
// console.log("files: ", photoFiles)
  const handleRemove = async (id) => {
    const formdata = new FormData();
    formdata.append("action", "removefile");
    formdata.append("idfile", id);
    formdata.append("tipo", 1);
    try {
      setLoading(true);
      const response = await getDatas(formdata);
      const { success, message } = response.data;
      if (!success) {
        toast.error(message);
        return;
      }
      setPhotoFiles(prevFiles => prevFiles.filter(item => item.id !== id));
      toast.success(message);
    } catch (error) {
      toast.error("Error inesperado, intente más tarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-3">
          {error ? (
            <div className="text-center text-red-600 font-bold">{error}</div>
          ) : (
            <div className="">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {photoFiles.map((item) => (
                  <a href={`http://localhost/tupodcast/api/assets/img/${item.files}`} target="_blank" key={item.id} className="border border-stroke">
                    <div className="relative" key={item.id}>
                      <img src={`http://localhost/tupodcast/api/assets/img/${item.files}`} alt="Recurso" className="w-full h-28 sm:h-46 max-h-46 object-cover" />
                      <button
                        className="absolute top-0 right-0 text-3xl text-red-600 hover:text-red-500 bg-white rounded-full"
                        onClick={() => handleRemove(item.id)}
                      >
                        <AiOutlineCloseCircle />
                      </button>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3">
            {add ? (
              <form className="grid grid-cols-1 md:grid-cols-5 gap-3 transition-all" onSubmit={handleAddItem}>
                <input
                  type="file"
                  id="nuevo"
                  name="nuevo"
                  accept="image/*"
                  className="w-full md:col-span-3 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  onChange={handleFileChange}
                />
                <button type="submit" className="bg-primary col-span-1 rounded items-center flex justify-center text-white gap-1 font-bold">
                  Guardar <AiFillSave />
                </button>
                <button
                  type="button"
                  onClick={handleCancelar}
                  className="bg-red-500 rounded col-span-1 py-3 flex items-center gap-2 justify-center hover:bg-opacity-90 text-black px-2 font-bold"
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <button
                className="bg-primary transition-all w-full text-white font-bold py-2 px-6 rounded flex justify-center items-center gap-3 mt-3"
                onClick={handleAdd}
              >
                Agregar nuevo <AiOutlinePlusSquare />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};