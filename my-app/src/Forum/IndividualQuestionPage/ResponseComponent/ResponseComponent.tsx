import MessageComponent from "../MessageComponent/MessageComponent";
import {MessageData, ResponseData} from "../QuestionPageService";
import React, {Dispatch, useState} from "react";
type ResponseComponentProps = {
    responseData: ResponseData;
    setReplyMessage: (msg: MessageData) => void;
    setIsAuthorized: (isAuthorized: boolean) => void;
}
const ResponseComponent: React.FC<ResponseComponentProps> = ({responseData: responseData, setReplyMessage: setReplyMessage}) => {
    const[showComments, setShowComments] = useState<boolean>(false);
    return (
        <div className = "ResponseComponent">
            <div className="ResponseContainer">
                <MessageComponent setReplyMessage={setReplyMessage} msg={{_id: responseData.Response._id, Account: responseData.Response.Account, Replies: responseData.Response.Replies,RepliedTo: responseData.Response.RepliedTo, Likes: responseData.Response.Likes, Dislikes: responseData.Response.Dislikes, Username: responseData.Response.Username,Date_Created: responseData.Response.Date_Created,Text: responseData.Response.Text}}  />
            </div>
            <button className="showCommentsButton" onClick={()=>{
                setShowComments(!showComments);
            }}>
            Show Comments
            </button>
            {showComments && (<ol className="Comments">
                {
                    responseData.Comments.map((comment: MessageData,index) => (
                        <li className="CommentContainer">
                            <MessageComponent setReplyMessage={setReplyMessage} msg={comment!} />
                        </li>
                    ))
                }
            </ol>)}

        </div>);
}
export default ResponseComponent;