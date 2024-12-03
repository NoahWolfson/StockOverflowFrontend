import MessageComponent from "../MessageComponent/MessageComponent";
import {MessageData, ResponseData} from "../QuestionPageService";
import {useState} from "react";
const ResponseComponent: React.FC<ResponseData> = (responseData) => {
    const[showComments, setShowComments] = useState<boolean>(false);
    return (
        <div className = "ResponseComponent">
            <div className="ResponseContainer">
                <MessageComponent _id={responseData.Response._id} Account={responseData.Response.Account} Replies={responseData.Response.Replies} Date_Created={responseData.Response.Date_Created} RepliedTo={responseData.Response.RepliedTo} Likes={responseData.Response.Likes} Dislikes={responseData.Response.Dislikes} Text={responseData.Response.Text} Username={responseData.Response.Username} />
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
                            <MessageComponent _id={comment._id} Account={comment.Account} Replies={comment.Replies} Date_Created={comment.Date_Created} RepliedTo={comment.RepliedTo} Likes={comment.Likes} Dislikes={comment.Dislikes} Text={comment.Text} Username={comment.Username} />
                        </li>
                    ))
                }
            </ol>)}

        </div>);
}
export default ResponseComponent;