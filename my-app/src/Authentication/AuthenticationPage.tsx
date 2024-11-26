import React, {useState} from "react";
import SignUp from "./SignUpRoutes/SignUp";
import './Authentication.css'
import { useParams } from "react-router-dom";
import LoginInComponent from "./LoginRoutes/LoginComponent";
import ForgotPasswordComponent from "./ForgotPasswordRoutes/ForgotPasswordComponent";
import AuthenticationPageLogoSide from "./AuthenticationPageLogoSide";
import AuthenticationRoutes from "./AuthenticationRoutes";

type AuthType = {
    authType: string;
}

const AuthenticationComponent: React.FC = () => {
    const { authType } = useParams<AuthType>();

    return (
        <AuthenticationRoutes/>
    )
}
export default AuthenticationComponent;