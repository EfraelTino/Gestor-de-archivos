export const validarToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString ? JSON.parse(atob(tokenString.split('.')[1])).exp * 1000 > Date.now() : false;
}

