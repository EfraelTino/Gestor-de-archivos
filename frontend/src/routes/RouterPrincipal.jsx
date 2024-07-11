import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../components/user/ProtectedLayout";
import { Profile } from "../pages/Profile";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";
import { FormularioInvitados } from "../pages/FormularioInvitados";
import Principal from "../pages/Principal";
import { PodcastComponent } from "../components/user/PodcastComponent";
import { Deuda } from "../components/user/Deuda";
import { Congratulation } from "../components/user/Congratulation";

export const RouterPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error />} />
      <Route path="/deuda" element={<Deuda />} />
      <Route path="/felicidades" element={<Congratulation />} />
      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route index element={<Principal />} />
        <Route path="profile" element={<Profile />} />

        <Route
          path="formulario/:iduser/:podcastid"
          element={<FormularioInvitados />}
        />
        <Route path="podcast/:number" element={<PodcastComponent />} />
      </Route>
    </Routes>
  );
};
