import React, {useEffect} from "react";
import axios from "axios";
import QuestionPageService from "../QuestionPageService";
import {MessageData} from "../QuestionPageService";
const MessageComponent: React.FC<MessageData> = (msg) => {
    const[data, setData] = React.useState<MessageData>(msg);
    useEffect(() => {
        const getMessageData = setInterval(async()=>{
            setData(await QuestionPageService.getMessage(data._id));
        })
    }, []);
    return (<div key = {msg._id} className = "MessageComponent">
        <h5 className="MessageHeader">{data.Username} at {data.Date_created.toString()}</h5>
        <p className={"MessageText"}>{data.Text}</p>
        <footer className="MessageButtons">
            <button className="LikeButton">Likes: {data.Likes}</button>
            <button className = "ClearLike">Clear Like/Dislike</button>
            <button className="DislikeButton">Dislikes: {data.Likes}</button>
        </footer>
    </div>)
}
export default MessageComponent;