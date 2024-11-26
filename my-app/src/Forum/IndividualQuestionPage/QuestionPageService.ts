import axios from "axios"
export default class QuestionPageService {
    static async getMessage(MessageId: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/public-forum/messages/:` + MessageId)
        if(response.status >= 200 && response.status < 300) {
            return response.data
        }
    }
}