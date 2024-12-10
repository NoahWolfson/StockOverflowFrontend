import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000", // Your backend URL
    withCredentials: true, // Include cookies for session handling
});

export default class GenrelRoutesAPIService {
    static async getHomeData(): Promise<any> {
        try {
            const response = await axiosInstance.get("/"); // Replace '/home' with your backend route
            return response; // Return the actual response data
        } catch (error) {
            console.error("Failed to fetch Home data:", error);
            throw new Error("Failed to fetch Home data");
        }
    }
}