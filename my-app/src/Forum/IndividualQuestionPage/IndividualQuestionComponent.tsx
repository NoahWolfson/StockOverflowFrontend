import React, {useEffect, useState} from "react";
import QuestionPageService,{ResponseData,MessageData} from "./QuestionPageService";
import MessageComponent from "./MessageComponent/MessageComponent";
import ResponseComponent from "./ResponseComponent/ResponseComponent";
import {useParams} from "react-router-dom";
import ReplyBoxComponent from "./ReplyBoxComponent/ReplyBoxComponent";
import {AuthType} from "../../Interfaces/AuthType";
type QuestionPageParams = {
    QuestionId?: string;
}
type isAuthenticated = {
    setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
}
/**This component represents the Individual Question Page in its entirety.
 * It uses the QuestionPageService functions to update its state from the backend, ultimately from the database.
 *
 * @constructor
 */
const IndividualQuestionComponent: React.FC<isAuthenticated> = ({setAuth})=>{
    const [data, setData] = React.useState<Array<ResponseData>>([]);
    const [questionData, setQuestionData] = React.useState<MessageData | null>(null);
    const {QuestionId} = useParams<QuestionPageParams>();
    const [replyTo, setReplyTo] = React.useState<MessageData>();
    const [isDone, setIsDone] = React.useState(false);
    const [userId, setUserId] = React.useState<string>();
    const [error, setError] = useState<any | null>(null);
    useEffect(()=>{
        const update = async function(){
            try {
                let qData = await QuestionPageService.getMessage(QuestionId || "Err",setAuth);
                setQuestionData(qData);
                let response = await QuestionPageService.getPage(QuestionId || "Err",setAuth);
                setData(response.Responses);
                setIsDone(questionData != null);
            }catch (err: any){
                return;
            }
            setTimeout(update, 1500);
        }
        update();
    },[setAuth]);
    return (
        <div className="body">
            {isDone ? (
        <div className = "questionContainer">
            <MessageComponent setIsAuthorized={setAuth} msg = {questionData!} setReplyMessage={setReplyTo} />

        </div>) : (<p>Loading Question</p>)}
            {data ?(
            <ol>
                {data.map((response: ResponseData,index: number) => (
                    <li key = {"response:" + response.Response._id} className="ResponseContainer"><ResponseComponent setAuth={setAuth} responseData={response} setReplyMessage={setReplyTo}></ResponseComponent></li>
                ))}

            </ol>) : <p>Loading Responses</p>
            }
            {replyTo ? (<ReplyBoxComponent messageData={replyTo}></ReplyBoxComponent>):<footer>Loading</footer>}
    </div>);
}
export default IndividualQuestionComponent;