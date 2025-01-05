import MessageComponent from "../MessageComponent/MessageComponent";
import React, {Dispatch, useState} from "react";
import {AuthType} from "../../../Interfaces/AuthType";
import './Response.css'
import {MessageData, ResponseData} from "../../MessageTypes";
type ResponseComponentProps = {
    responseData: ResponseData;
    setReplyMessage: (msg: MessageData) => void;
    setAuth: (auth: AuthType) => void;
}
const ResponseComponent: React.FC<ResponseComponentProps> = (props) => {
    const[showComments, setShowComments] = useState<boolean>(false);
    return (
        <div className = "ResponseComponent">
            <div className="ResponseContainer">
                <MessageComponent setReplyMessage={props.setReplyMessage} msg={{
                    _id: props.responseData.Response._id,
                    Account: props.responseData.Response.Account,
                    Replies: props.responseData.Response.Replies,
                    RepliedTo: props.responseData.Response.RepliedTo,
                    Likes: props.responseData.Response.Likes,
                    Dislikes: props.responseData.Response.Dislikes,
                    Username: props.responseData.Response.Username,
                    Date_Created: props.responseData.Response.Date_Created,
                    Text: props.responseData.Response.Text,
                    IsQuestion: props.responseData.Response.IsQuestion,
                }} setAuth={props.setAuth}  />
            </div>
            <button className="showCommentsButton" onClick={()=>{
                setShowComments(!showComments);
            }}>
            Toggle Comments
            </button>
            {showComments && (<ul className="Comments">
                {
                    props.responseData.Comments.map((comment: MessageData,index) => (
                        <li className="CommentContainer">
                            <MessageComponent setReplyMessage={props.setReplyMessage} msg={comment!}
                                              setAuth={props.setAuth} />

                        </li>
                    ))
                }
            </ul>)}

        </div>);
}
export default ResponseComponent;