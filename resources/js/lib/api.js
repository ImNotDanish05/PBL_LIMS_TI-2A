import axios from "axios";

const resolveAppUrl = () => {
    // 1) Explicit env (should include subfolder/public if applicable)
    if (import.meta.env.VITE_APP_URL) {
        return import.meta.env.VITE_APP_URL.replace(/\/$/, "");
    }

    // 2) Detect `/public` segment from current URL (e.g., /PBL_LIMS_TI-2A/public/auth/login)
    const { origin, pathname } = window.location;
    const publicIndex = pathname.indexOf("/public");
    if (publicIndex !== -1) {
        return `${origin}${pathname.substring(0, publicIndex + "/public".length)}`.replace(/\/$/, "");
    }

    // 3) Fallback to meta tag if provided
    const metaAppUrl = document.querySelector('meta[name="app-url"]')?.content;
    if (metaAppUrl) return metaAppUrl.replace(/\/$/, "");

    // 4) Default origin
    return origin;
};

const appUrl = resolveAppUrl();
const apiBasePath = `${appUrl}/api/v1`;

const api = axios.create({
    baseURL: apiBasePath,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem("auth_token");
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            config.headers["X-CSRF-TOKEN"] = csrfToken.content;
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
