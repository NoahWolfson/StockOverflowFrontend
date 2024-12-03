import axios from "axios";

const BASE_URL = "http://localhost:8000/stocks";

export default class StockSearcherAPIService {
    /**
     * Fetch individual stock data.
     * @param ticker Stock ticker symbol
     * @returns Promise resolving to stock data
     */
    static async getSearcher(): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/stocks`, {
                withCredentials: true, // Ensure cookies are sent for session handling
            });
            return response;
        } catch (error) {
            throw new Error("Failed to get stock searcher");
        }
    }
    static async getSearchRecommendations(curr_user_input: string): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/stocks/${curr_user_input}`, {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            throw new Error("Failed to get searcher recommendations");
        }
    }
}