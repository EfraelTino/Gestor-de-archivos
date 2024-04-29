import axios from "axios";
const APIBASE = "http://localhost/tupodcast/backend/conexion/actions.php";
axios.defaults.withCredentials = true;
export const LoginUser = async (data) => {
    try {
        return await axios.post(APIBASE, data);
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}