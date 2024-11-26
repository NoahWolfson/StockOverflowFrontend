import axios  from "axios";

export default class IndividualStockViewerAPIService {
    static async getIndStockData(ticker: string): Promise<any> {
        const response = await axios.get(`http://localhost:8000/stocks/stock-data/${ticker}`);
        return response.data
    }
    static async getIndStockChartData(ticker: string): Promise<any> {
        const response = await fetch(`http://localhost:8000/stocks/stock-chart/${ticker}`);
        if (!response.ok) {
            throw new Error('Failed to fetch message');
        }
        const data = await response.json();
        return data;
    }
    static async getBasicStockData(ticker: string): Promise<any> {
        const response = await fetch(`http://localhost:8000/stocks/stock-basic-data/${ticker}`);
        if (!response.ok) {
            throw new Error('Failed to fetch message');
        }
        const data = await response.json();
        console.log('inside the API caller')
        return data;
    }
}