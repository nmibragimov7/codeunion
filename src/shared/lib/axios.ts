import axios from "axios";

export const fetcher = axios.create({
    baseURL: "http://localhost:3000",
})

fetcher.interceptors.request.use((config: any) => {
    // Bearer
    return config;
})
fetcher.interceptors.response.use((response: any) => response, (error: any) => {
    if (error.response.status === 401 && !error.config.url.includes('refresh') && !error.config.url.includes('login')) {
        // refresh
    }
    return Promise.reject(error);
})
