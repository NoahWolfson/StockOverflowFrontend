import React, {useEffect} from "react";
import QuestionPageService, {MessageData} from "../QuestionPageService";
import * as timers from "node:timers";
type ReplyBoxComponentProps = {
    messageData: MessageData;
}
const ReplyBoxComponent: React.FC<ReplyBoxComponentProps> = (props)=>{
    const [show, setShow] = React.useState(true);
    const hideBox = ()=>{
        setShow(false);
    }
    const showBox = ()=>{
        setShow(true);
    }
    return (
        <div className="ReplyBox">
            <h1 className="ReplyBoxHeader">Replying to {props.messageData.Username}</h1>
            (show && <textarea className="replyTextArea">)
        </textarea>
        </div>)
}