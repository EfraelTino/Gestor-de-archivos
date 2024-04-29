


import { userAuth } from '../hooks/AuthProvider'
import NavBar from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';

export const  ProtectedLayout = () => {
    const { user} = userAuth();
  
    if (!user) {
      return <Navigate to="/" />;
    }
  return (
    <div>
        <NavBar/>
        <Outlet />
    </div>
  )
}
