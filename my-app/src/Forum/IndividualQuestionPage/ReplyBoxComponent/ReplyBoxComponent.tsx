import React, {useEffect} from "react";
import QuestionPageService, {MessageData} from "../QuestionPageService";
import * as timers from "node:timers";
import './ReplyBox.css'
import {AuthType} from "../../../Interfaces/AuthType";
type ReplyBoxComponentProps = {
    messageData: MessageData;
    setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
}
const ReplyBoxComponent: React.FC<ReplyBoxComponentProps> = ({messageData,setAuth})=>{
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
        await QuestionPageService.postReply(messageData._id,text,setAuth)
    }
    return (
        <div className="ReplyBox">
            <h5 className="ReplyBoxButtons">
                <button className="HideReplyBox" onClick={hideBox}>Hide Reply</button>
                <button className="ShowReplyBox" onClick={showBox}>Show Reply</button>
                <button className = "PostButton" onClick={handlePost}>Post Reply</button>
            </h5>
            {show ? (<label className="ReplyBoxLabel">{"Replying to " + messageData.Username}
            </label>): null}
            {show ? ( <textarea className="replyTextArea" value={text} onChange={changeText}></textarea>) : null}
        </div>);
}
export default ReplyBoxComponent;