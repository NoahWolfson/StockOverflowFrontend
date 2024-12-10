import axios, { AxiosRequestConfig } from "axios";


const BASE_URL = "http://localhost:8000";
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};
/**
 * this class is responsible for calling the backend api endpoints to get and post user pages
 */
export default class UserAPIService {
    /**
     * Fetches account information/ demographics from backend.
     * @param  accountId of the account
     * @returns Promise resolving to stock data
     */
    static async getUserData(accountId?: string): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/user/${accountId}/profile`, {
                withCredentials: true, // Ensure cookies are sent for session handling
            });
            console.log(response)
            return response;
        } catch (error) {
            console.error(`Error fetching account data for ${accountId}:`, error);
            throw new Error("Failed to fetch account data");
        }
    }
    /**
     * Fetches account information/ demographics from backend.
     * @param  accountId of the account
     * @returns Promise resolving to stock data
     */
    static async getUserEditProfilePage(accountId?: string): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/user/${accountId}/edit-profile`, {
                withCredentials: true, // Ensure cookies are sent for session handling
            });
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
            console.error(`Error fetching account data for ${accountId}:`, error);
            throw new Error("Failed to fetch account data");
        }
    }
    
    /**
     * this route removes the stock from the user 
     */
    static async postRemoveUserStock(stockName: string, userId: string, ticker?: string): Promise<any> {
        const data = {
            ticker, 
            stockName,
            userId,
        }
        try {
            const response = await axios.post(`${BASE_URL}/stocks/remove-stock`, data, config)
            return response
        } catch (error: any) {
            if (error.response) {
                console.error('Backend responded with an error:', error.response.data); 
                return error.response.data; 
            }
            console.error('Unexpected error:', error.message); 
            throw error; 
        }
    }
    /**
     * this method is reponsible for sending the updated account ifnromatio to the backend to update the account in the database
     * @param accountId 
     * @param username 
     * @param email 
     * @param birthday 
     * @param profileDescription 
     * @param profilePicture 
     * @param notifyPublicForumResponse 
     * @param notifyPublicForumLikes 
     * @param notifyStockNews 
     * @returns 
     */
    static async postUserEditProfilePage(username: string, email: string, birthday: Date, profileDescription: string, notifyPublicForumResponse: boolean, notifyPublicForumLikes: boolean, notifyStockNews: boolean,
        accountId?: string, profilePicture?: File) {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("birthday", birthday.toISOString());
        formdata.append('profileDescription', profileDescription);
        formdata.append('notifyPublicForumResponse', JSON.stringify(notifyPublicForumResponse));
        formdata.append('notifyStockNews', JSON.stringify(notifyStockNews));
        formdata.append('notifyPublicForumLikes', JSON.stringify(notifyPublicForumLikes));
        if (profilePicture) formdata.append('profilePicture', profilePicture)
        try {
            const response = await axios.post(`${BASE_URL}/user/${accountId}/edit-profile`, formdata, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            console.log('Response from backend:', response.data); 
            return response.data; 
        } catch (error: any) {
            if (error.response) {
                console.error('Backend responded with an error:', error.response.data); 
                return error.response.data; 
            }
            console.error('Unexpected error:', error.message); 
            throw error; 
        }
    }
}
