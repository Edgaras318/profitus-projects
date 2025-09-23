import axios from "axios";
import type { AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.profitus.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    console.error('Unauthorized access');
                    break;
                case 403:
                    console.error('Forbidden access');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 422:
                    console.error('Validation error', data);
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error(`API Error: ${status}`, data);
            }
        } else if (error.request) {
            console.error('Network error - no response received');
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
