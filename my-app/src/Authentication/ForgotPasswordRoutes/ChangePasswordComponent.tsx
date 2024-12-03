import React, {useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthenticationPageLogoSide from "../AuthenticationPageLogoSide";
import PasswordComponent from "../PasswordComponent/PasswordComponent";
import AtuhAPIService from "../AuthBackendRoutes";

type UserIdParams = {
    userId?: string
}

const ChangePasswordComponent: React.FC = () => {
    const navigate = useNavigate();
    const {userId} = useParams<UserIdParams>();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [verificationCode, setVerificationCode] = useState("")
    const passwordRequirements = [
        {id: 'req1', text: "Password must be 8 characters long", test: (pw: string) => {return pw.length >= 8}},
        {id: 'req2', text: "Password must have a number", test: (pw: string) => {return /\d/.test(pw)}},
        {id: 'req3', text: "Password must have one capital letter", test: (pw: string) => {return /[A-Z]/.test(pw)}},
        {id: 'req4', text: "Password must have one Special Character", test: (pw:string) => {return /[!@#$%^&*(),.?":{}|<>]/.test(pw)}}
    ]
    const handlePassword =(newPassword: string) => {
        setPassword(newPassword);
    }
    /**
     * this method handles the submit functionality
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        passwordRequirements.map((req) => {
            if (!req.test(password)) {
                setAlertMsg("Error: Check Password Requirements");
            }
        })
        if (confirmPassword !== password) {
            setAlertMsg("Error: Passwords dont match")
        }
        try {
            const response: any = await AtuhAPIService.PostForgotPassword(password, confirmPassword, verificationCode, userId);
            if (response.status === 422 || response.status === 500) {
                setAlertMsg(response.msg)
            }
            else {
                //navigate back to login
                navigate('/auth/login')
            }
        } catch (error) {
            console.log(error)
        }

    }
    /**
     * this method handles the password functi
     */
    return (
        <div className="authDiv">
            <AuthenticationPageLogoSide/>
            {/* Right Side: Form */}
            <div className="the_form">
            <div className="signUpComponent">
            <div className={alertMsg !== "" ? "alertComponent" : "noAlertComponent"}>
                {alertMsg !== "" ? <p className="alertMsg">{alertMsg}</p>: <p></p>}
            </div>
            <div className="authTitleComponent">
                <h2 className="authTitle">Forgot Password</h2>
            </div>
            <form className="signupForm form" onSubmit={handleSubmit}>
                <div className="inputFieldContainer">
                    <label>Verification Code:</label>
                    <input className='input' type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}></input>
                </div>
            <PasswordComponent onPasswordChange={handlePassword}/>
                <div className="inputFieldContainer">
                    <label>Confirm Password:</label>
                    <input className='input' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div className="submitContainer">
                    <button type="submit" className="submit">Reset Password</button>
                </div>
            </form>
        
        </div>
            </div>
        </div>
    )
 

}
export default ChangePasswordComponent;