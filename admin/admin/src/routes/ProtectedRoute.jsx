import React from 'react'
import { userAuth } from '../hooks/AuthProvider'
import { Navigate } from 'react-router-dom';

export const  ProtectedRoute = ({ children }) => {
 const {user} = userAuth();
 if(!user){
    // Si el usuario no está autenticando
    return <Navigate to ="/" />;
 }
 return children
}
