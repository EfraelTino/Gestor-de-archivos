import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TitleItem } from "../components/TitleItem";
import { Notify } from "../components/NotifyItem";
import { toast } from "react-toastify";
import { addUser } from "../api/post";
export const AddUser = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    fullname: "",
    brand: "",
    user: "",
    password: "",
    repeatPassword: "",
    telf: "",
    dateRegister: "",
    foto: undefined,
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
    foto: "",
  });
  const navigate = useNavigate();
  const validateForm = () => {
    const newError = {
      nombre: formData.nombre ? "" : "El nombre es requerido",
      fullname: formData.fullname ? "" : "El apellido es requerido",
      brand: formData.brand ? "" : "La marca es requerida",
      telf: formData.telf ? "" : "El número de contacto  es requerido",
      user: formData.user ? "" : "El usuario es requerido",
      password: formData.password ? "" : "La contraseña es requerida",
      repeatPassword:
        formData.repeatPassword === formData.password
          ? ""
          : "Las contraseñas no coinciden",
      dateRegister: formData.dateRegister
        ? ""
        : "La fecha de registro es requerida",
      foto: formData.foto ? "" : "La foto es requerida",
    };

    setError(newError);

    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
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
      toast.error("Asegúrate que todos los campos estén llenos ");
      return;
    }
    try {
      const sentData = new FormData();
      sentData.append("action", "add_user");
      sentData.append("foto", formData.foto);
      sentData.append("nombre", formData.nombre);
      sentData.append("fullname", formData.fullname);
      sentData.append("brand", formData.brand);
      sentData.append("user", formData.user);
      sentData.append("password", formData.password);
      sentData.append("telf", formData.telf);
      sentData.append("repeatPassword", formData.repeatPassword);
      sentData.append("dateRegister", formData.dateRegister);
      const add = await addUser(sentData);
      const data = add.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate(-1);
      console.log("registraod de  menra exitosa:");
      console.log("add: ", add);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <>
      <TitleItem pageName="Agregar Usuario" />
      {error && <Notify error={error} />}

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke py-4 px-6.5 ">
              <h3 className="font-semibold text-center md:text-left text-title-[15px] text-black ">
                Registrar nuevo usuario
              </h3>
            </div>
            <form onSubmit={handleRegister}>
              <div className="p-3 sm:p-6.5">
                <div className="mb-4.5 flex flex-col gap-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black ">
                        Nombres
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingresar Nombre"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                      />
                      {error.nombre && (
                        <span className="text-red-500">{error.nombre}</span>
                      )}
                    </div>

                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Ingresar Apellidos"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.fullname && (
                        <span className="text-red-500">{error.fullname}</span>
                      )}
                    </div>
                    <div className="w-full ">
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
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.telf && (
                        <span className="text-red-500">{error.telf}</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                    <div className="w-full ">
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
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.brand && (
                        <span className="text-red-500">{error.brand}</span>
                      )}
                    </div>
                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                        Usuario
                      </label>
                      <input
                        type="email"
                        id="user"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        placeholder="Ingresa un correo electrónico"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.user && (
                        <span className="text-red-500">{error.user}</span>
                      )}
                    </div>
                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingresar contraseña"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.password && (
                        <span className="text-red-500">{error.password}</span>
                      )}
                    </div>

                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                        Repetir contraseña
                      </label>
                      <input
                        type="password"
                        placeholder="Repite la contraseña"
                        id="repeatPassword"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
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
                    <div>
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                        Foto de Perfil
                      </label>
                      <input
                        type="file"
                        required
                        name="foto"
                        accept=".png, .jpg, .jpeg, .webp"
                        onChange={handleChange}
                        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.foto && (
                        <span className="text-red-500">{error.foto}</span>
                      )}
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
                  <button className="flex  justify-center rounded font-bold bg-primary p-3  text-gray hover:bg-opacity-90">
                    Guardar usuario
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
