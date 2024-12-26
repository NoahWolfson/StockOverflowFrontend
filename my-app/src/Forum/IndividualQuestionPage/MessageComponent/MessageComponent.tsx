import React, {useEffect} from "react";
import QuestionPageService, {MessageData} from "../QuestionPageService";
import './Message.css'
import {AuthType} from "../../../Interfaces/AuthType";
import {Link} from "react-router-dom";
type MessageComponentProps = {
    msg: MessageData,
    setReplyMessage: (msg: MessageData) => void,
    setIsAuthorized: (auth: AuthType) => void,
}
const MessageComponent: React.FC<MessageComponentProps> = (props) => {
    const handleReply= () =>{
        props.setReplyMessage(props.msg);
    }
    const handleLike = async() =>{
        await QuestionPageService.likeMessage(props.msg._id,props.setIsAuthorized);
    }
    const handleDislike = async () =>{
        await QuestionPageService.dislikeMessage(props.msg._id, props.setIsAuthorized);
    }
    const handleClear = async() =>{
        await QuestionPageService.clearLikeMessage(props.msg._id, props.setIsAuthorized);
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