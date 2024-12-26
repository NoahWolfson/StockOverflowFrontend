import React, { useEffect, useState } from "react";
import UserAPIService from "../../UserAPIService";
import messageStubData from "./UserMessageTypes";
import  Stub from './MessageStub/MessageStub'
import './MessageStub/Stub.css'
interface userMessageProps {
    accountId: string;
    messages: messageStubData[];
}
const UserMessagesComponent: React.FC<userMessageProps> = (props) =>{
    return(
        <div className="UserMessagesComponent">
                {props.messages.map((message) => (<Stub Date_Created={message.Date_Created} RepliedTo={message.RepliedTo} Likes={message.Likes} Dislikes={message.Likes} Text={message.Text} key={message._id} IsQuestion={message.IsQuestion} _id={message._id} ></Stub>))}
        </div>
    )
}
export default UserMessagesComponent;