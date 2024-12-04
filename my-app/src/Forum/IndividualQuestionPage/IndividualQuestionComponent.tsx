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
    const [replyTo, setReplyTo] = React.useState<MessageData>();
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
            <MessageComponent msg = {questionData!} setReplyMessage={setReplyTo} />

        </div>) : <p>Loading</p>}
            <ol>
                {data?.map((response: ResponseData,index: number) => (
                    <li className="ResponseContainer"><ResponseComponent responseData={response} setReplyMessage={setReplyTo}></ResponseComponent></li>
                ))}

            </ol>
    </div>);
}
export default IndividualQuestionComponent;