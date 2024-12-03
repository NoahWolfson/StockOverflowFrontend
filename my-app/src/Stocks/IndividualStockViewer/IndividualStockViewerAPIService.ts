import axios from "axios";

const BASE_URL = "http://localhost:8000/stocks";

export default class IndividualStockViewerAPIService {
    /**
     * Fetch individual stock data.
     * @param ticker Stock ticker symbol
     * @returns Promise resolving to stock data
     */
    static async getIndStockData(ticker: string): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/stock-data/${ticker}`, {
                withCredentials: true, // Ensure cookies are sent for session handling
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching individual stock data for ${ticker}:`, error);
            throw new Error("Failed to fetch individual stock data");
        }
    }

    /**
     * Fetch individual stock chart data.
     * @param ticker Stock ticker symbol
     * @returns Promise resolving to stock chart data
     */
    static async getIndStockChartData(ticker: string): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/stock-chart/${ticker}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching individual stock chart data for ${ticker}:`, error);
            throw new Error("Failed to fetch stock chart data");
        }
    }

    /**
     * Fetch basic stock data.
     * @param ticker Stock ticker symbol
     * @returns Promise resolving to basic stock data
     */
    static async getBasicStockData(ticker: string): Promise<any> {
        try {
            const response = await axios.get(`${BASE_URL}/stock-basic-data/${ticker}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching basic stock data for ${ticker}:`, error);
            throw new Error("Failed to fetch basic stock data");
        }
    }
}