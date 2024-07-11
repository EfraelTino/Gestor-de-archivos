import React from 'react'
import { userAuth } from '../hooks/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export const HomeLayout = () => {
    const {user} = userAuth();
    if(user){
        return <Navigate to="dashboard/profile"/>
    }
  return (
    <div>
        <NavBar />
        <Outlet />
    </div>

  )
}
