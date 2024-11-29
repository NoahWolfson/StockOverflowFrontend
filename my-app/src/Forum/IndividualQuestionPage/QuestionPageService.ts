import axios from "axios"
export type MessageData = {
    _id: string;
    Account: string;
    Replies: [string];
    Date_created: Date;
    RepliedTo: string;
    Likes: number;
    Dislikes: number;
    Text: string;
    Username: string;
}
export default class QuestionPageService {
    static async getMessage(MessageId: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/public-forum/messages/:` + MessageId)
        if(response.status >= 200 && response.status < 300) {
            let msgData: MessageData = {
                Dislikes: response.data.message.Dislikes,
                Likes: response.data.message.Likes,
                RepliedTo: response.data.message.RepliedTo,
                Replies: response.data.message.Replies,
                Text: response.data.message.Text,
                Username: response.data.username,
                Account: response.data.message.Account,
                _id: response.data.message._id,
                Date_created: new Date(response.data.message.Date_created)
            }

        }
    }
    static async getPage(QuestionId: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/public-forum/questions/:` + QuestionId + "/page");
    }
}
