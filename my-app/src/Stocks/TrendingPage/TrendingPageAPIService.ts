import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8000/stocks";
const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};
/**
 * this class is responsible for providing backened connection endpoints to the frontend for the Trending page routes
 */
export default class TrendingPageAPIService {
    /**
     * Fetch the trending stocks.
     * @returns the tredning stocks 
     */
    static async getTrendingPage(): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/trending-page`, {
                withCredentials: true, // Ensure cookies are sent for session handling
            });
            return response;
        } catch (error) {
            throw new Error("Failed to get stock searcher");
        }
    }
}