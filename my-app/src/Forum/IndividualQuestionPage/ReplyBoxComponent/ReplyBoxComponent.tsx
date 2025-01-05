import React, {useEffect} from "react";
import QuestionPageService from "../QuestionPageService";
import * as timers from "node:timers";
import './ReplyBox.css'
import {AuthType} from "../../../Interfaces/AuthType";
import {MessageData} from "../../MessageTypes";
import {useNavigate} from "react-router-dom";
type ReplyBoxComponentProps = {
    messageData: MessageData;
    setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
}
const ReplyBoxComponent: React.FC<ReplyBoxComponentProps> = ({messageData,setAuth})=>{
    const navigate = useNavigate();
    const [text, setText] = React.useState('');
    const [show, setShow] = React.useState(true);
    const hideBox = ()=>{
        setShow(false);
    }
    const showBox = ()=>{
        setShow(true);
    }
    const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };
    const handlePost = async() =>{
        const success = await QuestionPageService.postReply(messageData._id,`@${messageData.Username} ` +text,setAuth);
        setText("");
        if(!success){
            navigate("/auth/login");
        }
    }
    return (
        <div className="ReplyBox">
            <h5 className="ReplyBoxButtons">
                <button className="HideReplyBox" onClick={hideBox}>Hide Reply</button>
                <button className="ShowReplyBox" onClick={showBox}>Show Reply</button>
                <button className = "Post Reply" onClick={handlePost}>Post Reply</button>
            </h5>
            {show ? (<label className="ReplyBoxLabel">{"Replying to " + messageData.Username}
            </label>): null}
            {show ? ( <textarea className="ReplyTextArea" value={text} onChange={changeText}></textarea>) : null}
        </div>);
}
export default ReplyBoxComponent;