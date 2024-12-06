import axios from "axios"

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
export default class QuestionPageService {
    static async getMessage(MessageId: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/public-forum/messages/` + MessageId)
        if(response.status >= 200 && response.status < 300) {
            return {
                Dislikes: response.data.message.Dislikes,
                Likes: response.data.message.Likes,
                RepliedTo: response.data.message.RepliedTo,
                Replies: response.data.message.Replies,
                Text: response.data.message.Text,
                Username: response.data.username,
                Account: response.data.message.Account,
                _id: response.data.message._id,
                Date_Created: response.data.message.Date_Created,
            };
        }
    }
    static async getPage(QuestionId: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/public-forum/questions/` + QuestionId + "/page");
        if(response.status >= 200 && response.status < 300) {
            const Responses: Array<ResponseData> = []
            console.log(response.data);
            for(let item of response.data.responses) {
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
                for(let comment of item.Comments) {
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
            return {Responses: Responses,isAuthenticated: response.data.isAuthenticated,
                userId: response.data.userId};
        }

    }
    static async postReply(MessageId: string,text: string): Promise<any> {
        const response = await axios.post(`http://localhost:8000/public-forum/messages/` + MessageId,{
            Text: text,
        });
        return response.status == 201;
    }
    static async likeMessage(MessageId: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/public-forum/messages/` + MessageId);
    }
}
