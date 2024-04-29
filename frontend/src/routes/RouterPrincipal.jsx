import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../components/ProtectedLayout";
import { Profile } from "../pages/Profile";
import { Login } from "../pages/Login";
import { Error } from "../pages/Error";
import { FormularioInvitados } from "../pages/FormularioInvitados";
import Principal from "../pages/Principal";
import { PodcastComponent } from "../components/PodcastComponent";

export const RouterPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error />} />
      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route index element={<Principal />} />
        <Route path="profile" element={<Profile />} />
        <Route path="formulario" element={<FormularioInvitados />} />
        <Route path="podcast/:number" element={<PodcastComponent />} />
      </Route>
    </Routes>
  );
};
