import { format } from 'date-fns';
import { es } from 'date-fns/locale/es'; // Importa la configuración regional para español


export   const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  export const validateLength = (text, minLength) => {
    return text.length > minLength;
  };

  export const fechaActual = (fecha) => {
    const fechaFormateada = format(new Date(fecha), "dd 'de' MMMM yyyy", { locale: es });
    return fechaFormateada;
  }
  export const aleatorioText = () =>{
    const random = Math.random().toString(36).substring(2,12)
    return random;
  } 