import axios from "axios";
const APIBASE = "http://localhost/tupodcast/backend/conexion/actions.php";
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