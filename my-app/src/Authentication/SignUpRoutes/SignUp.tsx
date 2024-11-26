import React, {useState} from "react";
import "./SignUp.css"
import { Link } from "react-router-dom";
import AuthenticationPageLogoSide from "../AuthenticationPageLogoSide";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUserame] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    /**
     * this dictionary will test if all the requirements are fulfilled or not
     */
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
                setAlertMsg("Sign Up fail: Check Password Requirements");
            }
        })
        if (!/[@.]/.test(email)) {
            setAlertMsg("Sign Up fail: Not a vaild Email")

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
                <h2 className="authTitle">Sign Up</h2>
            </div>
            <form className="signupForm form" onSubmit={handleSubmit}>
                <div className="inputFieldContainer">
                    <label>Email:</label>
                        <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    
                </div>
                <div className="inputFieldContainer">
                    <label>UserName:</label>
                        <input  className='input' type="text" value={username} onChange={(e) => setUserame(e.target.value)}></input>
                    
                </div>
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
                <div className="submitContainer">
                    <button type="submit" className="submit">Sign Up</button>
                </div>
            </form>
            <div className="auth_router">
                <p className="auth_router_text">Already Have an Account? <Link className='auth_link_link' to='/auth/login'>Login</Link></p>
            </div>
        </div>
            </div>
        </div>
    )
   

}
export default SignUp;