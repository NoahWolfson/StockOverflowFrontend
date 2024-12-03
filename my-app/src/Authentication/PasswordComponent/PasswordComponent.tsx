import React, { useState } from "react";

interface ChangePassword  {
    onPasswordChange: (password: string) => void;
}

/**
 * this component handles all the front end logi regarding the password 
 * @param param0 a callback of what the password is 
 * @returns 
 */
const PasswordComponent: React.FC<ChangePassword> = ({onPasswordChange}) => {
    const [password, setPassword] = useState("");
    const passwordRequirements = [
        {id: 'req1', text: "Password must be 8 characters long", test: (pw: string) => {return pw.length >= 8}},
        {id: 'req2', text: "Password must have a number", test: (pw: string) => {return /\d/.test(pw)}},
        {id: 'req3', text: "Password must have one capital letter", test: (pw: string) => {return /[A-Z]/.test(pw)}},
        {id: 'req4', text: "Password must have one Special Character", test: (pw:string) => {return /[!@#$%^&*(),.?":{}|<>]/.test(pw)}}
    ]
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        onPasswordChange(newPassword); // Use the current input value
    };

    return (
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
    )


}
export default PasswordComponent;