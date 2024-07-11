import React from 'react'
import { userAuth } from '../hooks/AuthProvider'
import { Navigate } from 'react-router-dom';

export const AdminProtectedRoute = () => {
    const {user} = userAuth();
    if (!user || !user.result.tipo == "0") {
        // Redirigir a la página de login si no está autenticado o no es admin
        // return <Navigate to="/" />;
      }
    console.log(user.result.tipo)
      return children;
}
