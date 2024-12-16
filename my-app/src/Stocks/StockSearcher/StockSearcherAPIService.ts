import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8000/stocks";
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};
export default class StockSearcherAPIService {
    /**
     * Fetch individual stock data.
     * @param ticker Stock ticker symbol
     * @returns Promise resolving to stock data
     */
    static async getSearcher(): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}`, {
                withCredentials: true, // Ensure cookies are sent for session handling
            });
            return response;
        } catch (error) {
            throw new Error("Failed to get stock searcher");
        }
    }
    static async getSearchRecommendations(curr_user_input?: string): Promise<any> {
        const data = {
            curr_user_input, 
        }
        try {
            const response = await axios.post(`${BASE_URL}`, data, config);
            console.log('the response: ' )
            // console.log(response)
            return response.data;
        } catch (error) {
            throw new Error("Failed to get searcher recommendations");
        }
    }
}