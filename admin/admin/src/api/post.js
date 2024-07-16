import axios from "axios";
// const APIBASE = "https://api.tupodcast.pe/conexion/admin.php";
const APIBASE = "http://localhost/tupodcast/api/conexion/admin.php";
axios.defaults.withCredentials = true;
export const getUsers = async (data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("Error en axios: ", error);
  }
};
export const searchUsers = async (data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("Error en axios: ", error);
  }
};
export const addUser = async (data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("error en axios: ", error);
  }
};
export const activeUser = async (data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("error en axios: ", error);
  }
};
export const getUserForId = async (data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("error en axios: ", error);
  }
};
export const updatePhotoUser = async (data) => {
    try {
      return await axios.post(APIBASE, data);
    } catch (error) {
      console.log("error en axios: ", error);
    }
  };
  
  export const updateDataUser = async (data) => {
    try {
      return await axios.post(APIBASE, data);
    } catch (error) {
      console.log("error en axios: ", error);
    }
  };

  // FORMULARIOS
  export const getDatas = async (data) => {
    try {
      return await axios.post(APIBASE, data);
    } catch (error) {
      console.log("error en axios: ", error);
    }
  };
  export const downloadForm = async (data) => {
    try {
      const response = await axios.post(APIBASE, data, {
        responseType: 'blob', // Importante para manejar la respuesta binaria
      });
      return response;
    } catch (error) {
      console.log("error en axios: ", error);
    }
  };
