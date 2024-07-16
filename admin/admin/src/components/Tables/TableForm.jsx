
import { Loader } from "../Complements/Loader";
import { useState, useEffect } from "react";
import { getDatas, downloadForm  } from "../../api/post"; 
import { toast, ToastContainer } from "react-toastify";
import { BiPowerOff } from "react-icons/bi";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import { AiFillFileExcel } from "react-icons/ai";



export const TableForm = ({ dataSearch }) => {
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "see_forms");
      const response = await getDatas(formData);
      console.log(response);
      if (response.data.code !== 200) {
        setErrors(response.data.message);
        setLoading(false);
      } else {
        setUser(response.data.message);
        setErrors(null);
        setLoading(false);
      }
    };
    const searchUser = async (term) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "search_form");
      formData.append("searchcamp", term);
      const response = await getDatas(formData);
      console.log(response)
      if (response.data.code !== 200) {
        setErrors(response.data.message);
        setLoading(false);
      } else {
        setUser(response.data.message);
        setErrors(null);
        setLoading(false);
      }
    };

    if (dataSearch) {
      searchUser(dataSearch);
    } else {
      getUser();
    }
  }, [dataSearch]);

  const totalPages = Math.ceil(user.length / usersPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleChangeStatus = async (newStatus, datauser) => {


    try {
      const formData = new FormData();
      formData.append("action", "status_form");
      formData.append("status", newStatus == 0 ? 1 : 0);
      formData.append("iduser", datauser);
      const result = await getDatas(formData);
      const response = result.data;
      console.log("res: ", response);

      if (!response.success) {
        toast.error(response.message || "Error al activar usuario");
        return;
      }

      // Actualizar el estado del usuario en la lista de usuarios
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user.id === datauser ? { ...user, is_premium: newStatus } : user
        )
      );

      toast.success(response.message);
      location.reload();
    } catch (error) {
      toast.error("Error al activar usuario");
    }
  };
  const handleDownload = async (id) => {
    try {
      const formdata = new FormData();
      formdata.append('action', 'download_form');
      formdata.append('iduser', id);
      
      const response = await downloadForm(formdata);
      console.log(response)
      if (response && response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cliente.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Limpia el URL del objeto después de la descarga
        a.remove();
        toast.success("Descargando ...")
      } else {
        toast.error("Este usuario no tiene formularios llenados")
      }
    } catch (error) {
      toast.error("Error al descargar archivo, intenta más tarde")
    }
  };
  return (
    <>
      <ToastContainer position="top-center" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default ">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray text-left ">
                <th className="min-w-[20px] py-4 px-4 text-primary font-bold  xl:pl-11">
                  #
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  Nombres
                </th>
                <th className="min-w-[150px] py-4 px-4 text-black font-bold ">
                  Usuario
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Activo
                </th>
                <th className="py-4 px-4 text-black font-bold ">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9 "
                    colSpan={8} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <Loader />{" "}
                    {/* Muestra el loader mientras loading es true */}
                  </td>
                </tr>
              ) : errors ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9 "
                    colSpan={8} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <h5 className="font-bold text-danger">
                      {errors}
                    </h5>
                  </td>
                </tr>
              ) : (
                currentUsers.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <p className="text-primary ">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.id_usuario_formulario}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.email}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {parseInt(item.activo) === 1 ? "Activo" : "Desactivo"}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={()=>handleDownload(item.id)}
                          className="font-bold flex items-center gap-1 bg-green-400 px-2 rounded-[4px] py-1"
                        >
                          <AiOutlineDownload className="text-xl" />

                          Descargar
                          <AiFillFileExcel/>
                        </button>
                        <button
                          onClick={() =>
                            handleChangeStatus(
                              parseInt(item.activo) === 1 ? 0 : 1,
                              item.id
                            )
                          }
                          className={`hover:text-primary p-1 rounded-md ${
                            parseInt(item.activo) === 1
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          <BiPowerOff className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination w-full mt-2">
            <div className="flex justify-end gap-2 items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? `text-black bg-whiter font-normal`
                    : `bg-opacity-10 text-primary bg-primary font-semibold`
                } px-2 rounded`}
              >
                <small className="flex items-center">
                  <BiChevronsLeft />
                  Anterior
                </small>
              </button>
              <span className="rounded-full bg-opacity-10 flex items-center p-1 px-2 text-xs bg-success text-success font-bold">
                {currentPage}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages
                    ? `text-black bg-whiter font-normal`
                    : `bg-opacity-10 text-primary bg-primary font-semibold`
                } px-2 rounded`}
              >
                <small className="flex items-center">
                  Siguiente <BiChevronsRight />
                </small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
