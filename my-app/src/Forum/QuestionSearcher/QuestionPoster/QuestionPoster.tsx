import React, {FormEvent, useEffect, useState} from "react";
import {AuthType} from "../../../Interfaces/AuthType";
import ForumPageService from "../../ForumPageService";
import './QuestionPoster.css'
import {useNavigate} from "react-router-dom";
type isAuthenticated = {
    setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
}
const QuestionPoster : React.FC<isAuthenticated> = ({setAuth}) =>{
    const navigator = useNavigate();
    const [text, setText] = useState("");
    const [show, setShow] = useState(true);
    const postQuestion = async (e: FormEvent)=> {
        e.preventDefault();
        const success = await ForumPageService.postQuestion(setAuth,text);
        setText("");
        if(!success){
            navigator("/auth/login");
        }
    }
    return(
        <div className="QuestionPoster">
            <button className="PostButton" onClick={() => setShow(!show)}>Toggle</button>
            {show ? <form onSubmit={postQuestion} className="QuestionPosterForm">
                <textarea onChange={(e) => setText(e.target.value)} className="QuestionText"></textarea>
                <button type="submit" className="PostButton">Ask Question</button>
            </form> : null}
        </div>)
}
export default QuestionPoster;