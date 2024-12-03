import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationPageLogoSide from "../AuthenticationPageLogoSide";
import AtuhAPIService from "../AuthBackendRoutes";



const ForgotPasswordComponent: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
  
    /**
     * this method handles the submit functionality
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/[@.]/.test(email)) {
            setAlertMsg("Sign Up fail: Not a vaild Email")
        }
        try {
            const response = await AtuhAPIService.ForgotPassword(email);
            if (response.status === 422) {
                setAlertMsg(response.msg)
            } else {
                navigate(`/auth/change-password/${response.accountId}`)
            }
        } catch (error) {

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
                    <label>Email:</label>
                    <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
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