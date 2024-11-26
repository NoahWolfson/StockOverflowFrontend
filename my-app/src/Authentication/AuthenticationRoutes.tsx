import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUpRoutes/SignUp";
import LoginInComponent from "./LoginRoutes/LoginComponent";
import ForgotPasswordComponent from "./ForgotPasswordRoutes/ForgotPasswordComponent";
import ChangePasswordComponent from "./ForgotPasswordRoutes/ChangePasswordComponent";

const AuthenticationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginInComponent/>} />
      <Route path="signup" element={ <SignUp/>} />
      <Route path="forgot-password" element={<ForgotPasswordComponent/>} />
      <Route path="change-password/:userId" element={<ChangePasswordComponent />} />

    </Routes>
  );
};

export default AuthenticationRoutes;