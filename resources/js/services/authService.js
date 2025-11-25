import api from "@/lib/api";

const handleAuthError = (error, message) => {
    console.error(message, error);
    throw error; // penting supaya useAuth bisa catch
};

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            const { user, token } = response?.data?.data || {};

            if (token) {
                localStorage.setItem("auth_token", token);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }

            return { user, token };
        } catch (error) {
            handleAuthError(error, "Login failed");
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
            localStorage.removeItem("auth_token");
            delete api.defaults.headers.common["Authorization"];
        } catch (error) {
            console.warn("Logout API failed:", error);
        }
    },

    getUser: async () => {
        try {
            const response = await api.get("/auth/user");
            const user = response?.data?.data?.user;
            return { user };
        } catch (error) {
            handleAuthError(error, "Failed to fetch user data");
        }
    },
};
