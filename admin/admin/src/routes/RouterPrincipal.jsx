import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { ProtectedLayout } from "../components/ProtectedLaout";
import { Error } from "../components/Error";
import Principal from "../pages/Principal";
import { AddUser } from "../pages/AddUser";
import { EditUser } from "../pages/EditUser";
import { SeeUser } from "../pages/SeeUser";
import { Forms } from "../pages/Forms";
import { Podcasts } from "../pages/Podcasts";
import LandingPage from "../components/Landing";
import { ClientPodcast } from "../components/ClientPodcast";
import { DescriptionPodcast } from "../components/DescriptionPodcast";
import { AddPodcast } from "../components/AddPodcast";
import { NewEpisode } from "../pages/NewEpisode";

export const RouterPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error />} />
      <Route path="/landing" element={<LandingPage />} />

      <Route path="/panel" element={<ProtectedLayout />}>
        <Route index element={<Principal />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="see-user/:id" element={<SeeUser />} />
        <Route path="formularios" element={<Forms />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="new-episode" element={<NewEpisode />} />
        <Route path="podcasts/client" element={<ClientPodcast />} />
        <Route path="podcasts/client/see-podcast" element={<DescriptionPodcast />} />
        <Route path="podcasts/client/add-podcast" element={<AddPodcast />} />

      </Route>
    </Routes>
  );
};
