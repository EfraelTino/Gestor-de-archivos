import { useState } from "react";
import { userAuth } from "../hooks/AuthProvider";
import Header from "./Header/Header";
import { Navigate, Outlet } from "react-router-dom"; // Importa Outlet para renderizar rutas anidadas
import Sidebar from "./Sidebar";

export const ProtectedLayout = ({ children }) => {
  const { user } = userAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/" />;
  }
  console.log('sidebar: ', sidebarOpen)
  return (
    <div className=" h-full">
      <div className="flex h-full overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} className= {sidebarOpen ? `w-0` : `w`}/>
        <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ${ sidebarOpen ? 'w-full':''}` }>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className={`mx-auto max-w-screen-2xl p-4 md:p-6 sm:mb-0 mb-32` }>
              <Outlet /> {/* Renderiza las rutas anidadas */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
