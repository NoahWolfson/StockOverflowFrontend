import axios, {AxiosRequestConfig} from "axios"
import {AuthType} from "../../Interfaces/AuthType";
import {MessageData, ResponseData} from "../MessageTypes";

const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};
export default class QuestionPageService {
    static async getQuestion(MessageId: string, setAuth: (auth: AuthType)=>void): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:8000/public-forum/messages/` + MessageId, config).catch(error => {
                console.error(error);
                return error.resp;
            });
            setAuth({accountId: response.data.currUser, picStr: response.data.profilePicture})

            return {
                Dislikes: response.data.message.Dislikes,
                Likes: response.data.message.Likes,
                Replies: response.data.message.Replies,
                Text: response.data.message.Text,
                Username: response.data.Username,
                Account: response.data.message.Account,
                _id: response.data.message._id,
                IsQuestion: response.data.message.IsQuestion,
                RepliedTo: (response.data.message.IsQuestion as boolean)? (''):(response.data.message.RepliedTo),
                Date_Created: response.data.message.Date_Created,
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
                        IsQuestion: item.Response.IsQuestion,
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
                            _id: comment.Message._id,
                            IsQuestion: comment.Message.IsQuestion,
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
            return true;
        }catch(error){
            console.error(error);
            return false;
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
            return true;
        }catch(error){
            console.error(error);
            return false;
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
                return true;
            }catch(error){
                console.error(error);
                return false;
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
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }
}