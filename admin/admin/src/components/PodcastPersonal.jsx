import React, { useEffect, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getDatas } from "../api/post";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://localhost/tupodcast/api/assets/img";

export const PodcastPersonal = ({ podcast, setPodcast, clientid }) => {
  useEffect(() => {}, [podcast]);

  const [editItems, setEditItems] = useState(null);
  const [editPhoto, setEditPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    orden: "",
    titulo: "",
    dateRegister: "",
  });
  const [error, setError] = useState({
    titulo: "",
    orden: "",
    dateRegister: "",
  });

  const validateForm = () => {
    const newError = {
      titulo: formData.titulo ? "" : "Ingresa un título al episodio",
      orden: formData.orden ? "" : "Ingresa el orden",
      dateRegister: formData.dateRegister
        ? ""
        : "La fecha de producción es requerida",
    };

    setError(newError);

    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Asegúrate que todos los campos estén llenos");
      return;
    }

    try {
      const sentData = new FormData();
      sentData.append("action", "edit_episode");
      sentData.append("titulo", formData.titulo);
      sentData.append("tipe", parseInt(1));
      sentData.append("idpocast", id);
      sentData.append("orden", formData.orden);
      sentData.append("idusuario", clientid);
      sentData.append("registro", formData.dateRegister);

      const add = await getDatas(sentData);
      console.log("ss: ", add);
      const data = add.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      location.reload();
    } catch (error) {
      toast.error("Error al agregar episodio");
      console.log(error);
    }
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadPhoto = async (id) => {
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo");
      return;
    }

    try {
      const sendItem = new FormData();
      sendItem.append("action", "edit_episode");
      sendItem.append("idpocast", id);
      sendItem.append("file", selectedFile);
      sendItem.append("idusuario", clientid);
      sendItem.append("tipe", parseInt(2));

      const result = await getDatas(sendItem);
      console.log(result);
      const { success, message } = result.data;
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setEditPhoto(null);
      setSelectedFile(null);
      location.reload();
    } catch (error) {
      toast.error("Error al actualizar la foto");
      console.error(error);
    }
  };

  const handleChangeStatus = async (newEstado, datapodcast) => {
    console.log("nuevo estado: ", newEstado);
    try {
      const formdata = new FormData();
      formdata.append("action", "status_podcast");
      formdata.append("status", newEstado === 0 ? 1 : 0);
      formdata.append("idpodcast", datapodcast);
      const result = await getDatas(formdata);
      const { success, message } = result.data;
      if (!success) {
        toast.error("Error");
        return;
      }
      // Instead of reloading, you may update state or handle UI updates here
      location.reload();
    } catch (error) {
      toast.error("Error");
    }
  };

  const ordenados = [...podcast].sort((a, b) => a.orden - b.orden);

  const handleSetEditPhoto = (item) => {
    if (editPhoto === item.id) {
      setEditPhoto(null);
      setSelectedFile(null);
    } else {
      setEditPhoto(item.id);
    }
  };

  const handleSetEdit = (item) => {
    if (item === null || editItems === item.id) {
      setEditItems(null);
      setFormData({
        orden: "",
        titulo: "",
        dateRegister: "",
      });
    } else {
      setEditItems(item.id);
      setFormData({
        orden: item.orden,
        titulo: item.titulo,
        dateRegister: item.fecha_produccion,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 transition-all">
        {ordenados.map((item) => (
          <div className="rounded-lg border relative border-stroke bg-white pb-3 shadow-default">
            <div
              key={item.id}
            >
              {editPhoto === item.id ? (
                ""
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleChangeStatus(
                        parseInt(item.estado) === 1 ? 0 : 1,
                        item.id
                      )
                    }
                    className={`hover:text-primary p-1 rounded-md absolute right-4 top-4 font-bold ${
                      parseInt(item.estado) === 1
                        ? "bg-success text-white"
                        : "bg-danger"
                    }`}
                  >
                    <BiPowerOff className="text-2xl font-bold" />
                  </button>
                  <button
                    onClick={() => handleSetEditPhoto(item)}
                    className={`hover:text-black p-1 rounded-md absolute left-4 top-4 font-bold bg-green-500 text-white`}
                  >
                    <AiFillEdit className="text-2xl font-bold" />
                  </button>
                </>
              )}

              {editPhoto === item.id ? (
                <div className="relative mt-3 mx-1">
                  <input
                    type="file"
                    required
                    name="foto"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleFileUpload}
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                  />
                  <div className="mt-2 grid grid-cols-2">
                    <button
                      onClick={() => handleUploadPhoto(item.id)}
                      className="bg-primary text-white px-4 py-2 rounded mr-2 font-bold"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditPhoto(null)}
                      className="bg-red-600 text-black font-bold px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  alt={item.titulo}
                  className="rounded rounded-t-0  h-64 w-full object-cover"
                  src={`${API}/${item.foto}`}
                />
              )}

              {editItems !== item.id ? (
                <div className="px-4 pt-2">
                  <div className="grid grid-cols-4">
                    <p className="font-bold text-xl col-span-3" tag="h4">
                      {item.titulo}
                    </p>
                    <button
                      className="flex justify-end p-1"
                      onClick={() => handleSetEdit(item)}
                    >
                      <AiFillEdit className="col-span-1 bg-green-500 rounded text-white text-2xl" />
                    </button>
                  </div>
                  <div>
                    <strong className="font-semibold">Producio:</strong>{" "}
                    {item.fecha_produccion}
                  </div>
                  <div>
                    <strong className="font-semibold">Orden:</strong>{" "}
                    {item.orden}
                  </div>
                  <div className="mt-4 flex sm:block justify-center items-center mb-2">
                    <Link
                      to={`see-podcast?detallepodcast=${item.id}`}
                      className="bg-green-600 w-full  text-center  text-sm rounded text-white py-2 px-3 hover:bg-green-700 font-bold"
                    >
                      Ver archivos y sugerencias
                    </Link>
                  </div>
                </div>
              ) : (
                <form
                  className="px-4 pt-2"
                  onSubmit={(e) => handleEdit(e, item.id)}
                >
                  <div className="grid">
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      className="font-bold text-xl col-span-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                      value={formData.titulo}
                      onChange={handleChange}
                    />
                    <br />
                    {error.titulo && (
                      <span className="text-red-500">{error.titulo}</span>
                    )}
                  </div>
                  <div className="my-2">
                    <strong className="font-semibold">Producio:</strong>{" "}
                    <input
                      type="date"
                      name="dateRegister"
                      className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                      value={formData.dateRegister}
                      onChange={handleChange}
                    />
                    <br />
                    {error.dateRegister && (
                      <span className="text-red-500">{error.dateRegister}</span>
                    )}
                  </div>
                  <div>
                    <strong className="font-semibold">Orden:</strong>
                    <input
                      type="text"
                      id="orden"
                      name="orden"
                      className="ml-1 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                      value={formData.orden}
                      onChange={handleChange}
                    />
                    <br />
                    {error.orden && (
                      <span className="text-red-500">{error.orden}</span>
                    )}
                  </div>
                  <div className="mt-4 mb-2 grid grid-cols-2 gap-2">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded bg-primary p-3 font-bold text-gray hover:bg-opacity-90"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetEdit(null)}
                      className="bg-red-600 rounded text-black font-bold py-2 px-3 hover:bg-red-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
