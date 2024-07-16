import React, { useEffect, useState } from "react";
import { TitleItem } from "../components/TitleItem";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getDatas } from "../api/post";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../components/Complements/Loader";
import { userAuth } from "../hooks/AuthProvider";

export const NewEpisode = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = userAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "get_users");
      const response = await getDatas(formData);
      const { message, code } = response.data;
      if (code !== 200) {
        setErrors(message);
        setLoading(false);
      } else {
        const filteredUsers = message.filter(
          (userActual) => userActual.id !== user.result.id
        );
        setUsers(filteredUsers);
        setErrors(null);
        setLoading(false);
      }
    };
    getUsers();
  }, [user]);

  const [formData, setFormData] = useState({
    orden: "",
    titulo: "",
    dateRegister: "",
    clientid: "",
    foto: undefined,
  });

  const [error, setError] = useState({
    titulo: "",
    orden: "",
    dateRegister: "",
    foto: "",
    clientid: "",
  });

  const validateForm = () => {
    const newError = {
      titulo: formData.titulo ? "" : "Ingresa un título al episodio",
      orden: formData.orden ? "" : "Ingresa el orden",
      clientid: formData.clientid ? "" : "Selecciona un cliente",
      dateRegister: formData.dateRegister
        ? ""
        : "La fecha de producción es requerida",
      foto: formData.foto ? "" : "La foto de portada es requerida",
    };

    setError(newError);

    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
  };

  const handleChangeSelected = (e) => {
    setFormData({
      ...formData,
      clientid: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Asegúrate que todos los campos estén llenos ");
      return;
    }
    try {
      const sentData = new FormData();
      sentData.append("action", "new_podcast");
      sentData.append("file", formData.foto);
      sentData.append("titulo", formData.titulo);
      sentData.append("orden", parseInt(formData.orden));
      sentData.append("idusuario", parseInt(formData.clientid));
      sentData.append("registro", formData.dateRegister);
      console.log(formData);
      const add = await getDatas(sentData);
      console.log(add);
      const data = add.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      toast.error("Error al agregar episodio");
    }
  };

  return (
    <>
      <TitleItem pageName="Crear nuevo podcast" />
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <div className="border-b border-stroke py-4 px-6.5 ">
          <h3 className="font-bold text-center sm:text-left text-black ">
            Registrar nuevo episodio
          </h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Cliente
                  </label>
                  {loading ? (
                    <Loader />
                  ) : errors ? (
                    <p>{errors}</p>
                  ) : (
                    <select
                      name="clientid"
                      id="clients"
                      value={formData.clientid}
                      onChange={handleChangeSelected}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    >
                      <option value="">--Selecciona un cliente--</option>
                      {users.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.nombre_cliente}
                        </option>
                      ))}
                    </select>
                  )}
                  {error.clientid && (
                    <span className="text-red-500">{error.clientid}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Título
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ingresar título"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                  />
                  {error.titulo && (
                    <span className="text-red-500">{error.titulo}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Orden
                  </label>
                  <input
                    type="number"
                    id="orden"
                    name="orden"
                    value={formData.orden}
                    onChange={handleChange}
                    placeholder="Ingresar orden"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                  {error.orden && (
                    <span className="text-red-500">{error.orden}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Portada del episodio
                  </label>
                  <input
                    type="file"
                    required
                    name="foto"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleChange}
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                  />
                  {error.foto && (
                    <span className="text-red-500">{error.foto}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Fecha de producción
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      id="dateRegister"
                      name="dateRegister"
                      value={formData.dateRegister}
                      onChange={handleChange}
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary "
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                    />
                    {error.dateRegister && (
                      <span className="text-red-500">{error.dateRegister}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/panel/podcasts"
                className="flex justify-center font-bold rounded bg-red-500 p-3  text-black hover:bg-opacity-90"
              >
                Cancelar
              </Link>
              <button className="flex font-bold justify-center rounded bg-primary p-3 text-gray hover:bg-opacity-90">
                Crear podcast
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
