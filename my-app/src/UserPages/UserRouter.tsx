import React from "react";
import { Routes, Route } from "react-router-dom";
import UserEditProfilePage from "./UserEditPage/UserEditProfilePage";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import { useAuth } from "../useAuth";


const UserRouter: React.FC = () => {
  const { setIsAuthenticated } = useAuth(); 
  return (
    <Routes>
      <Route path=":accountId/profile" element={<UserProfilePage setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path=":accountId/edit-profile" element={<UserEditProfilePage setIsAuthenticated={setIsAuthenticated}/>} />
    </Routes>
  );
};

export default UserRouter;