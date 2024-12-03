import React, {useEffect} from "react";
import {MessageData} from "../QuestionPageService";
import './Message.css'
const MessageComponent: React.FC<MessageData> = (msg) => {
    return (<div className = "MessageComponent">
        <h5 className="MessageHeader">{msg.Username} at {msg.Date_Created.toString()}</h5>
        <div className={"MessageText"}>{msg.Text}</div>
        <div className="MessageButtons">
            <button className="LikeButton">Likes: {msg.Likes}</button>
            <button className = "ClearLike">Clear Like/Dislike</button>
            <button className="DislikeButton">Dislikes: {msg.Dislikes}</button>
            <button className="ReplyButton">Click to Reply</button>
        </div>
    </div>)
}
export default MessageComponent;