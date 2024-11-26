import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationPageLogoSide from "../AuthenticationPageLogoSide";



const ForgotPasswordComponent: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    /**
     * this dictionary will test if all the requirements are fulfilled or not
     */
    const handlePassword =(e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    /**
     * this method handles the submit functionality
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!/[@.]/.test(email)) {
            setAlertMsg("Sign Up fail: Not a vaild Email")
        }
        //TODO need to add logic to go to change password route. When user submits teh change password, it will return the user id 
        navigate('/auth/change-password/tempId')
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
                    <label>Email:</label>
                    <input className='input' type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
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
export default ForgotPasswordComponent;