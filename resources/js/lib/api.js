import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            config.headers["X-CSRF-TOKEN"] = token.content;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;

        if (status === 401) {
            window.dispatchEvent(new Event("auth:unauthorized"));
        }

        if (status === 403) {
            window.dispatchEvent(new Event("auth:forbidden"));
        }

        return Promise.reject(error);
    }
);

export default api;