import React, {useState} from "react";
import { Link } from "react-router-dom";
import AuthenticationPageLogoSide from "../AuthenticationPageLogoSide";


const ChangePasswordComponent: React.FC = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const passwordRequirements = [
        {id: 'req1', text: "Password must be 8 characters long", test: (pw: string) => {return pw.length >= 8}},
        {id: 'req2', text: "Password must have a number", test: (pw: string) => {return /\d/.test(pw)}},
        {id: 'req3', text: "Password must have one capital letter", test: (pw: string) => {return /[A-Z]/.test(pw)}},
        {id: 'req4', text: "Password must have one Special Character", test: (pw:string) => {return /[!@#$%^&*(),.?":{}|<>]/.test(pw)}}
    ]
    const handlePassword =(e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    /**
     * this method handles the submit functionality
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordRequirements.map((req) => {
            if (!req.test(password)) {
                setAlertMsg("Error: Check Password Requirements");
            }
        })
        if (confirmPassword !== password) {
            setAlertMsg("Error: Passwords dont match")
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
            <div className="passwordField">
                    <div className="requirements">
                        <ul>
                            {passwordRequirements.map((req) => (
                            <li key={req.text} className={req.test(password) ? 'valid' : 'invalid'}>
                                {req.text}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="inputFieldContainer">
                        <label>Password:</label>
                        <input className='input' type="password" value={password} onChange={handlePassword}></input>
                    </div>
                </div>
                <div className="inputFieldContainer">
                    <label>Confirm Password:</label>
                    <input className='input' type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
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