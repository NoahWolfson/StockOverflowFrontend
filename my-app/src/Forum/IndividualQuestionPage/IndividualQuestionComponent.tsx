import React, {useEffect} from "react";
import QuestionPageService,{ResponseData,MessageData} from "./QuestionPageService";
import MessageComponent from "./MessageComponent/MessageComponent";
import ResponseComponent from "./ResponseComponent/ResponseComponent";
import {useParams} from "react-router-dom";
type QuestionPageParams = {
    QuestionId?: string;
}
const IndividualQuestionComponent: React.FC = ()=>{
    const [data, setData] = React.useState<Array<ResponseData>>([]);
    const [questionData, setQuestionData] = React.useState<MessageData | null>(null);
    const {QuestionId} = useParams<QuestionPageParams>();
    const [isDone, setIsDone] = React.useState(false);
    useEffect(()=>{
        const update = async function(){
            setQuestionData(await QuestionPageService.getMessage(QuestionId || "Err"));
            let response = await QuestionPageService.getPage(QuestionId || "Err");
            setData(response);
            setIsDone(questionData != null);
            console.log(questionData);
        }
        update();
        const intervalId = setInterval(update, 100);
        return () => clearInterval(intervalId);
    })
    return (
        <div className="body">
            {isDone ? (
        <div className = "questionContainer">
            <MessageComponent Account={questionData!.Account} _id={questionData!._id} Replies={questionData!.Replies} Date_Created={questionData!.Date_Created} RepliedTo={questionData!.RepliedTo}
                          Likes={questionData!.Likes} Dislikes={questionData!.Dislikes} Text={questionData!.Text} Username={questionData!.Username} />

        </div>) : <p>Loading</p>}
            <ol>
                {data?.map((response: ResponseData,index: number) => (
                    <li className="ResponseContainer"><ResponseComponent Response={{
                        _id: response.Response._id,
                        Account: response.Response.Account,
                        Replies: response.Response.Replies,
                        Date_Created: response.Response.Date_Created,
                        RepliedTo: response.Response.RepliedTo,
                        Likes: response.Response.Likes,
                        Dislikes: response.Response.Dislikes,
                        Text: response.Response.Text,
                        Username: response.Response.Username,
                    }} Comments={response.Comments}></ResponseComponent></li>
                ))}

            </ol>
    </div>);
}
export default IndividualQuestionComponent;