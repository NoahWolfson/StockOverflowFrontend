import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8000/stocks";


const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

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
     * this route saves the stock that the user added 
     */
    static async postSaveStockToUser(stockName: string,  userId: string, ticker?: string): Promise<any> {
        const data = {
            ticker, 
            stockName,
            userId,
        }
        try {
            const response = await axios.post('http://localhost:8000/stocks/add-stock', data, config)
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