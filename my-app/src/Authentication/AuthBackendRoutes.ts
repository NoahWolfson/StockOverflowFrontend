import axios, { AxiosHeaders, AxiosRequestConfig }  from "axios";

export default class AtuhAPIService {
    static async PostForgotPassword(password: string, confirmPassword: string, verificationCode: string, userId?: string) {
        const data = {
            password,
            confirmPassword,
            verificationCode,
            userId,
        };
        const config: AxiosRequestConfig = {
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const response = await axios.post('http://localhost:8000/auth/password-reset', data, config);
            console.log('Response from backend:', response.data); // Log response data
            return response.data; // Return only the data for easier frontend handling
        } catch (error: any) {
            if (error.response) {
                console.error('Backend responded with an error:', error.response.data); // Log backend error
                return error.response.data; // Return backend error response to the caller
            }
            console.error('Unexpected error:', error.message); // Handle unexpected errors
            throw error; // Rethrow the error for higher-level handling
        }
    }
    static async ForgotPassword(email: string) {
            const data = {
                email,
            };
            const config: AxiosRequestConfig = {
                headers: { 'Content-Type': 'application/json' },
            };
    
            try {
                const response = await axios.post('http://localhost:8000/auth/change-password', data, config);
                console.log('Response from backend:', response.data); // Log response data
                return response.data; // Return only the data for easier frontend handling
            } catch (error: any) {
                if (error.response) {
                    console.error('Backend responded with an error:', error.response.data); // Log backend error
                    return error.response.data; // Return backend error response to the caller
                }
                console.error('Unexpected error:', error.message); // Handle unexpected errors
                throw error; // Rethrow the error for higher-level handling
            }
    }
    static async postSignup(email: string, password: string, username: string) {
            const data = {
                email,
                password,
                username,
            };
            const config: AxiosRequestConfig = {
                headers: { 'Content-Type': 'application/json' },
            };
    
            try {
                const response = await axios.post('http://localhost:8000/auth/sign-up', data, config);
                console.log('Response from backend:', response.data); // Log response data
                return response.data; // Return only the data for easier frontend handling
            } catch (error: any) {
                if (error.response) {
                    console.error('Backend responded with an error:', error.response.data); // Log backend error
                    return error.response.data; // Return backend error response to the caller
                }
                console.error('Unexpected error:', error.message); // Handle unexpected errors
                throw error; // Rethrow the error for higher-level handling
            }
        }
    static async postLogin(username: String, password: string) {
        const data = {
            username,
            password,
        }
        const config: AxiosRequestConfig = {
            headers: {'Content-Type': 'application/json',},
            withCredentials: true

        };
        try {
            const response = await axios.post('http://localhost:8000/auth/login', data, config);
            console.log('response from backend');
            console.log(response);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error('Backend responded with an error:', error.response.data); // Log backend error
                return error.response.data; // Return backend error response to the caller
            }
            console.error('Unexpected error:', error.message); // Handle unexpected errors
            throw error; // Rethrow the error for higher-level handling
        }
    }
}