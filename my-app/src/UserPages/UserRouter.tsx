import React from "react";
import { Routes, Route } from "react-router-dom";
import UserEditProfilePage from "./UserEditPage/UserEditProfilePage";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import { useOutletContext } from 'react-router-dom';
import { useAuth } from "../useAuth";


const UserRouter: React.FC = () => {
  const { setIsAuthenticated } = useAuth(); 
  return (
    <Routes>
      <Route path=":userId/profile" element={<UserProfilePage setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path=":userId/edit-profile" element={<UserEditProfilePage setIsAuthenticated={setIsAuthenticated}/>} />
    </Routes>
  );
};

export default UserRouter;