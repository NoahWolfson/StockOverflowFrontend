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
    IsQuestion: boolean;
}
export type ResponseData = {
    Response: MessageData;
    Comments: Array<MessageData>;
}
export type SearchResultData = {
    Date_Created: string;
    Likes: number;
    Dislikes: number;
    Text: string;
    Username: string;
    _id: string;
    Account: string;
}