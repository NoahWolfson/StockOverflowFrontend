import React, {useEffect} from "react";
import {MessageData} from "../QuestionPageService";
import './Message.css'
type MessageComponentProps = {
    msg: MessageData,
    setReplyMessage: React.Dispatch<React.SetStateAction<MessageData | undefined>>;
}
const MessageComponent: React.FC<MessageComponentProps> = (props) => {
    const clickReply = () =>{
        props.setReplyMessage(props.msg);
    }
    return (<div className = "MessageComponent">
        <h5 className="MessageHeader">{props.msg.Username} at {props.msg.Date_Created.toString()}</h5>
        <div className={"MessageText"}>{props.msg.Text}</div>
        <div className="MessageButtons">
            <button className="LikeButton">Likes: {props.msg.Likes}</button>
            <button className = "ClearLike">Clear Like/Dislike</button>
            <button className="DislikeButton">Dislikes: {props.msg.Dislikes}</button>
            <button className="ReplyButton" onClick={clickReply}>Click to Reply</button>
        </div>
    </div>)
}
export default MessageComponent;