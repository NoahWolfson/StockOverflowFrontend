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
            <h5 className="ReplyBoxButtons">
                <button className="HideReplyBox" onClick={hideBox}>Hide Reply</button>
                <button className="ShowReplyBox" onClick={showBox}>Show Reply</button>
            </h5>
            <label className="ReplyBoxLabel">{"Replying to " + props.messageData.Username}
                {show ? ( <textarea className="replyTextArea"></textarea>) : null}
            </label>
        </div>);
}
export default ReplyBoxComponent;