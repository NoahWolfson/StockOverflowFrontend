import React, {useState} from "react";
import { Link } from "react-router-dom";
import AuthenticationPageLogoSide from "../AuthenticationPageLogoSide";
import AtuhAPIService from "../AuthBackendRoutes";


const LoginInComponent: React.FC = () => {
    const [username, setEmail] = useState("");
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/[@.]/.test(username)) {
            setAlertMsg("Sign Up fail: Not a vaild Email")

        }
        try {
            const respone = await AtuhAPIService.postLogin(username, password);
            console.log(respone)
            if (respone.status === 422) {
                setAlertMsg(respone.msg)
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
                <h2 className="authTitle">Login</h2>
            </div>
            <form className="signupForm form" onSubmit={handleSubmit}>
                <div className="inputFieldContainer">
                    <label>Username or Email:</label>
                        <input className='input' type="text" value={username} onChange={(e) => setEmail(e.target.value)}></input>
            
                </div>
                <div className="inputFieldContainer">
                    <label>Password:</label>
                    <input className='input' type="password" value={password} onChange={handlePassword}></input>
                    <Link to='/auth/forgot-password'>Forgot Password?</Link>
                </div>

                <div className="submitContainer">
                    <button type="submit" className="submit">Login</button>
                </div>
            </form>
            <div className="auth_router">
                <p className="auth_router_text">Don't have an account? <Link className='auth_link_link' to='/auth/signup'>Sign Up</Link></p>
            </div>
        </div>
            </div>
        </div>
    )
   

}
export default LoginInComponent;