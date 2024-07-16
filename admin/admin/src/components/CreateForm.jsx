import React, { useEffect, useState } from "react";
import { getDatas } from "../api/post";
import { ToastContainer, toast } from "react-toastify";

export const CreateForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    const getUserDifferent = async () => {
      const formData = new FormData();
      formData.append("action", "user_diferent");
      try {
        const response = await getDatas(formData);
        const { message, success } = response.data;
        if (!success) {
          setError("No se encontraron usuarios");
        } else {
          setUsers(message);
        }
      } catch (error) {
        setError("Error al obtener usuarios");
      } finally {
        setLoading(false);
      }
    };

    getUserDifferent();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      toast.error("Selecciona un cliente para crear el formulario");
      return;
    }

    const formdata = new FormData();
    formdata.append("action", "addform");
    formdata.append("iduser", selectedOption);

    try {
      const response = await getDatas(formdata);
      const { success, message } = response.data;
      if (success) {
        toast.success("Formulario creado exitosamente");
        location.reload();
      } else {
        toast.error(message || "Error al crear el formulario");
      }
    } catch (error) {
      toast.error("Error al crear el formulario");
    }
  };

  return (
    <div className="col-span-1">
      <ToastContainer />
      <form className="mb-4.5 grid items-center sm:grid-cols-3  gap-3">
        <div className="relative sm:col-span-2 z-20 bg-transparent ">
          <select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              changeTextColor();
            }}
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary ${
              isOptionSelected ? "text-black " : ""
            }`}
          >
            <option value="" disabled className="text-body ">
              Crea un nuevo formulario
            </option>
            {loading ? (
              <option disabled>Cargando usuarios...</option>
            ) : error ? (
              <option disabled>{error}</option>
            ) : users.length === 0 ? (
              <option disabled>No se encontraron usuarios</option>
            ) : (
              users.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  className="text-body "
                >
                  {item.nombre_cliente}
                </option>
              ))
            )}
          </select>

          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
        <div className="sm:col-span-1 w-full">
          <button
            onClick={handleCreate}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Crear formulario
          </button>
        </div>
      </form>
    </div>
  );
};
