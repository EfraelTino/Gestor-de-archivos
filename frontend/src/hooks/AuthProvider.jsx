import { useMemo, createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
const AuthContext = createContext();
export const AuthProvider =({ children }) => {
    const [user, setuser] = useLocalStorage("user", null);
    const [podcasts, setPodcasts] = useLocalStorage("podcasts", null); // Cambiado el nombre del localStorage
    const navigate = useNavigate();
    const login = async (data)=>{
        setuser(data);
        navigate("/dashboard");
    }
    const logout = async ()=>{
        setuser(null);
        navigate ("/", {replace:true});
    }
   const updatePodcasts = async (data) =>{
    setPodcasts(data);
   }

    const value = useMemo(
        ()=>({
            user,
            login,
            logout,
            // contexto de podcast
            podcasts,
            updatePodcasts
        }),
        [user, podcasts]
    )

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



export const userAuth =()=>{
    return useContext(AuthContext);
}