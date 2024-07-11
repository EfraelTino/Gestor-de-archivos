import axios from "axios";
// const APIBASE = "https://backend.tupodcast.pe/conexion/actions.php";
const APIBASE = "http://localhost/tupodcast/api/conexion/actions.php";
axios.defaults.withCredentials = true;
export const getPodcastUserGeneral = async (data) => {
    try {
        return await axios.post(APIBASE, data);
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}

export const getPodcastUsuario = async (data) =>{
    try {
        return await axios.post(APIBASE, data);
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}

export const getSuggestion = async (data) => {
    try {
        return await axios.post(APIBASE, data)
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}

export const insertSugerencia = async (data) =>{
    try {
        return await axios.post(APIBASE, data)
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}
export const deleteSugerencia = async (data) =>{
    try {
        return await axios.post(APIBASE, data)
    } catch (error) {
        console.log("Error en axios: ",error)
    }
}

export const getFormulario = async (data) =>{
    try {
        return await axios.post(APIBASE, data);
    } catch (error) {
        console.log("Error en axios: ",error);
    }
}

export const insertFormulario = async(data) =>{
    try {
        return await axios.post(APIBASE, data);
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}