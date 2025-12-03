import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { router, usePage } from "@inertiajs/react";
import { authService } from "@/services/authService";
import {
    DEFAULT_REDIRECT_PATH,
    ERROR_MESSAGES,
    ROLE_REDIRECT_MAP,
} from "@/utils/constant/auth";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { url } = usePage();

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try {
                const response = await authService.getUser();
                const fetchedUser = response?.data?.user;

                if (!fetchedUser) throw new Error("User data missing");

                if (isMounted) {
                    setUser(fetchedUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                if (isMounted) {
                    setUser(null);
                    setIsAuthenticated(false);
                }

                if (url !== "/auth/login") {
                    toast.error(ERROR_MESSAGES.SESSION_EXPIRED);
                    router.visit("/auth/login");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initializeAuth();

        return () => { isMounted = false; };
    }, []);

    const login = useCallback(async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);
            const userData = response?.data?.user;

            setUser(userData);
            setIsAuthenticated(true);
            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGIN);

            const redirectPath =
                ROLE_REDIRECT_MAP[userData.role] || DEFAULT_REDIRECT_PATH;

            router.visit(redirectPath);

            return response;
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGES.LOGIN_FAILED);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);

        try {
            await authService.logout();

            setUser(null);
            setIsAuthenticated(false);
            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGOUT);

            router.visit("/auth/login");
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGES.LOGOUT_FAILED);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };
};
