import React, {useEffect, useState} from "react";
import QuestionPageService,{ResponseData,MessageData} from "./QuestionPageService";
import MessageComponent from "./MessageComponent/MessageComponent";
import ResponseComponent from "./ResponseComponent/ResponseComponent";
import {useNavigate, useParams} from "react-router-dom";
import ReplyBoxComponent from "./ReplyBoxComponent/ReplyBoxComponent";
import './IndividualQuestionComponent.css'
import {AuthType} from "../../Interfaces/AuthType";
import {useLocation} from "react-router-dom";
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
    const location= useLocation();
    const [data, setData] = React.useState<Array<ResponseData>>([]);
    const [question, setQuestion] = React.useState<MessageData>();
    const {QuestionId} = useParams<QuestionPageParams>();
    const [replyTo, setReplyTo] = React.useState<MessageData>();
    const navigate = useNavigate();
    useEffect(()=>{
        const update = async function(){
            try {
                let qData: MessageData = await QuestionPageService.getQuestion(QuestionId || "Err",setAuth);
                if(qData.IsQuestion as boolean) {
                    setQuestion(prev => qData);
                    let response =  await QuestionPageService.getPage(QuestionId || "Err",setAuth);
                    setData(response?.Responses);
                    setTimeout(update,300);
                }
                else {
                    console.log(qData);
                    navigate("/public-forum/" + qData.RepliedTo, {
                        state: {
                            data: [],
                            question: null,
                            replyTo: null
                        }
                    });
                }
            }catch (err: any){
                console.error(err);
            }
        }
        update();
    },[location]);
    return (
        <div className="body">
            {question ? (
                <div className="questionContainer">
                    <MessageComponent setIsAuthorized={setAuth} msg={question!} setReplyMessage={setReplyTo}/>
                </div>) : <p>Loading Question</p>}
            {data ?(
            <ol>
                {data.map((response: ResponseData,index: number) => (
                    <li key = {"response:" + response.Response._id} className="ResponseContainer"><ResponseComponent setAuth={setAuth} responseData={response} setReplyMessage={setReplyTo}></ResponseComponent></li>
                ))}

            </ol>) : <p>Loading Responses</p>
            }
            {replyTo ? (<ReplyBoxComponent messageData={replyTo} setAuth={setAuth}></ReplyBoxComponent>):null}
    </div>);
}
export default IndividualQuestionComponent;