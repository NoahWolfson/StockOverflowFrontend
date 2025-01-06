import React, { useEffect, useState } from "react";
import {SearchResultData} from "../../MessageTypes";
import ResultStub from "./ResultStub/ResultStub";
import './ResultsComponent.css'
type ResultsComponentProps = {
    results: SearchResultData[];
}
const ResultsComponent: React.FC<ResultsComponentProps> = (props) =>{
    return(
        <div className="ResultsComponent">
                {props.results.map((message) => (<ResultStub Account = {message.Account} Date_Created={message.Date_Created} Likes={message.Likes} Username={message.Username} Dislikes={message.Dislikes} Text={message.Text} key={message._id} _id={message._id} ></ResultStub>))}
        </div>
    )
}
export default ResultsComponent;