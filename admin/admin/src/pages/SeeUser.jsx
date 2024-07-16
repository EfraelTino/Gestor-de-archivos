import React, { useEffect, useState } from "react";
import { TitleItem } from "../components/TitleItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDatas } from "../api/post";
import { BiEdit } from "react-icons/bi";
import { fechaActual } from "../util/util";
import { ToastContainer, toast } from "react-toastify";
const API = "http://localhost/tupodcast/api/assets/profiles/";
export const SeeUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataEdit, setDataEdit] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true); // Estado para controlar la visibilidad del botón de editar
  const [foto, setFoto] = useState(null); // Estado para la nueva foto
  const [user, setUser] = useState([]);
  // BUSQUEDA DE USUARIO
  useEffect(() => {
    // Verificar si no hay id o si id es una cadena vacía
    const getUser = async () => {
      const formData = new FormData();
      formData.append("action", "user_for_id");
      formData.append("iduser", id);
      const result = await getDatas(formData);
      const data = result.data;

      if (!data.success) {
        return navigate("/panel");
      }
      setUser(data.message);
    };
    getUser();
  }, [id, navigate, foto]);
  const handleEdit = () => {
    setDataEdit(true);
    setShowEditButton(false);
  };
  const handleFoto = (e) => {
    const file = e.target.files[0];
    setFoto(file); // Guardar el archivo subido en el estado
  };
  const handleChagePhoto = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("action", "update_photo");
    formdata.append("iduser", parseInt(id));
    formdata.append("foto", foto);
    const response = await getDatas(formdata);
    const data = response.data;
    if (!data.success) {
      toast.error("Error, intenete de nuevo");
      return;
    }
    navigate("/panel");
  };
  return (
    <>
      <TitleItem pageName="Datos del usuario" />
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default  ">
            {user.map((item, index) => (
              <div key={index}>
                <div className="border-b border-stroke py-4 px-6.5 ">
                  <div className="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-4 items-center">
                    <h3 className="font-medium text-black text-center sm:text-left  col-span-1 sm:col-span-3 ">
                      Datos del usuario -{" "}
                      <strong className="uppercase">{`${item.nombre} ${" "} ${
                        item.apellido
                      }`}</strong>
                    </h3>
                    <Link
                      to={`/panel/edit-user/${item.id}`}
                      className="col-span-1 flex items-center justify-center rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 "
                    >
                      <BiEdit className="text-xl" /> Editar
                    </Link>
                  </div>
                </div>

                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 items-center justify-center">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="mb-3 block text-black font-bold">
                          Foto de Perfil
                        </label>
                        <span className="h-12 w-12 rounded-full">
                          <img
                            src={
                              foto
                                ? URL.createObjectURL(foto)
                                : `${API}${item.imagen_profile}`
                            }
                            alt="User"
                            className="bg-slate-100 object-cover rounded-full h-28 w-28 flex items-center"
                          />
                        </span>
                      </div>
                      <div className="col-span-2">
                        {showEditButton && ( // Renderizado condicional del botón de editar
                          <button
                            onClick={handleEdit}
                            className="col-span-1 flex items-center justify-center rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8"
                          >
                            <BiEdit className="text-xl" /> Editar
                          </button>
                        )}
                        {dataEdit && (
                          <form action="" onSubmit={handleChagePhoto}>
                            <div className="grid grid-cols-1   sm:grid-cols-3 gap-3">
                              <input
                                type="file"
                                required
                                name="foto"
                                accept=".png, .jpg, .jpeg, .webp"
                                onChange={handleFoto}
                                className="w-full sm:col-span-2 rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  "
                              />
                              <button className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                                Actualizar
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Nombres
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          {item.nombre}
                        </p>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Apellidos
                        </label>
                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          {item.apellido}
                        </p>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block font-bold text-black ">
                          Teléfono de contacto
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          {item.telf ? item.telf : "S/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Nombre de la marca y/o emprendimiento
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          {item.nombre_cliente}
                        </p>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                          Usuario
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          {item.email}
                        </p>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                          Contraseña
                        </label>
                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          **********
                        </p>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Repetir contraseña
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                          **********
                        </p>
                      </div>
                      <div>
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                          Fecha del primer pago
                        </label>
                        <div className="relative">
                          <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary hover:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter   ">
                            {fechaActual(item.fecha)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
