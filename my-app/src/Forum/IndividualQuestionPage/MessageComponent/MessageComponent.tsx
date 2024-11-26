import React, {useEffect} from "react";
import axios from "axios";
import QuestionPageService from "../QuestionPageService";

interface MessageData{
    _id: string;
    Account: string;
    Replies: [string];
    Date_created: Date;
    RepliedTo: [string];
    Likes: number;
    Dislikes: number;
    Text: string;
}
const MessageComponent: React.FC<MessageData> = (msg) => {
    const[data, setData] = React.useState<MessageData>(msg);
    useEffect(() => {
        const getMessageData = setInterval(async()=>{
            setData(await QuestionPageService.getMessage(data._id));
        })
    }, []);
    return (<div key = {data._id} className = "MessageComponent">{msg.Text}</div>)
}
export default MessageComponent;