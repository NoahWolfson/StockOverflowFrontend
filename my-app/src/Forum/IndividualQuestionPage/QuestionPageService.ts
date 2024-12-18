import axios, {AxiosRequestConfig} from "axios"
import {Simulate} from "react-dom/test-utils";
import {AuthType} from "../../Interfaces/AuthType";

export type MessageData = {
    _id: string;
    Account: string;
    Replies: Array<string>;
    Date_Created: string;
    RepliedTo: string;
    Likes: number;
    Dislikes: number;
    Text: string;
    Username: string;
}
export type ResponseData = {
    Response: MessageData;
    Comments: Array<MessageData>;

}
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};
export default class QuestionPageService {
    static async getMessage(MessageId: string,setAuth: (auth: AuthType)=>void): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:8000/public-forum/messages/` + MessageId, config).catch(error => {
                console.error(error);
                return error.resp;
            });
            setAuth({accountId: response.data.currUser, picStr: response.data.profilePicture})
            return {
                Dislikes: response.data.message.Dislikes as number,
                Likes: response.data.message.Likes as number,
                RepliedTo: response.data.message.RepliedTo as string,
                Replies: response.data.message.Replies as Array<string>,
                Text: response.data.message.Text as string,
                Username: response.data.Username as string,
                Account: response.data.message.Account as string,
                _id: response.data.message._id as string,
                Date_Created: response.data.message.Date_Created as string,
            } as MessageData;
        }
        catch (error) {
            console.error(error);
        }
        console.log("Didn't retrieve message data.");
    }
    static async getPage(QuestionId: string,setAuth: (auth: AuthType)=>void): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:8000/public-forum/questions/` + QuestionId + "/page", config).catch(error => {
                console.error(error);
                return error.resp;
            });
            setAuth({accountId: response.data.currUser, picStr: response.data.profilePicture})
            if (response.status >= 200 && response.status < 300) {
                const Responses: Array<ResponseData> = []
                for (let item of response.data.responses) {
                    let comments: MessageData[] = []
                    let response: MessageData = {
                        Dislikes: item.Response.Dislikes,
                        Likes: item.Response.Likes,
                        RepliedTo: item.Response.RepliedTo,
                        Replies: item.Response.Replies,
                        Text: item.Response.Text,
                        Username: item.Username,
                        Account: item.Response.Account,
                        _id: item.Response._id,
                        Date_Created: item.Response.Date_Created,
                    }
                    for (let comment of item.Comments) {
                        comments.push({
                            Username: comment.Username,
                            Account: comment.Message.Account,
                            Date_Created: comment.Message.Date_Created,
                            Dislikes: comment.Message.Dislikes,
                            Likes: comment.Message.Likes,
                            RepliedTo: comment.Message.RepliedTo,
                            Replies: comment.Message.Replies,
                            Text: comment.Message.Text,
                            _id: comment.Message._id
                        })
                    }
                    Responses.push({Response: response, Comments: comments});
                }
                return {Responses: Responses};
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    static async postReply(MessageId: string,text: string,setAuth: (auth: AuthType)=>void): Promise<any> {
        try {
            const response = await axios.post(`http://localhost:8000/public-forum/messages/` + MessageId, {
                Text: text,

            }, config);
            setAuth({
                accountId: response.data.currUser,
                picStr: response.data.profilePicture
            });
        }catch(error){
            console.error(error);
        }
    }
    static async likeMessage(MessageId: string,setAuth: (auth: AuthType)=>void): Promise<any> {
        try {
            const response = await axios.patch(`http://localhost:8000/public-forum/like/` + MessageId, {},{
                method: 'PATCH',
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            setAuth({accountId: response.data.currUser,picStr: response.data.profilePicture});
        }catch(error){
            console.error(error);
        }
    }
    static async dislikeMessage(MessageId: string,setAuth: (auth: AuthType)=>void): Promise<any> {
            try {
                const response = await axios.patch(`http://localhost:8000/public-forum/dislike/` + MessageId, {},{
                    method: 'PATCH',
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                });
                setAuth({accountId: response.data.currUser,picStr: response.data.profilePicture});
            }catch(error){
                console.error(error);
            }
    }
    static async clearLikeMessage(MessageId: string,setAuth: (auth: AuthType)=>void): Promise<any> {
        try {
            const response = await axios.patch(`http://localhost:8000/public-forum/clearLike/` + MessageId, {},{
                method: 'PATCH',
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            setAuth({accountId: response.data.currUser,picStr: response.data.profilePicture});
        }catch(error){
            console.error(error);
        }
    }
}