import React, {useEffect} from "react";
import QuestionPageService from "../QuestionPageService";
import './Message.css'
import {AuthType} from "../../../Interfaces/AuthType";
import {Link, useNavigate} from "react-router-dom";
import {MessageData} from "../../MessageTypes";
type MessageComponentProps = {
    msg: MessageData,
    setReplyMessage: (msg: MessageData) => void,
    setAuth: (auth: AuthType) => void,
}
const MessageComponent: React.FC<MessageComponentProps> = (props) => {
    const navigate = useNavigate();
    const handleReply= () =>{
        props.setReplyMessage(props.msg);
    }
    const handleLike = async() =>{
        const success = await QuestionPageService.likeMessage(props.msg._id,props.setAuth);
        if(!success){
            navigate("/auth/login");
        }
    }
    const handleDislike = async () =>{
       const success=  await QuestionPageService.dislikeMessage(props.msg._id, props.setAuth);
       if(!success){
            navigate("/auth/login");
       }
    }
    const handleClear = async() =>{
        const success = await QuestionPageService.clearLikeMessage(props.msg._id, props.setAuth);
        if(!success){
            navigate("/auth/login");
        }
    }
    return (<div className = "MessageComponent">
        <h5 className="MessageHeader"><Link to={"/user/" + props.msg.Account + "/profile"}>{props.msg.Username}</Link> at {new Date(props.msg.Date_Created).toLocaleString()}</h5>
        <div className={"MessageText"}>{props.msg.Text}</div>
        <div className="MessageButtons">
            <button className="LikeButton" onClick={handleLike}>Likes: {props.msg.Likes}</button>
            <button className = "ClearLikeButton" onClick={handleClear}>Clear Like/Dislike</button>
            <button className="DislikeButton" onClick={handleDislike}>Dislikes: {props.msg.Dislikes}</button>
            <button className="ReplyButton" onClick={handleReply}>Click to Reply</button>
        </div>
    </div>)
}
export default MessageComponent;