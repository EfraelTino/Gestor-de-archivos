import axios from "axios";
// const APIBASE = "https://backend.tupodcast.pe/conexion/actions.php";
const APIBASE = "http://localhost/tupodcast/api/conexion/actions.php";
axios.defaults.withCredentials = true;
export const LoginUser = async (data) => {
    try {
        return await axios.post(APIBASE, data);
    } catch (error) {
        console.log("Error en axios: ", error)
    }
}


// SESSION DESTROY

export const sessionDestroy = async(data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("error en axios: ", error)
  }
}
