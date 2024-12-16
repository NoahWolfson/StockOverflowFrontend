import React, {useEffect} from "react";
import QuestionPageService, {MessageData} from "../QuestionPageService";
import './Message.css'
import { AuthType } from "../../../Interfaces/AuthType";
type MessageComponentProps = {
    msg: MessageData,
    setReplyMessage: (msg: MessageData) => void,
    setIsAuthorized: (isAuthorized: AuthType) => void,
}
const MessageComponent: React.FC<MessageComponentProps> = (props) => {
    const handleReply= () =>{
        props.setReplyMessage(props.msg);
        console.log("child clicked");
    }
    const handleLike = () =>{
        QuestionPageService.likeMessage(props.msg._id);
    }
    return (<div className = "MessageComponent">
        <h5 className="MessageHeader">{props.msg.Username} at {props.msg.Date_Created.toString()}</h5>
        <div className={"MessageText"}>{props.msg.Text}</div>
        <div className="MessageButtons">
            <button className="LikeButton" onClick={handleLike}>Likes: {props.msg.Likes}</button>
            <button className = "ClearLike">Clear Like/Dislike</button>
            <button className="DislikeButton">Dislikes: {props.msg.Dislikes}</button>
            <button className="ReplyButton" onClick={handleReply}>Click to Reply</button>
        </div>
    </div>)
}
export default MessageComponent;