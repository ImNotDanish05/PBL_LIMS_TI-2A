import api from "@/lib/api";

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data;
        } catch (error) {
            handleAuthError(error, "Login failed");
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.warn("Logout API failed:", error);
        }
    },

    getUser: async () => {
        try {
            const response = await api.get("/auth/user");
            return response.data;
        } catch (error) {
            handleAuthError(error, "Failed to fetch user data");
        }
    },
};