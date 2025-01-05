import axios, {AxiosRequestConfig} from "axios";
import React from "react";
import {AuthType} from "../Interfaces/AuthType";
const BASE_URL = "http://localhost:8000/public-forum/questions";
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};
export default class ForumPageService {
    static async getRecentQuestions(setAuth: React.Dispatch<React.SetStateAction<AuthType>>){
        try{
            const response = await axios.get(BASE_URL + '/recent', config);
            setAuth({accountId: response.data.currUser, picStr: response.data.picStr});
            console.log(response.data.matches);
            return response.data.matches;
        }
        catch (error) {
            console.error(`Failed to get recent questions: ${error}`);
        }
    }
    static async getSearchResults(setAuth: React.Dispatch<React.SetStateAction<AuthType>>,text: string, sort: string){
        try{
            const response = await axios.get(BASE_URL + `/search/${text}/${sort}`, config);
            setAuth({accountId: response.data.currUser, picStr: response.data.picStr});
            return response.data.matches;
        }
        catch (error) {
            console.error(`Failed to get recent questions: ${error}`);
        }
    }
    static async postQuestion(setAuth: React.Dispatch<React.SetStateAction<AuthType>>,text: string){
        try {
            const response = await axios.post(BASE_URL, {Text: text}, config);
            setAuth({
                accountId: response.data.currUser,
                picStr: response.data.profilePicture
            });
            return true;
        }catch (error) {
            console.error(`Failed to post question: ${error}`);
            return false;
        }
    }
}