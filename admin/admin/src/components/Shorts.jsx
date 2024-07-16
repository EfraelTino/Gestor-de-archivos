import React, { useEffect, useState } from "react";
import { Loader } from "./Complements/Loader";
import {
  AiFillEdit,
  AiOutlineReload,
  AiFillSave,
  AiOutlinePlusSquare,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import {  toast } from "react-toastify";
import { getDatas } from "../api/post";

export const Shorts = ({ shortFiles, setShortFiles, idpocast }) => {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nuevo, setNuevo] = useState("");
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (shortFiles.length === 0) {
      setError("No hay archivos disponibles.");
      return;
    } else if (!shortFiles) {
      setLoading(true);
    } else {
      setLoading(false);
      setError("");
    }
  }, [shortFiles]);

  const handleEditar = (id) => {
    setEditingId(id);
  };

  const handleAdd = () => {
    setAdd(true);
  };
  // console.log("shorst: ", shortFiles)
  const handleUpdate = async (id, newValue) => {
    if (newValue.trim() === "") {
      toast.error("Ingrese un enlace válido");
      return;
    }
    const updatedFiles = shortFiles.map((file) =>
      file.id === id ? { ...file, files: newValue } : file
    );
    const formdata = new FormData();
    formdata.append("action", "editfile");
    formdata.append("idarchivo", parseInt(id));
    formdata.append("files", newValue);
    formdata.append("tipo", 1);
    try {
      const response = await getDatas(formdata);
      const { success, message } = response.data;
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setShortFiles(updatedFiles);
      setEditingId(null);
    } catch (error) {
      toast.error("Error inesperado, intente más tarde");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (nuevo.trim() === "") {
      toast.error("Ingrese un enlace válido");
      return;
    }
    const newItem = {
      id:
        shortFiles.length > 0
          ? Math.max(...shortFiles.map((item) => item.id)) + 1
          : 1,
      files: nuevo,
      id_podcast: shortFiles[0]?.id_podcast || 5,
      tipo: 1,
    };
    const formdata = new FormData();
    formdata.append("action", "addfile");
    formdata.append("file", newItem.files);
    formdata.append("tipo", 1);
    formdata.append("idpocast", parseInt(idpocast));
    try {
      const response = await getDatas(formdata);
      const { success, message } = response.data;
      if (!success) {
        setShortFiles((prevFiles) => [...prevFiles]);
        setAdd(true);
        toast.error(message);
        return;
      }
      toast.success(message);
      setShortFiles((prevFiles) => [...prevFiles, newItem]);
      setNuevo("");
      setAdd(false);
    } catch (error) {
      toast.error("Error inesperado, intente más tarde");
    }
  };

  const handleCancelar = (id) => {
    if (id === 1) {
      setEditingId(null);
    } else if (id === 2) {
      setAdd(false);
    }
  };

  const handleRemove = async (id) => {
    const formdata = new FormData();
    formdata.append("action", "removefile");
    formdata.append("idfile", id);
    formdata.append("tipo", 1);
    try {
      const response = await getDatas(formdata);
      const { success, message } = response.data;
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setShortFiles((prevFiles) => prevFiles.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Error inesperado, intente más tarde");
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
              <div>
                {shortFiles.map((item) => (
                  <div key={item.id} className="border border-stroke px-3 py-2">
                    <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-3 transition-all relative">
                      {editingId !== item.id && (
                        <a
                          href={item.files}
                          target="_blank"
                          className="sm:col-span-3 my-2 text-primary font-bold flex gap-2 items-center relative"
                        >
                          Ver ahora <BsEye className="text-2xl" />
                        </a>
                      )}
                      <button
                        className="absolute text-xl -top-2 -right-0 text-red-600 hover:text-red-500"
                        onClick={() => handleRemove(item.id)}
                      >
                        <AiOutlineCloseCircle />
                      </button>
                      {editingId !== item.id && (
                        <button
                          onClick={() => handleEditar(item.id)}
                          className="col-span-2 bg-green-400 flex items-center rounded my-3 py-2 justify-center gap-2 transition-all"
                        >
                          Editar <AiFillEdit />
                        </button>
                      )}
                    </div>
                    {editingId === item.id && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdate(item.id, e.target.nuevo.value);
                        }}
                        className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center transition-all"
                      >
                        <textarea
                          type="text"
                          id="nuevo"
                          name="nuevo"
                          placeholder="Ingresar URL del archivo"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  col-span-3"
                          defaultValue={item.files}
                        />
                        <button
                          type="submit"
                          className="bg-primary rounded text-white col-span-1 py-2 font-bold flex items-center gap-2 justify-center hover:bg-opacity-90"
                        >
                          Actualizar
                          <AiOutlineReload />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelar(1)}
                          className="bg-red-500 rounded col-span-1 py-2 px-1 font-bold flex items-center gap-2 justify-center hover:bg-opacity-90"
                        >
                          Cancelar
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3">
            {add && (
              <form
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 transition-all"
                onSubmit={handleAddItem}
              >
                <input
                  type="text"
                  id="nuevo"
                  name="nuevo"
                  placeholder="Ingresar URL del archivo"
                  className="w-full col-span-3 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  value={nuevo}
                  onChange={(e) => setNuevo(e.target.value)}
                />
                <button className="bg-primary col-span-1 rounded items-center py-2 gap-1 flex justify-center text-white font-bold">
                  Guardar <AiFillSave />
                </button>
                <button
                  type="button"
                  onClick={() => handleCancelar(2)}
                  className="bg-red-500 rounded col-span-1 py-2 px-1 flex items-center gap-2 justify-center hover:bg-opacity-90 font-bold"
                >
                  Cancelar
                </button>
              </form>
            )}
            {!add && (
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
