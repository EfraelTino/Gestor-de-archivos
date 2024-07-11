import CryptoJS from 'crypto-js';

export const validarToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString ? JSON.parse(atob(tokenString.split('.')[1])).exp * 1000 > Date.now() : false;
}


export const encryptId = (id) => {
    const encryptedId = CryptoJS.AES.encrypt(id.toString(), 'clave_secreta').toString();
    return encodeURIComponent(encryptedId); // Codificar para que sea URL-safe
  };

  export const decryptId = (encryptedId) => {
    // Decodificar la cadena URL segura
    const decodedId = decodeURIComponent(encryptedId);
    
    // Clave secreta utilizada para la encriptación
    const secretKey = 'clave_secreta';
  
    // Desencriptar la cadena utilizando la clave secreta
    const bytes  = CryptoJS.AES.decrypt(decodedId, secretKey);
    const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
  
    // Devolver el ID desencriptado
    return decryptedId;
  };

  // formUtils.js

export const getForm = async (id, getFormulario, navigate, setFormEstado, setDataPodcast) => {
    try {
      const formData = new FormData();
      formData.append("action", "getformulariouser");
      formData.append("id_usuario", id);
      const response = await getFormulario(formData);
      const datas = response.data;
  
      console.log("datas", datas);
      if (datas.success == false) {
        navigate("/dashboard");
        setFormEstado(false);
      } else {
        console.log("entro al else");
        const activo = datas.message[0].activo;
        if (activo) {
          setDataPodcast(datas)
          setFormEstado(true);
        } else {
          setFormEstado("");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log("error en catch: ", error);
    }
  };
  
  export   const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  export const validateLength = (text, minLength) => {
    return text.length > minLength;
  };