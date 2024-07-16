import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TitleItem } from "../components/TitleItem";
import { ToastContainer, toast } from "react-toastify";
import { getUserForId, updateDataUser } from "../api/post";
import { Loader } from "../components/Complements/Loader";

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    fullname: "",
    brand: "",
    user: "",
    password: "",
    repeatPassword: "",
    telf: "",
    dateRegister: "",
  });

  const [error, setError] = useState({
    nombre: "",
    fullname: "",
    brand: "",
    user: "",
    password: "",
    telf: "",
    repeatPassword: "",
    dateRegister: "",
  });

  const validateForm = () => {
    const newError = {
      nombre: formData.nombre ? "" : "El nombre es requerido",
      fullname: formData.fullname ? "" : "El apellido es requerido",
      brand: formData.brand ? "" : "La marca es requerida",
      telf: formData.telf ? "" : "El número de contacto es requerido",
      user: formData.user ? "" : "El usuario es requerido",
      repeatPassword:
        formData.repeatPassword === formData.password
          ? ""
          : "Las contraseñas no coinciden",
      dateRegister: formData.dateRegister
        ? ""
        : "La fecha de registro es requerida",
    };

    setError(newError);

    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "user_for_id");
      formData.append("iduser", id);
      const result = await getUserForId(formData);
      const { success, message } = result.data;

      if (!success) {
        return navigate("/panel");
      }
      setLoading(false);
      setFormData((prevFormData) => ({
        ...prevFormData, // Keep current values
        nombre: message[0].nombre,
        fullname: message[0].apellido,
        brand: message[0].nombre_cliente,
        user: message[0].email,
        telf: message[0].telf,
        dateRegister: message[0].fecha, // Assuming 'fecha' is the registration date
      }));
    };
    getUser();
  }, [id, navigate]);

  const handleChange = async (e) => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Asegúrate que todos los campos estén llenos");
      return;
    }
    const formdata = new FormData();
    formdata.append("action", "update_data_user");
    formdata.append("password", formData.password);
    formdata.append("repeat_pass", formData.repeatPassword);
    formdata.append("nombre", formData.nombre);
    formdata.append("fullname", formData.fullname);
    formdata.append("brand", formData.brand);
    formdata.append("user", formData.user);
    formdata.append("telf", formData.telf);
    formdata.append("data", formData.dateRegister);
    formdata.append("iduser", id);
    const response = await updateDataUser(formdata);
    const { message, success } = response.data;
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
  };

  return (
    <>
      <TitleItem pageName={`Actualizar datos de ${formData.brand}`} />
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default  ">
            <div className="border-b border-stroke py-4 px-6.5 ">
              <h3 className="font-medium text-black ">
                Actualizar datos de: <strong>{formData.brand}</strong>
              </h3>
            </div>
            {loading ? (
              <Loader className="mt-10" />
            ) : (
              <form onSubmit={handleUpdate}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Nombres
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Ingresar Nombre"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.nombre && (
                          <span className="text-red-500">{error.nombre}</span>
                        )}
                      </div>

                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          placeholder="Ingresar Nombre"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.fullname && (
                          <span className="text-red-500">{error.fullname}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Teléfono de contacto
                        </label>
                        <input
                          type="text"
                          id="telf"
                          name="telf"
                          value={formData.telf}
                          onChange={handleChange}
                          placeholder="Ingresar teléfono de contacto"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.telf && (
                          <span className="text-red-500">{error.telf}</span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Nombre de la marca y/o emprendimiento
                        </label>
                        <input
                          type="text"
                          placeholder="Ingresar marca"
                          id="brand"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.brand && (
                          <span className="text-red-500">{error.brand}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Usuario
                        </label>
                        <input
                          type="email"
                          id="user"
                          name="user"
                          value={formData.user}
                          onChange={handleChange}
                          placeholder="Ingresa un correo electrónico"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.user && (
                          <span className="text-red-500">{error.user}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          minLength={6}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Ingresar contraseña"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.password && (
                          <span className="text-red-500">{error.password}</span>
                        )}
                      </div>

                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Repetir contraseña
                        </label>
                        <input
                          type="password"
                          placeholder="Repite la contraseña"
                          id="repeatPassword"
                          name="repeatPassword"
                          minLength={6}
                          value={formData.repeatPassword}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.repeatPassword && (
                          <span className="text-red-500">
                            {error.repeatPassword}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Fecha del primer pago
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="dateRegister"
                            name="dateRegister"
                            value={formData.dateRegister}
                            onChange={handleChange}
                            className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary   "
                            placeholder="mm/dd/yyyy"
                            data-class="flatpickr-right"
                          />
                          {error.dateRegister && (
                            <span className="text-red-500">
                              {error.dateRegister}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                  <Link
                    to="/panel"
                    className="flex justify-center font-bold rounded bg-red-500 p-3  text-black hover:bg-opacity-90"
                  >
                    Cancelar
                  </Link>
                  <button className="flex justify-center rounded bg-primary p-3 font-bold text-gray hover:bg-opacity-90">
                    Guardar usuario
                  </button>
                </div>
                 
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
